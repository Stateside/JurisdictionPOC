import * as tc from "../../typechain-types"
import { ParamType } from "../../utils/types"
// @ts-ignore
import { deployments, ethers } from "hardhat"
import { expect } from "chai"
import { defaultAbiCoder } from "ethers/lib/utils"
import * as iid from "../../utils/getInterfaceId"
import { blocksPerWeek } from "../../utils/constants"
import { buildRoles } from "../../utils/roles"

describe("JSCJurisdiction", async () => {
  let jurisdiction: tc.IJSCJurisdiction
  let roles = buildRoles(ethers)

  const testParameterRevision = async (r:any, name:string, description:string, type:ParamType) => {
    await expect(r.name).to.be.equal(name);
    await expect(r.description).to.be.equal(description);
    await expect(r.paramNames.length, "r.paramNames Length").to.be.equal(2);
    await expect(r.paramNames[0]).to.be.equal("name");
    await expect(r.paramNames[1]).to.be.equal("value");
    await expect(r.paramTypes.length, "r.paramTypes Length").to.be.equal(2);
    await expect(r.paramTypes[0], "incorrect type for name parameter in revision").to.be.equal(ParamType.t_string);
    await expect(r.paramTypes[1], "incorrect type for value parameter in revision").to.be.equal(type);
    await expect(r.paramHints.length, "r.paramHints Length").to.be.equal(2);
    await expect(r.paramHints[0]).to.be.equal("Name of the parameter");
    await expect(r.paramHints[1]).to.be.equal("New value for the parameter");
  }

  const votingParams = [
    {
      name: "jsc.voting.period",
      description: "How many blocks voting lasts",
      value: blocksPerWeek,
      revision: {
        name: "ChangeConfig:jsc.voting.period",
        description: "How many blocks voting lasts",
      }
    },
    {
      name: "jsc.voting.approvals",
      description: "How many approvals needed",
      value: 0,
      revision: {
        name: "ChangeConfig:jsc.voting.approvals",
        description: "How many approvals needed",
      }
    },
    {
      name: "jsc.voting.majority",
      description: "% of votes that must be YES",
      value: 51,
      revision: {
        name: "ChangeConfig:jsc.voting.majority",
        description: "% of votes that must be YES",
      }
    },
    {
      name: "jsc.voting.quorum",
      description: "% of cabinet that must vote",
      value: 51,
      revision: {
        name: "ChangeConfig:jsc.voting.quorum",
        description: "% of cabinet that must vote",
      }
    },
    {
      name: "jsc.voting.role",
      description: "Role required for proposals",
      value: roles.EXECUTIVE_ROLE.id,
      revision: {
        name: "ChangeConfig:jsc.voting.role",
        description: "Role required for proposals",
      }
    }
  ]

  const testVotingParameters = async (c:tc.IJSCConfigurable, extraParamCount:number):ethers.BigNumber => {
    await expect(await c.parameterCount()).to.be.equal(extraParamCount + votingParams.length);
    let i = await c.iterateParameters()
    for(let j=0; j<votingParams.length; j++) {
      await expect(await c.isValidParameterIterator(i)).to.be.true;
      let p = await c.parameterIteratorGet(i);
      await expect(p.name).to.be.equal(votingParams[j].name)
      await expect(p.description).to.be.equal(votingParams[j].description)
      if (p.name === "jsc.voting.role") {
        let a = await c.getRoleParameter(p.name);
        await expect(a).to.be.equal(votingParams[j].value);
      } else {
        let a = await c.getNumberParameter(p.name);
        await expect(a).to.be.equal(votingParams[j].value);
      }
      i = await c.nextParameter(i)
    }

    if (extraParamCount === 0) {
      await expect(await c.isValidParameterIterator(i)).to.be.false;
      await expect(c.parameterIteratorGet(i)).to.be.revertedWith("Invalid iterator")
    }

    return i
  }

  const testIterateParameters = async (names:string[], descriptions:string[], addresses: string[]) => {
    let i = await testVotingParameters(jurisdiction, names.length)
    for(let j=0; j<names.length; j++) {
      await expect(await jurisdiction.isValidParameterIterator(i)).to.be.true;
      let p = await jurisdiction.parameterIteratorGet(i);
      await expect(p.name).to.be.equal(names[j])
      await expect(p.description).to.be.equal(descriptions[j])
      let a = await jurisdiction.getContractParameter(p.name);
      await expect(a).to.be.equal(addresses[j]);  
      i = await jurisdiction.nextParameter(i)
    }

    await expect(await jurisdiction.isValidParameterIterator(i)).to.be.false;
    await expect(jurisdiction.parameterIteratorGet(i)).to.be.revertedWith("Invalid iterator")
  }

  const testVotingRevisions = async (c:tc.IJSCRevisioned, i:ethers.BigNumber, extraRevisionCount:number):ethers.BigNumber => {
    await expect(await c.revisionCount()).to.be.equal(extraRevisionCount + votingParams.length);
    
    for(let j=0; j<votingParams.length; j++) {
      await expect(await c.isValidRevisionIterator(i)).to.be.true;
      let r = await c.revisionIteratorGet(i);
      let pr = votingParams[j].revision
      if (pr.name === "ChangeConfig:jsc.voting.role")
        await testParameterRevision(r, pr.name, pr.description, ParamType.t_role);
      else
        await testParameterRevision(r, pr.name, pr.description, ParamType.t_number);
      i = await c.nextRevision(i)
    }

    return i
  }

  beforeEach(async () => {
    await deployments.fixture(["unittests"])
    jurisdiction = await ethers.getContract("unittests_JSCJurisdiction")
  })

  it('fails on second init()', async function() {
    await expect(await jurisdiction.isFrozen()).to.equal(false);
    const jscCabinetContract = await ethers.getContract("unittests_JSCCabinet")
    const jscTitleTokenContract = await ethers.getContract("unittests_JSCTitleTokenTest")
    const jscGovernorContract = await ethers.getContract("unittests_JSCGovernor")
    await expect(jurisdiction.init(
      "UnitTestJurisdiction",
      ["jsc.contracts.cabinet",      "jsc.contracts.governor",      "jsc.contracts.tokens"],
      [jscCabinetContract.address,  jscGovernorContract.address,  jscTitleTokenContract.address],
      [
        "Manage the members of the jurisdiction and their roles",
        "Track proposals and votes",
        "Manage tokens, their owners, and the transfer of ownership"
      ],
      false,
      {
        votingPeriod: blocksPerWeek,
        approvals: 0,
        majority: 51,
        quorum: 51,
        role: roles.EXECUTIVE_ROLE.id,
      }
      )).to.be.revertedWith('init() cannot be called twice');
  });

  it('correctly checks interfaces IDs', async function() {
    expect(await jurisdiction.supportsInterface("0xffffffff")).to.equal(false);
    expect(await jurisdiction.supportsInterface(iid.IID_IERC165)).to.equal(true);
    expect(await jurisdiction.supportsInterface(iid.IID_IERC721)).to.equal(false);
    expect(await jurisdiction.supportsInterface(iid.IID_IERC721Metadata)).to.equal(false);
    expect(await jurisdiction.supportsInterface(iid.IID_IAccessControl)).to.equal(false);
    expect(await jurisdiction.supportsInterface(iid.IID_IAccessControlEnumerable)).to.equal(false);
    expect(await jurisdiction.supportsInterface(iid.IID_IJSCRevisioned)).to.equal(true);
    expect(await jurisdiction.supportsInterface(iid.IID_IJSCFreezable)).to.equal(true);
    expect(await jurisdiction.supportsInterface(iid.IID_IJSCConfigurable)).to.equal(true);
    expect(await jurisdiction.supportsInterface(iid.IID_IJSCTitleToken)).to.equal(false);
    expect(await jurisdiction.supportsInterface(iid.IID_IJSCJurisdiction)).to.equal(true);
    expect(await jurisdiction.supportsInterface(iid.IID_IJSCGovernor)).to.equal(false);
    expect(await jurisdiction.supportsInterface(iid.IID_IJSCCabinet)).to.equal(false);
  });

  it("iterates parameters", async () => {
    const jscCabinetContract = await ethers.getContract("unittests_JSCCabinet")
    const jscTitleTokenContract = await ethers.getContract("unittests_JSCTitleTokenTest")
    const jscGovernorContract = await ethers.getContract("unittests_JSCGovernor")
    await testIterateParameters(
      ["jsc.contracts.cabinet",      "jsc.contracts.governor",      "jsc.contracts.tokens"],
      [
        "Manage the members of the jurisdiction and their roles",
        "Track proposals and votes",
        "Manage tokens, their owners, and the transfer of ownership"
      ],
      [jscCabinetContract.address,  jscGovernorContract.address,  jscTitleTokenContract.address]
    )
  })

  it("checks the jurisdiction name", async () => {
    await expect(await jurisdiction.getJurisdictionName()).to.be.equal("UnitTestJurisdiction");
  });

  it("iterates jurisdiction revisions", async () => {
    let i = await jurisdiction.iterateRevisions();
    await expect(await jurisdiction.isValidRevisionIterator(i)).to.be.true;
    let r = await jurisdiction.revisionIteratorGet(i);
    await expect(r.name).to.be.equal("FreezeContract");
    await expect(r.description).to.be.equal("Freeze or unfreeze contract {address}");
    await expect(r.paramNames.length, "r.paramNames Length").to.be.equal(1);
    await expect(r.paramNames[0]).to.be.equal("freeze");
    await expect(r.paramTypes.length, "r.paramTypes Length").to.be.equal(1);
    await expect(r.paramTypes[0], "incorrect type for key parameter in revision").to.be.equal(ParamType.t_bool);
    await expect(r.paramHints.length, "r.paramHints Length").to.be.equal(1);
    await expect(r.paramHints[0]).to.be.equal("Freeze contract?");

    i = await jurisdiction.nextRevision(i)
    i = await testVotingRevisions(jurisdiction, i, 6);

    await expect(await jurisdiction.isValidRevisionIterator(i)).to.be.true;
    r = await jurisdiction.revisionIteratorGet(i);
    await testParameterRevision(r, "ChangeConfig:jsc.contracts.cabinet", "Manage the members of the jurisdiction and their roles", ParamType.t_contract);
    i = await jurisdiction.nextRevision(i)
    await expect(await jurisdiction.isValidRevisionIterator(i)).to.be.true;
    r = await jurisdiction.revisionIteratorGet(i);
    await testParameterRevision(r, "ChangeConfig:jsc.contracts.governor", "Track proposals and votes", ParamType.t_contract);
    i = await jurisdiction.nextRevision(i)
    await expect(await jurisdiction.isValidRevisionIterator(i)).to.be.true;
    r = await jurisdiction.revisionIteratorGet(i);
    await testParameterRevision(r, "ChangeConfig:jsc.contracts.tokens", "Manage tokens, their owners, and the transfer of ownership", ParamType.t_contract);
    
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
    await expect(r.paramTypes[0], "incorrect type for key parameter in revision").to.be.equal(ParamType.t_string);
    await expect(r.paramTypes[1], "incorrect type for description parameter in revision").to.be.equal(ParamType.t_string);
    await expect(r.paramTypes[2], "incorrect type for account parameter in revision").to.be.equal(ParamType.t_contract);
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
    await expect(r.paramTypes[0], "incorrect type for name parameter in revision").to.be.equal(ParamType.t_string);
    await expect(r.paramTypes[1], "incorrect type for contract parameter in revision").to.be.equal(ParamType.t_contract);
    await expect(r.paramHints.length, "r.paramHints Length").to.be.equal(2);
    await expect(r.paramHints[0]).to.be.equal("Unique key for this contract within the jurisdiction");
    await expect(r.paramHints[1]).to.be.equal("Current address of this contract");
  })

  it("executes account parameter revision", async () => {
    const jscCabinetContract = await ethers.getContract("unittests_JSCCabinet")
    const jscGovernorContract = await ethers.getContract("unittests_JSCGovernor")
    let revArgs:string = defaultAbiCoder.encode(["string", "address"],["jsc.contracts.tokens", "0x111122223333444455556666777788889999AaaB"]);
    let tresponse = jurisdiction.executeRevision("ChangeConfig:jsc.contracts.tokens", revArgs);
    await expect(tresponse).to.emit(jurisdiction, "ContractParameterUpdated").withArgs("jsc.contracts.tokens", "0x111122223333444455556666777788889999AaaB");
    await expect(tresponse).to.emit(jurisdiction, "RevisionExecuted").withArgs("ChangeConfig:jsc.contracts.tokens", revArgs);
    await testIterateParameters(
      ["jsc.contracts.cabinet",      "jsc.contracts.governor",      "jsc.contracts.tokens"],
      [
        "Manage the members of the jurisdiction and their roles",
        "Track proposals and votes",
        "Manage tokens, their owners, and the transfer of ownership"
      ],
      [jscCabinetContract.address,  jscGovernorContract.address, "0x111122223333444455556666777788889999AaaB"]
    )
  })

  it("executes AddContract and RemoveContract revisions", async () => {
    const jscCabinetContract = await ethers.getContract("unittests_JSCCabinet")
    const jscTitleTokenContract = await ethers.getContract("unittests_JSCTitleTokenTest")
    const jscGovernorContract = await ethers.getContract("unittests_JSCGovernor")
    let revArgs:string = defaultAbiCoder.encode(
      ["string", "string", "address"],
      ["jsc.contracts.my2ndcontract", "A second contract", "0x111122223333444455556666777788889999aAaa"]);
    let tresponse = jurisdiction.executeRevision("AddContract", revArgs);
    await expect(tresponse)
      .to.emit(jurisdiction, "ContractAdded").withArgs("jsc.contracts.my2ndcontract", "0x111122223333444455556666777788889999aAaa")
      .to.emit(jurisdiction, "RevisionExecuted").withArgs("AddContract", revArgs);
    await testIterateParameters(
      ["jsc.contracts.cabinet",      "jsc.contracts.governor",      "jsc.contracts.tokens", "jsc.contracts.my2ndcontract"],
      [
        "Manage the members of the jurisdiction and their roles",
        "Track proposals and votes",
        "Manage tokens, their owners, and the transfer of ownership",
        "A second contract"
      ],
      [jscCabinetContract.address,  jscGovernorContract.address, jscTitleTokenContract.address, "0x111122223333444455556666777788889999aAaa"]
    )

    revArgs = defaultAbiCoder.encode(
      ["string", "address"],
      ["jsc.contracts.my2ndcontract", "0x111122223333444455556666777788889999aAaa"]);
    tresponse = jurisdiction.executeRevision("RemoveContract", revArgs);
    await expect(tresponse)
      .to.emit(jurisdiction, "ContractRemoved").withArgs("jsc.contracts.my2ndcontract", "0x111122223333444455556666777788889999aAaa")
      .to.emit(jurisdiction, "RevisionExecuted").withArgs("RemoveContract", revArgs);
    await testIterateParameters(
      ["jsc.contracts.cabinet",      "jsc.contracts.governor",      "jsc.contracts.tokens"],
      [
        "Manage the members of the jurisdiction and their roles",
        "Track proposals and votes",
        "Manage tokens, their owners, and the transfer of ownership"
      ],
      [jscCabinetContract.address,  jscGovernorContract.address, jscTitleTokenContract.address]
    )
  })

  it("replaces contract with parameter update", async () => {
    const jscCabinetContract = await ethers.getContract("unittests_JSCCabinet")
    const jscTitleTokenContract = await ethers.getContract("unittests_JSCTitleTokenTest")
    const jscGovernorContract = await ethers.getContract("unittests_JSCGovernor")
    let revArgs = defaultAbiCoder.encode(
      ["string", "address"],
      ["jsc.contracts.tokens", "0x111122223333444455556666777788889999AaaB"]);
    let tresponse = jurisdiction.executeRevision("ChangeConfig:jsc.contracts.tokens", revArgs);
    await expect(tresponse)
      .to.emit(jurisdiction, "ContractParameterUpdated").withArgs("jsc.contracts.tokens", "0x111122223333444455556666777788889999AaaB")
      .to.emit(jurisdiction, "ContractReplaced").withArgs("jsc.contracts.tokens", jscTitleTokenContract.address, "0x111122223333444455556666777788889999AaaB")
      .to.emit(jurisdiction, "RevisionExecuted").withArgs("ChangeConfig:jsc.contracts.tokens", revArgs);
    await testIterateParameters(
      ["jsc.contracts.cabinet",      "jsc.contracts.governor",      "jsc.contracts.tokens"],
      [
        "Manage the members of the jurisdiction and their roles",
        "Track proposals and votes",
        "Manage tokens, their owners, and the transfer of ownership"
      ],
      [jscCabinetContract.address,  jscGovernorContract.address, "0x111122223333444455556666777788889999AaaB"]
    )
  })
})
