import { JSCConfigurableTest } from "../../typechain-types"
import { JSCRevisionsLib } from "../../typechain-types/libraries"
// @ts-ignore
import { deployments, ethers } from "hardhat"
import { expect, use as chaiuse } from "chai"

import { solidity } from "ethereum-waffle";
import { defaultAbiCoder } from "ethers/lib/utils"
chaiuse(solidity);

describe("JSCConfigurableTest", async () => {
  let configurable: JSCConfigurableTest
  let rlib: JSCRevisionsLib

  const testIterateParameters = async (val1:any, val2:any, val3:any) => {
    await expect(await configurable.parameterCount()).to.be.equal(3);

    let i = await configurable.iterateParameters()
    await expect(await configurable.isValidParameterIterator(i)).to.be.true;
    let p = await configurable.parameterIteratorGet(i);
    await expect(p.name).to.be.equal("JSCConfigurableTest.address")
    await expect(p.description).to.be.equal("address param")
    let a = await configurable.getAddressParameter(p.name);
    await expect(a).to.be.equal(val1)

    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidParameterIterator(i)).to.be.true;
    p = await configurable.parameterIteratorGet(i);
    await expect(p.name).to.be.equal("JSCConfigurableTest.number")
    await expect(p.description).to.be.equal("number param")
    let bn = await configurable.getNumberParameter(p.name);
    await expect(bn).to.be.equal(val2)

    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidParameterIterator(i)).to.be.true;
    p = await configurable.parameterIteratorGet(i);
    await expect(p.name).to.be.equal("JSCConfigurableTest.string")
    await expect(p.description).to.be.equal("string param")
    let s = await configurable.getStringParameter(p.name);
    await expect(s).to.be.equal(val3)

    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidParameterIterator(i)).to.be.false;
    await expect(configurable.parameterIteratorGet(i)).to.be.revertedWith("Invalid iterator")
  }

  const testRevision = async (r:any, name:string, description:string, type:number) => {
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

  beforeEach(async () => {
    await deployments.fixture(["all"])
    configurable = await ethers.getContract("JSCConfigurableTest")
    rlib = await ethers.getContract("JSCRevisionsLib")
  })

  it("iterates parameters", async () => {
    await testIterateParameters("0x111122223333444455556666777788889999aAaa", 1234, "string value");
  })

  it("iterates parameter revisions", async () => {
    await expect(await configurable.revisionCount()).to.be.equal(3);
    
    let i = await configurable.iterateRevisions();
    await expect(await configurable.isValidRevisionIterator(i)).to.be.true;
    let r = await configurable.revisionIteratorGet(i);
    await testRevision(r, "JSCConfigurableTest.address", "address param", 0);
    
    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidRevisionIterator(i)).to.be.true;
    r = await configurable.revisionIteratorGet(i);
    await testRevision(r, "JSCConfigurableTest.number", "number param", 1);
    
    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidRevisionIterator(i)).to.be.true;
    r = await configurable.revisionIteratorGet(i);
    await testRevision(r, "JSCConfigurableTest.string", "string param", 2);
    
    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidRevisionIterator(i)).to.be.false;
    await expect(configurable.revisionIteratorGet(i)).to.be.revertedWith("Invalid iterator");
  })

  it("executes address parameter revision", async () => {
    let revArgs = defaultAbiCoder.encode(["string", "address"],["JSCConfigurableTest.address", "0x111122223333444455556666777788889999AaaB"]);
    let tresponse = configurable.executeRevision("JSCConfigurableTest.address", revArgs);
    await expect(tresponse).to.emit(configurable, "AddressParameterUpdated").withArgs("JSCConfigurableTest.address", "0x111122223333444455556666777788889999AaaB");
    await expect(tresponse).to.emit(configurable, "RevisionExecuted").withArgs("JSCConfigurableTest.address", revArgs);
    await testIterateParameters("0x111122223333444455556666777788889999AaaB", 1234, "string value");
  })

  it("executes number parameter revision", async () => {
    let revArgs = defaultAbiCoder.encode(["string", "uint"],["JSCConfigurableTest.number", "1235"]);
    let tresponse = configurable.executeRevision("JSCConfigurableTest.number", revArgs);
    await expect(tresponse).to.emit(configurable, "NumberParameterUpdated").withArgs("JSCConfigurableTest.number", "1235");
    await expect(tresponse).to.emit(configurable, "RevisionExecuted").withArgs("JSCConfigurableTest.number", revArgs);
    await testIterateParameters("0x111122223333444455556666777788889999aAaa", 1235, "string value");
  })

  it("executes string parameter revision", async () => {
    let revArgs = defaultAbiCoder.encode(["string", "string"],["JSCConfigurableTest.string", "new string"]);
    let tresponse = configurable.executeRevision("JSCConfigurableTest.string", revArgs);
    await expect(tresponse).to.emit(configurable, "StringParameterUpdated").withArgs("JSCConfigurableTest.string", "new string");
    await expect(tresponse).to.emit(configurable, "RevisionExecuted").withArgs("JSCConfigurableTest.string", revArgs);
    await testIterateParameters("0x111122223333444455556666777788889999aAaa", 1234, "new string");
  })
})
