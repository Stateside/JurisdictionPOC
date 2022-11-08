import * as tc from "../../typechain-types"
// @ts-ignore
import { deployments, ethers } from "hardhat"
import { expect, use as chaiuse } from "chai"
import * as helpers from "@nomicfoundation/hardhat-network-helpers";

import { solidity } from "ethereum-waffle";
import { defaultAbiCoder } from "ethers/lib/utils"
import { BigNumber } from "ethers";
chaiuse(solidity);

/**
 * Runs a colection of tests to ensure that the JSCTitleToken contract behaves as expected.
 * Includes tests for ERC-721 compliance.
 */
describe("JSCGovernor", async () => {
  let governor: tc.JSCGovernor
  let revisionsLib: tc.JSCRevisionsLib
  let configurableLib: any

  let owner, bob, jane, sara, otherAccounts;

  const zeroAddress = '0x0000000000000000000000000000000000000000';
  const badTokenId1 = 12345;

  const ONE_MINUTE = 60;

  beforeEach(async () => {
    await deployments.fixture(["all"]);
    governor = await ethers.getContract("JSCGovernor");
    revisionsLib = await ethers.getContract("JSCRevisionsLib");
    configurableLib = await ethers.getContract("JSCConfigurableLib");
    [owner, bob, jane, sara, ...otherAccounts] = await ethers.getSigners();
  });

  /*
  Propose single and multiple revisions in different contracts
    Check with unknown contracts
    Check who can propose (unknown and revision restrictions)
  Check states
  Check proposalDeadline()
  cast votes
    Check who can cast votes
    Check cast 2 vites
  check votes (proposalVotes())
  check hasVoted()
  Check quorums
  Check execute 1 and multiple revisions
  */
  it('remains frozen until initialized', async function() {
  });
})
