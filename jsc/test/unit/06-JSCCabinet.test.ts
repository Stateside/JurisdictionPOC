import * as tc from "../../typechain-types"
// @ts-ignore
import { deployments, ethers, network } from "hardhat"
import { expect } from "chai"
import { BigNumber } from "ethers";
import { defaultAbiCoder } from "ethers/lib/utils"

import * as iid from "../../utils/getInterfaceId"
import { ProposalState, VoteType } from "../../utils/types"

/**
 * Runs a colection of tests to ensure that the JSCCabinet contract behaves as expected.
 */
describe("JSCCabinet", async () => {
  let cabinet: tc.IJSCCabinet
  let jurisdiction: tc.IJSCJurisdiction
  let revisionsLib: tc.JSCRevisionsLib
  let configurableLib: any

  let owner, bob, jane, sara, bryan, paul, alex, otherAccounts;

  const zeroAddress = '0x0000000000000000000000000000000000000000';

  beforeEach(async () => {
    await deployments.fixture(["production", "unittests"]); // Reset blockchain to initial state with deployed and initialized contracts
    cabinet = await ethers.getContract("production_JSCCabinet");
    jurisdiction = await ethers.getContract("production_JSCJurisdiction");
    revisionsLib = await ethers.getContract("production_JSCRevisionsLib");
    configurableLib = await ethers.getContract("production_JSCConfigurableLib");
    [owner, bob, jane, sara, bryan, paul, alex, ...otherAccounts] = await ethers.getSigners();

    await (jurisdiction as tc.JSCJurisdiction).transferOwnership(cabinet.address)
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
    await expect(cabinet.init(jurisdiction.address, [], [])).to.be.revertedWith('init() cannot be called twice');
  });
})

  /*
  */
