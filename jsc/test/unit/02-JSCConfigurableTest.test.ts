import * as tc from "../../typechain-types"
import { ParamType } from "../../utils/types"

// @ts-ignore
import { deployments, ethers } from "hardhat"
import { expect } from "chai"
import { defaultAbiCoder } from "ethers/lib/utils"
import * as iid from "../../utils/getInterfaceId"

describe("JSCConfigurableTest", async () => {
  let configurable: tc.JSCConfigurableTest
  let rlib: tc.JSCRevisionsLib

  const testIterateParameters = async (myAccount:any, myBool:any, myContract:any, myNumber:any, myRole:any, myString:string) => {
    await expect(await configurable.parameterCount()).to.be.equal(6);

    let i = await configurable.iterateParameters()
    await expect(await configurable.isValidParameterIterator(i)).to.be.true;
    let p = await configurable.parameterIteratorGet(i);
    await expect(p.name).to.be.equal("JSCConfigurableTest.account")
    await expect(p.description).to.be.equal("account param")
    let a = await configurable.getAccountParameter(p.name);
    await expect(a).to.be.equal(myAccount)

    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidParameterIterator(i)).to.be.true;
    p = await configurable.parameterIteratorGet(i);
    await expect(p.name).to.be.equal("JSCConfigurableTest.bool")
    await expect(p.description).to.be.equal("bool param")
    let b = await configurable.getBoolParameter(p.name);
    await expect(b).to.be.equal(myBool);

    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidParameterIterator(i)).to.be.true;
    p = await configurable.parameterIteratorGet(i);
    await expect(p.name).to.be.equal("JSCConfigurableTest.contract")
    await expect(p.description).to.be.equal("contract param")
    a = await configurable.getContractParameter(p.name);
    await expect(a).to.be.equal(myContract)

    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidParameterIterator(i)).to.be.true;
    p = await configurable.parameterIteratorGet(i);
    await expect(p.name).to.be.equal("JSCConfigurableTest.number")
    await expect(p.description).to.be.equal("number param")
    let bn = await configurable.getNumberParameter(p.name);
    await expect(bn).to.be.equal(myNumber)

    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidParameterIterator(i)).to.be.true;
    p = await configurable.parameterIteratorGet(i);
    await expect(p.name).to.be.equal("JSCConfigurableTest.role")
    await expect(p.description).to.be.equal("role param")
    bn = await configurable.getRoleParameter(p.name);
    await expect(bn).to.be.equal(myRole)

    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidParameterIterator(i)).to.be.true;
    p = await configurable.parameterIteratorGet(i);
    await expect(p.name).to.be.equal("JSCConfigurableTest.string")
    await expect(p.description).to.be.equal("string param")
    let s = await configurable.getStringParameter(p.name);
    await expect(s).to.be.equal(myString)

    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidParameterIterator(i)).to.be.false;
    await expect(configurable.parameterIteratorGet(i)).to.be.revertedWith("Invalid iterator")
  }

  const testRevision = async (r:any, name:string, description:string, type:ParamType) => {
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

  beforeEach(async () => {
    await deployments.fixture(["unittests"])
    configurable = await ethers.getContract("unittests_JSCConfigurableTest")
    rlib = await ethers.getContract("unittests_JSCRevisionsLib")
  })

  it('correctly checks interfaces IDs', async function() {
    expect(await configurable.supportsInterface("0xffffffff")).to.equal(false);
    expect(await configurable.supportsInterface(iid.IID_IERC165)).to.equal(true);
    expect(await configurable.supportsInterface(iid.IID_IERC721)).to.equal(false);
    expect(await configurable.supportsInterface(iid.IID_IERC721Metadata)).to.equal(false);
    expect(await configurable.supportsInterface(iid.IID_IJSCRevisioned)).to.equal(true);
    expect(await configurable.supportsInterface(iid.IID_IJSCFreezable)).to.equal(true);
    expect(await configurable.supportsInterface(iid.IID_IJSCConfigurable)).to.equal(true);
    expect(await configurable.supportsInterface(iid.IID_IJSCTitleToken)).to.equal(false);
    expect(await configurable.supportsInterface(iid.IID_IJSCJurisdiction)).to.equal(false);
  });

  it("iterates parameters", async () => {
    await testIterateParameters("0x111122223333444455556666777788889999aAaa", false, "0x111122223333444455556666777788889999Bbbb", 1234, "0x111122223333444455556666777788889999aaaabbbbccccddddeeeeffff0000", "string value");
  })

  it("iterates parameter revisions", async () => {
    await expect(await configurable.revisionCount()).to.be.equal(6);
    
    let i = await configurable.iterateRevisions();
    await expect(await configurable.isValidRevisionIterator(i)).to.be.true;
    let r = await configurable.revisionIteratorGet(i);
    await testRevision(r, "ChangeConfig:JSCConfigurableTest.account", "account param", ParamType.t_account);
    
    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidRevisionIterator(i)).to.be.true;
    r = await configurable.revisionIteratorGet(i);
    await testRevision(r, "ChangeConfig:JSCConfigurableTest.bool", "bool param", ParamType.t_bool);

    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidRevisionIterator(i)).to.be.true;
    r = await configurable.revisionIteratorGet(i);
    await testRevision(r, "ChangeConfig:JSCConfigurableTest.contract", "contract param", ParamType.t_contract);
    
    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidRevisionIterator(i)).to.be.true;
    r = await configurable.revisionIteratorGet(i);
    await testRevision(r, "ChangeConfig:JSCConfigurableTest.number", "number param", ParamType.t_number);
    
    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidRevisionIterator(i)).to.be.true;
    r = await configurable.revisionIteratorGet(i);
    await testRevision(r, "ChangeConfig:JSCConfigurableTest.role", "role param", ParamType.t_role);
    
    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidRevisionIterator(i)).to.be.true;
    r = await configurable.revisionIteratorGet(i);
    await testRevision(r, "ChangeConfig:JSCConfigurableTest.string", "string param", ParamType.t_string);
    
    i = await configurable.nextRevision(i)
    await expect(await configurable.isValidRevisionIterator(i)).to.be.false;
    await expect(configurable.revisionIteratorGet(i)).to.be.revertedWith("Invalid iterator");
  })

  it("executes account parameter revision", async () => {
    let revArgs = defaultAbiCoder.encode(["string", "address"],["JSCConfigurableTest.account", "0x111122223333444455556666777788889999AaaB"]);
    let tresponse = configurable.executeRevision("ChangeConfig:JSCConfigurableTest.account", revArgs);
    await expect(tresponse).to.emit(configurable, "AccountParameterUpdated").withArgs("JSCConfigurableTest.account", "0x111122223333444455556666777788889999AaaB");
    await expect(tresponse).to.emit(configurable, "RevisionExecuted").withArgs("ChangeConfig:JSCConfigurableTest.account", revArgs);
    await testIterateParameters("0x111122223333444455556666777788889999AaaB", false, "0x111122223333444455556666777788889999Bbbb", 1234, "0x111122223333444455556666777788889999aaaabbbbccccddddeeeeffff0000", "string value");
  })

  it("executes contract parameter revision", async () => {
    let revArgs = defaultAbiCoder.encode(["string", "address"],["JSCConfigurableTest.contract", "0x111122223333444455556666777788889999cccc"]);
    let tresponse = configurable.executeRevision("ChangeConfig:JSCConfigurableTest.contract", revArgs);
    await expect(tresponse).to.emit(configurable, "ContractParameterUpdated").withArgs("JSCConfigurableTest.contract", "0x111122223333444455556666777788889999CcCC");
    await expect(tresponse).to.emit(configurable, "RevisionExecuted").withArgs("ChangeConfig:JSCConfigurableTest.contract", revArgs);
    await testIterateParameters("0x111122223333444455556666777788889999aAaa", false, "0x111122223333444455556666777788889999CcCC", 1234, "0x111122223333444455556666777788889999aaaabbbbccccddddeeeeffff0000", "string value");
  })

  it("executes bool parameter revision", async () => {
    let revArgs = defaultAbiCoder.encode(["string", "bool"],["JSCConfigurableTest.bool", true]);
    let tresponse = configurable.executeRevision("ChangeConfig:JSCConfigurableTest.bool", revArgs);
    await expect(tresponse).to.emit(configurable, "BoolParameterUpdated").withArgs("JSCConfigurableTest.bool", true);
    await expect(tresponse).to.emit(configurable, "RevisionExecuted").withArgs("ChangeConfig:JSCConfigurableTest.bool", revArgs);
    await testIterateParameters("0x111122223333444455556666777788889999aAaa", true, "0x111122223333444455556666777788889999Bbbb", 1234, "0x111122223333444455556666777788889999aaaabbbbccccddddeeeeffff0000", "string value");
  })

  it("executes number parameter revision", async () => {
    let revArgs = defaultAbiCoder.encode(["string", "uint"],["JSCConfigurableTest.number", "1235"]);
    let tresponse = configurable.executeRevision("ChangeConfig:JSCConfigurableTest.number", revArgs);
    await expect(tresponse).to.emit(configurable, "NumberParameterUpdated").withArgs("JSCConfigurableTest.number", "1235");
    await expect(tresponse).to.emit(configurable, "RevisionExecuted").withArgs("ChangeConfig:JSCConfigurableTest.number", revArgs);
    await testIterateParameters("0x111122223333444455556666777788889999aAaa", false, "0x111122223333444455556666777788889999Bbbb", 1235, "0x111122223333444455556666777788889999aaaabbbbccccddddeeeeffff0000", "string value");
  })

  it("executes role parameter revision", async () => {
    let revArgs = defaultAbiCoder.encode(["string", "uint"],["JSCConfigurableTest.role", "0x111122223333444455556666777788889999aaaabbbbccccddddeeeeffff1111"]);
    let tresponse = configurable.executeRevision("ChangeConfig:JSCConfigurableTest.role", revArgs);
    await expect(tresponse).to.emit(configurable, "RoleParameterUpdated").withArgs("JSCConfigurableTest.role", "0x111122223333444455556666777788889999aaaabbbbccccddddeeeeffff1111");
    await expect(tresponse).to.emit(configurable, "RevisionExecuted").withArgs("ChangeConfig:JSCConfigurableTest.role", revArgs);
    await testIterateParameters("0x111122223333444455556666777788889999aAaa", false, "0x111122223333444455556666777788889999Bbbb", 1234, "0x111122223333444455556666777788889999aaaabbbbccccddddeeeeffff1111", "string value");
  })

  it("executes string parameter revision", async () => {
    let revArgs = defaultAbiCoder.encode(["string", "string"],["JSCConfigurableTest.string", "new string"]);
    let tresponse = configurable.executeRevision("ChangeConfig:JSCConfigurableTest.string", revArgs);
    await expect(tresponse).to.emit(configurable, "StringParameterUpdated").withArgs("JSCConfigurableTest.string", "new string");
    await expect(tresponse).to.emit(configurable, "RevisionExecuted").withArgs("ChangeConfig:JSCConfigurableTest.string", revArgs);
    await testIterateParameters("0x111122223333444455556666777788889999aAaa", false, "0x111122223333444455556666777788889999Bbbb", 1234, "0x111122223333444455556666777788889999aaaabbbbccccddddeeeeffff0000", "new string");
  })
})
