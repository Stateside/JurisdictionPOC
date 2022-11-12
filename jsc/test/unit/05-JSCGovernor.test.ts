import * as tc from "../../typechain-types"
// @ts-ignore
import { deployments, ethers, network } from "hardhat"
import { expect, use as chaiuse } from "chai"
import * as helpers from "@nomicfoundation/hardhat-network-helpers";
import { BigNumber } from "ethers";
import { solidity } from "ethereum-waffle";
import { defaultAbiCoder } from "ethers/lib/utils"

import * as iid from "../../utils/getInterfaceId"
import { ProposalState, VoteType } from "../../utils/types"

/**
 * Runs a colection of tests to ensure that the JSCGovernor contract behaves as expected.
 */
describe("JSCGovernor", async () => {
  let governor: tc.IJSCGovernor
  let jurisdiction: tc.IJSCJurisdiction
  let revisionsLib: tc.JSCRevisionsLib
  let configurableLib: any

  let owner, bob, jane, sara, bryan, paul, alex, otherAccounts;

  const createProposalVersion = (d: Date) => {
    let v = d.getFullYear()
    v = v*100 + d.getMonth() + 1
    v = v*100 + d.getDate()
    return v*100;
  }
  const zeroAddress = '0x0000000000000000000000000000000000000000';
  let proposalVersion = createProposalVersion(new Date())

  const ONE_MINUTE = 60;

  beforeEach(async () => {
    await deployments.fixture(["all"]); // Reset blockchain to initial state with deployed and initialized contracts
    governor = await ethers.getContract("JSCGovernor");
    jurisdiction = await ethers.getContract("JSCJurisdiction");
    revisionsLib = await ethers.getContract("JSCRevisionsLib");
    configurableLib = await ethers.getContract("JSCConfigurableLib");
    [owner, bob, jane, sara, bryan, paul, alex, ...otherAccounts] = await ethers.getSigners();

    await (jurisdiction as tc.JSCJurisdiction).transferOwnership(governor.address)
  });

  it('correctly checks interfaces IDs', async function() {
    expect(await governor.supportsInterface("0xffffffff")).to.equal(false);
    expect(await governor.supportsInterface(iid.IID_IERC165)).to.equal(true);
    expect(await governor.supportsInterface(iid.IID_IERC721)).to.equal(false);
    expect(await governor.supportsInterface(iid.IID_IERC721Metadata)).to.equal(false);
    expect(await governor.supportsInterface(iid.IID_IJSCRevisioned)).to.equal(true);
    expect(await governor.supportsInterface(iid.IID_IJSCFreezable)).to.equal(true);
    expect(await governor.supportsInterface(iid.IID_IJSCConfigurable)).to.equal(true);
    expect(await governor.supportsInterface(iid.IID_IJSCTitleToken)).to.equal(false);
    expect(await governor.supportsInterface(iid.IID_IJSCJurisdiction)).to.equal(false);
    expect(await governor.supportsInterface(iid.IID_IJSCGovernor)).to.equal(true);
  });

  it('remains frozen until initialized', async function() {
    const contract = await ethers.getContractFactory("JSCGovernor", {
      libraries: {
        JSCRevisionsLib: revisionsLib.address,
        JSCConfigurableLib: configurableLib.address
      },
    });
    const deployedContract:tc.IJSCGovernor = await contract.deploy() as tc.IJSCGovernor;
    await expect(await deployedContract.isFrozen()).to.equal(true);
  });

  it('fails on second init()', async function() {
    await expect(await governor.isFrozen()).to.equal(false);
    await expect(governor.init(jurisdiction.address)).to.be.revertedWith('init() cannot be called twice');
  });

  type PreparedProposal = {
    revs: tc.IJSCGovernor.RevisionCallStruct[],
    description: string,
    descriptionHash: string,
    proposalHash: BigNumber,
    version: number,
    incrementVersion: () => void
  }

  const prepareProposal = async (revs: tc.IJSCGovernor.RevisionCallStruct[], description: string):Promise<PreparedProposal> => {
    const descriptionHash:string = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(description))
    const pp = {
      revs,
      description,
      descriptionHash,
      proposalHash: BigNumber.from(0),
      version: 0,
      incrementVersion: async function() {
        this.version = ++proposalVersion
        this.proposalHash = await governor.hashProposal(revs, descriptionHash, this.version)
      }
    }
    pp.incrementVersion();
    return pp
  }

  /** the ceiling of the division of two numbers */
  const ceilDiv = (a:number,b:number) => Math.ceil(a/b)
  const oneWeek = () => 6*24*7

  const basicProposalTests = async (proposal:PreparedProposal, expectedQuorum:number) => {
    await expect(governor.connect(bob).castVote(proposal.proposalHash, VoteType.For)).to.be.revertedWith("Governor: vote not currently active");
    await expect(governor.propose(proposal.revs, proposal.description, proposal.version)).to.not.be.reverted;
    let proposalBlockNumber = await ethers.provider.getBlockNumber();
    await expect(governor.propose(proposal.revs, proposal.description, proposal.version)).to.be.revertedWith("Governor: proposal already exists"); // Proposing the same thing twice will fail
    await expect(governor.propose(proposal.revs, proposal.description, proposal.version+1)).to.not.be.reverted; // Bump version to create a new valid proposal
    await expect(await governor.state(proposal.proposalHash)).to.equal(ProposalState.Active);
    await expect(await governor.proposalVotes(proposal.proposalHash)).to.deep.equal([BigNumber.from(0), BigNumber.from(0), BigNumber.from(0)]);
    await expect(await governor.proposalDeadline(proposal.proposalHash)).to.equal(proposalBlockNumber + oneWeek());
    await expect(await governor.quorum(proposal.proposalHash)).to.equal(expectedQuorum);

    // Test if votes can be made and are recorded correctly
    await expect(await governor.hasVoted(proposal.proposalHash, sara.address)).to.equal(false);
    await expect(governor.connect(sara).castVote(proposal.proposalHash, VoteType.Against)).to.not.be.reverted;
    await expect(await governor.hasVoted(proposal.proposalHash, sara.address)).to.equal(true);
    await expect(governor.connect(sara).castVote(proposal.proposalHash, VoteType.Against)).to.be.revertedWith("Governor: vote already cast");
    await expect(await governor.proposalVotes(proposal.proposalHash)).to.deep.equal([BigNumber.from(1), BigNumber.from(0), BigNumber.from(0)]);

    await expect(await governor.hasVoted(proposal.proposalHash, bob.address)).to.equal(false);
    await expect(governor.connect(bob).castVote(proposal.proposalHash, VoteType.For)).to.not.be.reverted;
    await expect(await governor.hasVoted(proposal.proposalHash, bob.address)).to.equal(true);
    await expect(governor.connect(bob).castVote(proposal.proposalHash, VoteType.For)).to.be.revertedWith("Governor: vote already cast");
    await expect(await governor.proposalVotes(proposal.proposalHash)).to.deep.equal([BigNumber.from(1), BigNumber.from(1), BigNumber.from(0)]);

    await expect(await governor.hasVoted(proposal.proposalHash, jane.address)).to.equal(false);
    await expect(governor.connect(jane).castVote(proposal.proposalHash, VoteType.Abstain)).to.not.be.reverted;
    await expect(await governor.hasVoted(proposal.proposalHash, jane.address)).to.equal(true);
    await expect(governor.connect(jane).castVote(proposal.proposalHash, VoteType.Abstain)).to.be.revertedWith("Governor: vote already cast");
    await expect(await governor.proposalVotes(proposal.proposalHash)).to.deep.equal([BigNumber.from(1), BigNumber.from(1), BigNumber.from(1)]);

    // This shouldn't change after voting
    await expect(await governor.proposalDeadline(proposal.proposalHash)).to.equal(proposalBlockNumber + oneWeek());
    await expect(await governor.quorum(proposal.proposalHash)).to.equal(expectedQuorum);
  }

  it('accepts simple proposal', async function() {
    const proposal = await prepareProposal([{
      target: jurisdiction.address,
      name: "FreezeContract",
      pdata: defaultAbiCoder.encode(["bool"],[true])
    }], "Freeze the jurisdiction contract")

    await basicProposalTests(proposal, ceilDiv(3*51, 100))
  });

  const testWinningProposal = async (proposal:PreparedProposal) => {
    await expect(governor.propose(proposal.revs, proposal.description, proposal.version)).to.not.be.reverted;
    let bn = await ethers.provider.getBlockNumber();

    await expect(governor.connect(bryan).castVote(proposal.proposalHash, VoteType.Against)).to.not.be.reverted;
    await expect(governor.connect(paul).castVote(proposal.proposalHash, VoteType.For)).to.not.be.reverted;
    await expect(governor.connect(alex).castVote(proposal.proposalHash, VoteType.For)).to.not.be.reverted;
    await expect(await governor.proposalVotes(proposal.proposalHash)).to.deep.equal([BigNumber.from(1), BigNumber.from(2), BigNumber.from(0)]);

    let deadline = await governor.proposalDeadline(proposal.proposalHash);
    bn = await ethers.provider.getBlockNumber();
    await network.provider.send("hardhat_mine", [ethers.utils.hexStripZeros(ethers.utils.hexlify(deadline.toNumber()-bn+1)), "0x0"]);
    await expect(await governor.state(proposal.proposalHash)).to.equal(ProposalState.Succeeded);

    await expect(governor.connect(bob).castVote(proposal.proposalHash, VoteType.For)).to.be.revertedWith("Governor: vote not currently active");

    await expect(await governor.connect(bob).execute(proposal.revs, proposal.descriptionHash, proposal.version))
      .to.emit(governor, 'ProposalExecuted').withArgs(proposal.proposalHash);
  }

  it('executes simple winning proposal', async function() {
    const proposal = await prepareProposal([{
      target: jurisdiction.address,
      name: "FreezeContract",
      pdata: defaultAbiCoder.encode(["bool"],[true])
    }], "Freeze the jurisdiction contract")

    await expect(await jurisdiction.isFrozen()).to.equal(false);
    await testWinningProposal(proposal)
    await expect(await jurisdiction.isFrozen()).to.equal(true);
  });

  it('executes complex winning proposal', async function() {
    const proposal = await prepareProposal([{
      target: jurisdiction.address,
      name: "AddContract",
      pdata: defaultAbiCoder.encode(
        ["string", "string", "address"],
        ["jsc.contract.myontract", "A contract", "0x111122223333444455556666777788889999aAaa"])
    }, {
      target: jurisdiction.address,
      name: "FreezeContract",
      pdata: defaultAbiCoder.encode(["bool"],[true])
    }], "Add a contract and then freeze the jurisdiction contract")

    await expect(await jurisdiction.isFrozen()).to.equal(false);
    await expect(jurisdiction.getAddressParameter("jsc.contract.myontract")).to.be.revertedWith("Trying to access non-existant parameter")
    await testWinningProposal(proposal)
    await expect(await jurisdiction.isFrozen()).to.equal(true);
    await expect(await jurisdiction.getAddressParameter("jsc.contract.myontract")).to.equal("0x111122223333444455556666777788889999aAaa")
  });

  const testLosingProposal = async (proposal:PreparedProposal) => {
    await expect(governor.propose(proposal.revs, proposal.description, proposal.version)).to.not.be.reverted;
    let bn = await ethers.provider.getBlockNumber();

    await expect(governor.connect(bryan).castVote(proposal.proposalHash, VoteType.Against)).to.not.be.reverted;
    await expect(governor.connect(paul).castVote(proposal.proposalHash, VoteType.Abstain)).to.not.be.reverted;
    await expect(governor.connect(alex).castVote(proposal.proposalHash, VoteType.For)).to.not.be.reverted;
    await expect(await governor.proposalVotes(proposal.proposalHash)).to.deep.equal([BigNumber.from(1), BigNumber.from(1), BigNumber.from(1)]);

    let deadline = await governor.proposalDeadline(proposal.proposalHash);
    bn = await ethers.provider.getBlockNumber();
    await network.provider.send("hardhat_mine", [ethers.utils.hexStripZeros(ethers.utils.hexlify(deadline.toNumber()-bn+1)), "0x0"]);
    await expect(await governor.state(proposal.proposalHash)).to.equal(ProposalState.Defeated);

    await expect(governor.connect(bob).castVote(proposal.proposalHash, VoteType.For)).to.be.revertedWith("Governor: vote not currently active");
  }

  it('processes losing proposals', async function() {
    const proposal = await prepareProposal([{
      target: jurisdiction.address,
      name: "FreezeContract",
      pdata: defaultAbiCoder.encode(["bool"],[true])
    }], "Freeze the jurisdiction contract")

    await testLosingProposal(proposal)
  });

  const testExpiredProposal = async (proposal:PreparedProposal) => {
    await expect(governor.propose(proposal.revs, proposal.description, proposal.version)).to.not.be.reverted;
    let bn = await ethers.provider.getBlockNumber();

    await expect(governor.connect(bryan).castVote(proposal.proposalHash, VoteType.For)).to.not.be.reverted;
    await expect(await governor.proposalVotes(proposal.proposalHash)).to.deep.equal([BigNumber.from(0), BigNumber.from(1), BigNumber.from(0)]);

    let deadline = await governor.proposalDeadline(proposal.proposalHash);
    bn = await ethers.provider.getBlockNumber();
    await network.provider.send("hardhat_mine", [ethers.utils.hexStripZeros(ethers.utils.hexlify(deadline.toNumber()-bn+1)), "0x0"]);
    await expect(await governor.state(proposal.proposalHash)).to.equal(ProposalState.Defeated); // Expired not currently used

    await expect(governor.connect(bob).castVote(proposal.proposalHash, VoteType.For)).to.be.revertedWith("Governor: vote not currently active");
  }

  it('expires proposals', async function() {
    const proposal = await prepareProposal([{
      target: jurisdiction.address,
      name: "FreezeContract",
      pdata: defaultAbiCoder.encode(["bool"],[true])
    }], "Freeze the jurisdiction contract")

    await testExpiredProposal(proposal)
  });

  it('accepts proposal with multiple revisions', async function() {
    const proposal = await prepareProposal([{
      target: jurisdiction.address,
      name: "FreezeContract",
      pdata: defaultAbiCoder.encode(["bool"],[true])
    }, {
      target: jurisdiction.address,
      name: "FreezeContract",
      pdata: defaultAbiCoder.encode(["bool"],[false])
    }], "Freeze and unfreeze the jurisdiction contract")

    await basicProposalTests(proposal, ceilDiv(3*51, 100))
  });

  it('rejects simple proposal with unknown contract', async function() {
    const proposal = await prepareProposal([{
      target: revisionsLib.address,
      name: "FreezeContract",
      pdata: defaultAbiCoder.encode(["bool"],[true])
    }], "Freeze the jurisdiction contract")

    await expect(governor.propose(proposal.revs, proposal.description, proposal.version)).to.be.revertedWith("Contract does not support revisions");
  });

  it('rejects simple proposal with zero contract', async function() {
    const proposal = await prepareProposal([{
      target: zeroAddress,
      name: "FreezeContract",
      pdata: defaultAbiCoder.encode(["bool"],[true])
    }], "Freeze the jurisdiction contract")

    await expect(governor.propose(proposal.revs, proposal.description, proposal.version)).to.be.revertedWith("Contract does not support revisions");
  });
})

  /*
    Check who can propose (unknown and revision restrictions)
    Check who can cast votes
    Check link to jurisdiction
  */
