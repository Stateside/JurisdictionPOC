import { JSCJurisdiction } from "../../typechain-types"
import { JSCRevisionsLib } from "../../typechain-types/libraries"
// @ts-ignore
import { deployments, ethers } from "hardhat"
import { expect, use as chaiuse } from "chai"

import { solidity } from "ethereum-waffle";
import { defaultAbiCoder } from "ethers/lib/utils"
chaiuse(solidity);

describe("JSCJurisdiction", async () => {
  let jurisdiction: JSCJurisdiction
  let rlib: JSCRevisionsLib

  const testParameterRevision = async (r:any, name:string, description:string, type:number) => {
    await expect(r.name).to.be.equal(name);
    await expect(r.description).to.be.equal(description);
    await expect(r.paramNames.length, "r.paramNames Length").to.be.equal(2);
    await expect(r.paramNames[0]).to.be.equal("name");
    await expect(r.paramNames[1]).to.be.equal("value");
    await expect(r.paramTypes.length, "r.paramTypes Length").to.be.equal(2);
    await expect(r.paramTypes[0], "incorrect type for name parameter in revision").to.be.equal(2); // t_address=0, t_number=1, t_string=2
    await expect(r.paramTypes[1], "incorrect type for value parameter in revision").to.be.equal(type); // t_address=0, t_number=1, t_string=2
    await expect(r.paramHints.length, "r.paramHints Length").to.be.equal(2);
    await expect(r.paramHints[0]).to.be.equal("Name of the parameter");
    await expect(r.paramHints[1]).to.be.equal("New value for the parameter");
  }

  const testIterateParameters = async (names:string[], descriptions:string[], addresses: string[]) => {
    await expect(await jurisdiction.parameterCount()).to.be.equal(names.length);
    let i = await jurisdiction.iterateParameters()
    for(let j=0; j<names.length; j++) {
      await expect(await jurisdiction.isValidParameterIterator(i)).to.be.true;
      let p = await jurisdiction.parameterIteratorGet(i);
      await expect(p.name).to.be.equal(names[j])
      await expect(p.description).to.be.equal(descriptions[j])
      let a = await jurisdiction.getAddressParameter(p.name);
      await expect(a).to.be.equal(addresses[j]);  
      i = await jurisdiction.nextRevision(i)
    }

    await expect(await jurisdiction.isValidParameterIterator(i)).to.be.false;
    await expect(jurisdiction.parameterIteratorGet(i)).to.be.revertedWith("Invalid iterator")
  }

  beforeEach(async () => {
    await deployments.fixture(["all"])
    jurisdiction = await ethers.getContract("JSCJurisdiction")
  })

  it("iterates parameters", async () => {
    await testIterateParameters(
      ["jsc.contract.mycontract"],
      ["This is a test contract address"],
      [jurisdiction.address]
    )
  })

  it("iterates jurisdiction revisions", async () => {
    // one parameter revision and AddContract and RemoveContract
    await expect(await jurisdiction.revisionCount()).to.be.equal(3);
    
    let i = await jurisdiction.iterateRevisions();
    await expect(await jurisdiction.isValidRevisionIterator(i)).to.be.true;
    let r = await jurisdiction.revisionIteratorGet(i);
    await testParameterRevision(r, "jsc.contract.mycontract", "This is a test contract address", 0);
    
    i = await jurisdiction.nextRevision(i)
    await expect(await jurisdiction.isValidRevisionIterator(i)).to.be.true;
    r = await jurisdiction.revisionIteratorGet(i);
    await expect(r.name).to.be.equal("AddContract");
    await expect(r.description).to.be.equal("Add a new contract called {key} deployed at {address}");
    await expect(r.paramNames.length, "r.paramNames Length").to.be.equal(3);
    await expect(r.paramNames[0]).to.be.equal("key");
    await expect(r.paramNames[1]).to.be.equal("description");
    await expect(r.paramNames[2]).to.be.equal("address");
    await expect(r.paramTypes.length, "r.paramTypes Length").to.be.equal(3);
    await expect(r.paramTypes[0], "incorrect type for key parameter in revision").to.be.equal(2); // t_address=0, t_number=1, t_string=2
    await expect(r.paramTypes[1], "incorrect type for description parameter in revision").to.be.equal(2); // t_address=0, t_number=1, t_string=2
    await expect(r.paramTypes[2], "incorrect type for address parameter in revision").to.be.equal(0); // t_address=0, t_number=1, t_string=2
    await expect(r.paramHints.length, "r.paramHints Length").to.be.equal(3);
    await expect(r.paramHints[0]).to.be.equal("Unique key for this contract within the jurisdiction");
    await expect(r.paramHints[1]).to.be.equal("Description of this contract");
    await expect(r.paramHints[2]).to.be.equal("Address of this contract");

    i = await jurisdiction.nextRevision(i)
    await expect(await jurisdiction.isValidRevisionIterator(i)).to.be.true;
    r = await jurisdiction.revisionIteratorGet(i);
    await expect(r.name).to.be.equal("RemoveContract");
    await expect(r.description).to.be.equal("Remove the contract {key}");
    await expect(r.paramNames.length, "r.paramNames Length").to.be.equal(2);
    await expect(r.paramNames[0]).to.be.equal("key");
    await expect(r.paramNames[1]).to.be.equal("address");
    await expect(r.paramTypes.length, "r.paramTypes Length").to.be.equal(2);
    await expect(r.paramTypes[0], "incorrect type for name parameter in revision").to.be.equal(2); // t_address=0, t_number=1, t_string=2
    await expect(r.paramTypes[1], "incorrect type for address parameter in revision").to.be.equal(0); // t_address=0, t_number=1, t_string=2
    await expect(r.paramHints.length, "r.paramHints Length").to.be.equal(2);
    await expect(r.paramHints[0]).to.be.equal("Unique key for this contract within the jurisdiction");
    await expect(r.paramHints[1]).to.be.equal("Current address of this contract");
  })

  it("executes address parameter revision", async () => {
    let revArgs:string = defaultAbiCoder.encode(["string", "address"],["jsc.contract.mycontract", "0x111122223333444455556666777788889999AaaB"]);
    let tresponse = jurisdiction.executeRevision("jsc.contract.mycontract", revArgs);
    await expect(tresponse).to.emit(jurisdiction, "AddressParameterUpdated").withArgs("jsc.contract.mycontract", "0x111122223333444455556666777788889999AaaB");
    await expect(tresponse).to.emit(jurisdiction, "RevisionExecuted").withArgs("jsc.contract.mycontract", revArgs);
    await testIterateParameters(
      ["jsc.contract.mycontract"],
      ["This is a test contract address"],
      ["0x111122223333444455556666777788889999AaaB"]
    )
  })

  it("executes AddContract and RemoveContract revisions", async () => {
    let revArgs:string = defaultAbiCoder.encode(
      ["string", "string", "address"],
      ["jsc.contract.my2ndcontract", "A second contract", "0x111122223333444455556666777788889999aAaa"]);
    let tresponse = jurisdiction.executeRevision("AddContract", revArgs);
    await expect(tresponse).to.emit(jurisdiction, "AddressParameterAdded").withArgs("jsc.contract.my2ndcontract", "0x111122223333444455556666777788889999aAaa");
    await expect(tresponse).to.emit(jurisdiction, "RevisionExecuted").withArgs("AddContract", revArgs);
    await testIterateParameters(
      ["jsc.contract.mycontract",         "jsc.contract.my2ndcontract"],
      ["This is a test contract address", "A second contract"],
      [jurisdiction.address,              "0x111122223333444455556666777788889999aAaa"]
    )

    revArgs = defaultAbiCoder.encode(
      ["string", "address"],
      ["jsc.contract.mycontract", jurisdiction.address]);
    tresponse = jurisdiction.executeRevision("RemoveContract", revArgs);
    await expect(tresponse).to.emit(jurisdiction, "AddressParameterRemoved").withArgs("jsc.contract.mycontract", jurisdiction.address);
    await expect(tresponse).to.emit(jurisdiction, "RevisionExecuted").withArgs("RemoveContract", revArgs);
    await testIterateParameters(
      ["jsc.contract.my2ndcontract"],
      ["A second contract"],
      ["0x111122223333444455556666777788889999aAaa"]
    );
  })
})
