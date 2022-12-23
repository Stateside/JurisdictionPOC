import * as tc from "../../typechain-types"
// @ts-ignore
import { deployments, ethers } from "hardhat"
import { expect } from "chai"
import { BigNumber } from "ethers";
import { defaultAbiCoder } from "ethers/lib/utils"
import * as roles from "../../utils/roles"
import "@nomicfoundation/hardhat-chai-matchers/panic"
import * as iid from "../../utils/getInterfaceId"
import { PANIC_CODES } from "@nomicfoundation/hardhat-chai-matchers/panic";

/**
 * Runs a colection of tests to ensure that the JSCCabinet contract behaves as expected.
 */
describe("JSCCabinet", async () => {
  let cabinet: tc.IJSCCabinet
  let jurisdiction: tc.IJSCJurisdiction
  let revisionsLib: tc.JSCRevisionsLib
  let configurableLib: any

  let owner, bob, jane, sara, bryan, paul, alex, peter, susan, otherAccounts;

  const zeroAddress = '0x0000000000000000000000000000000000000000';

  beforeEach(async () => {
    await deployments.fixture(["unittests"]); // Reset blockchain to initial state with deployed and initialized contracts
    cabinet = await ethers.getContract("unittests_JSCCabinet");
    jurisdiction = await ethers.getContract("unittests_JSCJurisdiction");
    revisionsLib = await ethers.getContract("unittests_JSCRevisionsLib");
    configurableLib = await ethers.getContract("unittests_JSCConfigurableLib");
    [owner, bob, jane, sara, bryan, paul, alex, peter, susan, ...otherAccounts] = await ethers.getSigners();
  });

  it('correctly checks interfaces IDs', async function() {
    expect(await cabinet.supportsInterface("0xffffffff")).to.equal(false);
    expect(await cabinet.supportsInterface(iid.IID_IERC165)).to.equal(true);
    expect(await cabinet.supportsInterface(iid.IID_IERC721)).to.equal(false);
    expect(await cabinet.supportsInterface(iid.IID_IERC721Metadata)).to.equal(false);
    expect(await cabinet.supportsInterface(iid.IID_IAccessControl)).to.equal(true);
    expect(await cabinet.supportsInterface(iid.IID_IAccessControlEnumerable)).to.equal(true);
    expect(await cabinet.supportsInterface(iid.IID_IJSCRevisioned)).to.equal(true);
    expect(await cabinet.supportsInterface(iid.IID_IJSCFreezable)).to.equal(true);
    expect(await cabinet.supportsInterface(iid.IID_IJSCConfigurable)).to.equal(true);
    expect(await cabinet.supportsInterface(iid.IID_IJSCTitleToken)).to.equal(false);
    expect(await cabinet.supportsInterface(iid.IID_IJSCJurisdiction)).to.equal(false);
    expect(await cabinet.supportsInterface(iid.IID_IJSCGovernor)).to.equal(false);
    expect(await cabinet.supportsInterface(iid.IID_IJSCCabinet)).to.equal(true);
  });

  it('remains frozen until initialized', async function() {
    const contract = await ethers.getContractFactory("JSCCabinet", {
      libraries: {
        JSCRevisionsLib: revisionsLib.address,
        JSCConfigurableLib: configurableLib.address
      },
    });
    const deployedContract:tc.IJSCCabinet = await contract.deploy() as tc.IJSCCabinet;
    await expect(await deployedContract.isFrozen()).to.equal(true);
  });

  it('fails on second init()', async function() {
    await expect(await cabinet.isFrozen()).to.equal(false);
    await expect(cabinet.init(jurisdiction.address, [], [], zeroAddress)).to.be.revertedWith('init() cannot be called twice');
  });

  it('checks membership correctly', async function() {
    await expect(await cabinet.hasRole(roles.JUDICIAL_ROLE.id, bob.address)).to.equal(true);
    await expect(await cabinet.hasRole(roles.LEGISLATIVE_ROLE.id, jane.address)).to.equal(true);
    await expect(await cabinet.hasRole(roles.LEGISLATIVE_ROLE.id, sara.address)).to.equal(true);
    await expect(await cabinet.hasRole(roles.EXECUTIVE_ROLE.id, bryan.address)).to.equal(true);
    await expect(await cabinet.hasRole(roles.EXECUTIVE_ROLE.id, paul.address)).to.equal(true);
    await expect(await cabinet.hasRole(roles.EXECUTIVE_ROLE.id, alex.address)).to.equal(true);

    await expect(await cabinet.hasRole(roles.JUDICIAL_ROLE.id, sara.address)).to.equal(false);
    await expect(await cabinet.hasRole(roles.LEGISLATIVE_ROLE.id, alex.address)).to.equal(false);
    await expect(await cabinet.hasRole(roles.EXECUTIVE_ROLE.id, bob.address)).to.equal(false);

    await expect(await cabinet.isMember(bob.address)).to.equal(true);
    await expect(await cabinet.isMember(jane.address)).to.equal(true);
    await expect(await cabinet.isMember(sara.address)).to.equal(true);
    await expect(await cabinet.isMember(bryan.address)).to.equal(true);
    await expect(await cabinet.isMember(paul.address)).to.equal(true);
    await expect(await cabinet.isMember(alex.address)).to.equal(true);

    await expect(await cabinet.isMember(owner.address)).to.equal(false);
    await expect(await cabinet.isMember(peter.address)).to.equal(false);
    await expect(await cabinet.isMember(susan.address)).to.equal(false);
  });

  it('iterates roles and members', async function() {
    await expect(await cabinet.getRoleCount()).to.equal(3);
    await expect(await cabinet.getRoleAt(0)).to.equal(roles.JUDICIAL_ROLE.id);
    await expect(await cabinet.getRoleAt(1)).to.equal(roles.LEGISLATIVE_ROLE.id);
    await expect(await cabinet.getRoleAt(2)).to.equal(roles.EXECUTIVE_ROLE.id);
    await expect(cabinet.getRoleAt(3)).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS); // 50

    await expect(await cabinet.getRoleMemberCount(roles.JUDICIAL_ROLE.id)).to.equal(1);
    await expect(await cabinet.getRoleMember(roles.JUDICIAL_ROLE.id, 0)).to.equal(bob.address);
    await expect(cabinet.getRoleMember(roles.JUDICIAL_ROLE.id, 1)).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS); // 50
    await expect(await cabinet.getRoleMemberCount(roles.LEGISLATIVE_ROLE.id)).to.equal(2);
    await expect(await cabinet.getRoleMember(roles.LEGISLATIVE_ROLE.id, 0)).to.equal(jane.address);
    await expect(await cabinet.getRoleMember(roles.LEGISLATIVE_ROLE.id, 1)).to.equal(sara.address);
    await expect(cabinet.getRoleMember(roles.LEGISLATIVE_ROLE.id, 2)).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS); // 50
    await expect(await cabinet.getRoleMemberCount(roles.EXECUTIVE_ROLE.id)).to.equal(3);
    await expect(await cabinet.getRoleMember(roles.EXECUTIVE_ROLE.id, 0)).to.equal(bryan.address);
    await expect(await cabinet.getRoleMember(roles.EXECUTIVE_ROLE.id, 1)).to.equal(paul.address);
    await expect(await cabinet.getRoleMember(roles.EXECUTIVE_ROLE.id, 2)).to.equal(alex.address);
    await expect(cabinet.getRoleMember(roles.EXECUTIVE_ROLE.id, 3)).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS); // 50
  });

  it('accepts revisions to add/remove a member role', async function() {
    let revArgs = defaultAbiCoder.encode(["address", "uint"],[peter.address, BigNumber.from(roles.LEGISLATIVE_ROLE.id)]);
    let tresponse = cabinet.executeRevision("AddMemberRole", revArgs);
    await expect(tresponse)
      .to.emit(cabinet, "RevisionExecuted").withArgs("AddMemberRole", revArgs)
      .to.emit(cabinet, "RoleGranted").withArgs(roles.LEGISLATIVE_ROLE.id, peter.address, owner.address);
      await expect(await cabinet.isMember(peter.address)).to.equal(true);
    await expect(await cabinet.getRoleMemberCount(roles.LEGISLATIVE_ROLE.id)).to.equal(3);

    revArgs = defaultAbiCoder.encode(["address", "uint"],[peter.address, BigNumber.from(roles.LEGISLATIVE_ROLE.id)]);
    tresponse = cabinet.executeRevision("RemoveMemberRole", revArgs);
    await expect(tresponse)
      .to.emit(cabinet, "RevisionExecuted").withArgs("RemoveMemberRole", revArgs)
      .to.emit(cabinet, "RoleRevoked").withArgs(roles.LEGISLATIVE_ROLE.id, peter.address, owner.address);
    await expect(await cabinet.isMember(peter.address)).to.equal(false);
    await expect(await cabinet.getRoleMemberCount(roles.LEGISLATIVE_ROLE.id)).to.equal(2);
  });
  
  it('accepts revision to remove all member roles', async function() {
    let revArgs = defaultAbiCoder.encode(["address", "uint"],[bob.address, BigNumber.from(roles.LEGISLATIVE_ROLE.id)]);
    let tresponse = cabinet.executeRevision("AddMemberRole", revArgs);
    await expect(tresponse)
      .to.emit(cabinet, "RevisionExecuted").withArgs("AddMemberRole", revArgs)
      .to.emit(cabinet, "RoleGranted").withArgs(roles.LEGISLATIVE_ROLE.id, bob.address, owner.address);
    await expect(await cabinet.hasRole(roles.JUDICIAL_ROLE.id, bob.address)).to.equal(true);
    await expect(await cabinet.hasRole(roles.LEGISLATIVE_ROLE.id, bob.address)).to.equal(true);
    await expect(await cabinet.hasRole(roles.EXECUTIVE_ROLE.id, bob.address)).to.equal(false);
    await expect(await cabinet.getRoleMemberCount(roles.JUDICIAL_ROLE.id)).to.equal(1);
    await expect(await cabinet.getRoleMemberCount(roles.LEGISLATIVE_ROLE.id)).to.equal(3);
    await expect(await cabinet.getRoleMemberCount(roles.EXECUTIVE_ROLE.id)).to.equal(3);

    revArgs = defaultAbiCoder.encode(["address"],[bob.address]);
    tresponse = cabinet.executeRevision("RemoveMember", revArgs);
    await expect(tresponse)
      .to.emit(cabinet, "RevisionExecuted").withArgs("RemoveMember", revArgs)
      .to.emit(cabinet, "RoleRevoked").withArgs(roles.JUDICIAL_ROLE.id, bob.address, owner.address)
      .to.emit(cabinet, "RoleRevoked").withArgs(roles.LEGISLATIVE_ROLE.id, bob.address, owner.address);
    await expect(await cabinet.hasRole(roles.JUDICIAL_ROLE.id, bob.address)).to.equal(false);
    await expect(await cabinet.hasRole(roles.LEGISLATIVE_ROLE.id, bob.address)).to.equal(false);
    await expect(await cabinet.hasRole(roles.EXECUTIVE_ROLE.id, bob.address)).to.equal(false);
    await expect(await cabinet.getRoleMemberCount(roles.JUDICIAL_ROLE.id)).to.equal(0);
    await expect(await cabinet.getRoleMemberCount(roles.LEGISLATIVE_ROLE.id)).to.equal(2);
    await expect(await cabinet.getRoleMemberCount(roles.EXECUTIVE_ROLE.id)).to.equal(3);
  });
})