import * as tc from "../../typechain-types"
// @ts-ignore
import { deployments, ethers, network } from "hardhat"
import { expect } from "chai"
import { BigNumber } from "ethers";
import { defaultAbiCoder } from "ethers/lib/utils"
import "@nomicfoundation/hardhat-chai-matchers/panic"
import { PANIC_CODES } from "@nomicfoundation/hardhat-chai-matchers/panic";

import * as iid from "../../utils/getInterfaceId"
import { ParamType, ProposalState, VoteType } from "../../utils/types"
import { createProposalVersion, PreparedProposal, prepareProposal } from "../../utils/proposals";

/**
 * Runs a colection of tests to ensure that the JSCGovernor contract behaves as expected.
 */
describe("JSCGovernor", async () => {
  let governor: tc.IJSCGovernor
  let jurisdiction: tc.IJSCJurisdiction
  let revisionsLib: tc.JSCRevisionsLib
  let configurableLib: any

  let owner, bob, jane, sara, bryan, paul, alex, otherAccounts;

  const zeroAddress = '0x0000000000000000000000000000000000000000';
  let proposalVersion = createProposalVersion(new Date())

  const ONE_MINUTE = 60;

  beforeEach(async () => {
    await deployments.fixture(["unittests"]); // Reset blockchain to initial state with deployed and initialized contracts
    governor = await ethers.getContract("unittests_JSCGovernor");
    jurisdiction = await ethers.getContract("unittests_JSCJurisdiction");
    revisionsLib = await ethers.getContract("unittests_JSCRevisionsLib");
    configurableLib = await ethers.getContract("unittests_JSCConfigurableLib");
    [owner, bob, jane, sara, bryan, paul, alex, ...otherAccounts] = await ethers.getSigners();

    await (jurisdiction as tc.JSCJurisdiction).transferOwnership(governor.address)
  });

  it('correctly checks interfaces IDs', async function() {
    expect(await governor.supportsInterface("0xffffffff")).to.equal(false);
    expect(await governor.supportsInterface(iid.IID_IERC165)).to.equal(true);
    expect(await governor.supportsInterface(iid.IID_IERC721)).to.equal(false);
    expect(await governor.supportsInterface(iid.IID_IERC721Metadata)).to.equal(false);
    expect(await governor.supportsInterface(iid.IID_IAccessControl)).to.equal(false);
    expect(await governor.supportsInterface(iid.IID_IAccessControlEnumerable)).to.equal(false);
    expect(await governor.supportsInterface(iid.IID_IJSCRevisioned)).to.equal(true);
    expect(await governor.supportsInterface(iid.IID_IJSCFreezable)).to.equal(true);
    expect(await governor.supportsInterface(iid.IID_IJSCConfigurable)).to.equal(true);
    expect(await governor.supportsInterface(iid.IID_IJSCTitleToken)).to.equal(false);
    expect(await governor.supportsInterface(iid.IID_IJSCJurisdiction)).to.equal(false);
    expect(await governor.supportsInterface(iid.IID_IJSCGovernor)).to.equal(true);
    expect(await governor.supportsInterface(iid.IID_IJSCCabinet)).to.equal(false);
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
    await expect(governor.init(jurisdiction.address, false)).to.be.revertedWith('init() cannot be called twice');
  });

  const checkVotingParams = (actual:tc.IJSCGovernor.VotingParamsStructOutput|undefined, expected:tc.IJSCGovernor.VotingParamsStruct) => {
    expect(actual?.votingPeriod).to.equal(expected.votingPeriod)
    expect(actual?.approvals).to.equal(expected.approvals)
    expect(actual?.majority).to.equal(expected.majority)
    expect(actual?.quorum).to.equal(expected.quorum)
  }

  const checkRevisionCall = (actual:tc.IJSCGovernor.RevisionCallStructOutput[]|undefined, expected:tc.IJSCGovernor.RevisionCallStruct[]) => {
    actual?.forEach((rr:tc.IJSCGovernor.RevisionCallStructOutput, i:number) => {
      expect(rr.target).to.equal(expected[i].target)
      expect(rr.name).to.equal(expected[i].name)
      expect(rr.pdata).to.equal(expected[i].pdata)
    })
  }

  /** the ceiling of the division of two numbers */
  const ceilDiv = (a:number,b:number) => Math.ceil(a/b)
  const blocksPerWeek = () => 5*60*24*7

  const basicProposalTests = async (proposal:PreparedProposal, expectedQuorum:number) => {
    await expect(governor.connect(bob).castVote(proposal.proposalHash, VoteType.For)).to.be.revertedWith("Governor: vote not currently active");
    let proposalBlockNumber = await ethers.provider.getBlockNumber();

    let resultRules:tc.IJSCGovernor.VotingParamsStructOutput | undefined
    let resultRevs:tc.IJSCGovernor.RevisionCallStructOutput[] | undefined
    await expect(governor.propose(proposal.revs, proposal.description, proposal.version))
      .to.emit(governor, 'ProposalCreated').withArgs(
        proposal.proposalHash,
        owner.address,
        proposalBlockNumber+1,
        (rules)=>{resultRules=rules; return true},
        (revs)=>{resultRevs=revs; return true},
        proposal.version,
        proposal.description
      )
    checkVotingParams(resultRules, {
      votingPeriod: blocksPerWeek(),
      approvals: 0,
      majority: 51,
      quorum: 51
    })
    checkRevisionCall(resultRevs, proposal.revs)
      
    proposalBlockNumber = await ethers.provider.getBlockNumber();
    await expect(governor.propose(proposal.revs, proposal.description, proposal.version)).to.be.revertedWith("Governor: proposal already exists"); // Proposing the same thing twice will fail
    await expect(governor.propose(proposal.revs, proposal.description, proposal.version+1)).to.not.be.reverted; // Bump version to create a new valid proposal
    await expect(await governor.state(proposal.proposalHash)).to.equal(ProposalState.Active);
    await expect(await governor.proposalVotes(proposal.proposalHash)).to.deep.equal([BigNumber.from(0), BigNumber.from(0), BigNumber.from(0)]);
    await expect(await governor.proposalDeadline(proposal.proposalHash)).to.equal(proposalBlockNumber + blocksPerWeek());
    await expect(await governor.quorum(proposal.proposalHash)).to.equal(expectedQuorum);

    // Test if votes can be made and are recorded correctly
    await expect(await governor.hasVoted(proposal.proposalHash, sara.address)).to.equal(false);
    await expect(governor.connect(sara).castVote(proposal.proposalHash, VoteType.Against))
      .to.emit(governor, 'VoteCast').withArgs(sara.address, proposal.proposalHash, VoteType.Against);
    await expect(await governor.hasVoted(proposal.proposalHash, sara.address)).to.equal(true);
    await expect(governor.connect(sara).castVote(proposal.proposalHash, VoteType.Against)).to.be.revertedWith("Governor: vote already cast");
    await expect(await governor.proposalVotes(proposal.proposalHash)).to.deep.equal([BigNumber.from(1), BigNumber.from(0), BigNumber.from(0)]);

    await expect(await governor.hasVoted(proposal.proposalHash, bob.address)).to.equal(false);
    await expect(governor.connect(bob).castVote(proposal.proposalHash, VoteType.For))
      .to.emit(governor, 'VoteCast').withArgs(bob.address, proposal.proposalHash, VoteType.For);
    await expect(await governor.hasVoted(proposal.proposalHash, bob.address)).to.equal(true);
    await expect(governor.connect(bob).castVote(proposal.proposalHash, VoteType.For)).to.be.revertedWith("Governor: vote already cast");
    await expect(await governor.proposalVotes(proposal.proposalHash)).to.deep.equal([BigNumber.from(1), BigNumber.from(1), BigNumber.from(0)]);

    await expect(await governor.hasVoted(proposal.proposalHash, jane.address)).to.equal(false);
    await expect(governor.connect(jane).castVote(proposal.proposalHash, VoteType.Abstain))
      .to.emit(governor, 'VoteCast').withArgs(jane.address, proposal.proposalHash, VoteType.Abstain);
    await expect(await governor.hasVoted(proposal.proposalHash, jane.address)).to.equal(true);
    await expect(governor.connect(jane).castVote(proposal.proposalHash, VoteType.Abstain)).to.be.revertedWith("Governor: vote already cast");
    await expect(await governor.proposalVotes(proposal.proposalHash)).to.deep.equal([BigNumber.from(1), BigNumber.from(1), BigNumber.from(1)]);

    // This shouldn't change after voting
    await expect(await governor.proposalDeadline(proposal.proposalHash)).to.equal(proposalBlockNumber + blocksPerWeek());
    await expect(await governor.quorum(proposal.proposalHash)).to.equal(expectedQuorum);
  }

  it('accepts simple proposal', async function() {
    const proposal = await prepareProposal(ethers, governor, [
      {
        target: jurisdiction.address,
        name: "FreezeContract",
        pdata: "",
        description: "",
        parameters: [
          {
            name: "freeze",
            value: true,
            type: ParamType.t_bool,
            hint: ""
          }
        ]
      }], "Freeze the jurisdiction contract", ++proposalVersion)

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
    const proposal = await prepareProposal(ethers, governor, [
      {
        target: jurisdiction.address,
        name: "FreezeContract",
        pdata: "",
        description: "",
        parameters: [
          {
            name: "freeze",
            value: true,
            type: ParamType.t_bool,
            hint: ""
          }
        ]  
      }], "Freeze the jurisdiction contract", ++proposalVersion)

    await expect(await jurisdiction.isFrozen()).to.equal(false);
    await testWinningProposal(proposal)
    await expect(await jurisdiction.isFrozen()).to.equal(true);
  });

  it('executes complex winning proposal', async function() {
    const proposal = await prepareProposal(ethers, governor, [
      {
        target: jurisdiction.address,
        name: "AddContract",
        pdata: "",
        description: "",
        parameters: [
          {
            name: "key",
            value: "jsc.contracts.mycontract",
            type: ParamType.t_string,
            hint: ""
          },
          {
            name: "description",
            value: "A contract",
            type: ParamType.t_string,
            hint: ""
          },
          {
            name: "address",
            value: "0x111122223333444455556666777788889999aAaa",
            type: ParamType.t_address,
            hint: ""
          }
        ]
      },
      {
        target: jurisdiction.address,
        name: "FreezeContract",
        pdata: "",
        description: "",
        parameters: [
          {
            name: "freeze",
            value: true,
            type: ParamType.t_bool,
            hint: ""
          }
        ]
      }
    ], "Add a contract and then freeze the jurisdiction contract", ++proposalVersion)

    await expect(await jurisdiction.isFrozen()).to.equal(false);
    await expect(jurisdiction.getAddressParameter("jsc.contracts.mycontract")).to.be.revertedWith("Trying to access non-existant parameter")
    await testWinningProposal(proposal)
    await expect(await jurisdiction.isFrozen()).to.equal(true);
    await expect(await jurisdiction.getAddressParameter("jsc.contracts.mycontract")).to.equal("0x111122223333444455556666777788889999aAaa")
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
    const proposal = await prepareProposal(ethers, governor, [
      {
        target: jurisdiction.address,
        name: "FreezeContract",
        pdata: "",
        description: "",
        parameters: [
          {
            name: "freeze",
            value: true,
            type: ParamType.t_bool,
            hint: ""
          }
        ]
      }
    ], "Freeze the jurisdiction contract", ++proposalVersion)

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
    const proposal = await prepareProposal(ethers, governor, [
      {
        target: jurisdiction.address,
        name: "FreezeContract",
        pdata: "",
        description: "",
        parameters: [
          {
            name: "freeze",
            value: true,
            type: ParamType.t_bool,
            hint: ""
          }
        ]
      }
    ], "Freeze the jurisdiction contract", ++proposalVersion)

    await testExpiredProposal(proposal)
  });

  it('accepts proposal with multiple revisions', async function() {
    const proposal = await prepareProposal(ethers, governor, [
      {
        target: jurisdiction.address,
        name: "FreezeContract",
        pdata: "",
        description: "",
        parameters: [
          {
            name: "freeze",
            value: true,
            type: ParamType.t_bool,
            hint: ""
          }
        ]
      },
      {
        target: jurisdiction.address,
        name: "FreezeContract",
        pdata: "",
        description: "",
        parameters: [
          {
            name: "freeze",
            value: false,
            type: ParamType.t_bool,
            hint: ""
          }
        ]
      }
    ], "Freeze and unfreeze the jurisdiction contract", ++proposalVersion)

    await basicProposalTests(proposal, ceilDiv(3*51, 100))
  });

  it('rejects simple proposal with unknown contract', async function() {
    const proposal = await prepareProposal(ethers, governor, [
      {
        target: revisionsLib.address,
        name: "FreezeContract",
        pdata: "",
        description: "",
        parameters: [
          {
            name: "freeze",
            value: true,
            type: ParamType.t_bool,
            hint: ""
          }
        ]
      }
    ], "Freeze the jurisdiction contract", ++proposalVersion)

    await expect(governor.propose(proposal.revs, proposal.description, proposal.version)).to.be.revertedWith("Contract does not support revisions");
  });

  it('rejects simple proposal with zero contract', async function() {
    const proposal = await prepareProposal(ethers, governor, [
      {
        target: zeroAddress,
        name: "FreezeContract",
        pdata: "",
        description: "",
        parameters: [
          {
            name: "freeze",
            value: true,
            type: ParamType.t_bool,
            hint: ""
          }
        ]
      }
    ], "Freeze the jurisdiction contract", ++proposalVersion)

    await expect(governor.propose(proposal.revs, proposal.description, proposal.version)).to.be.revertedWith("Contract does not support revisions");
  });

  it('iterates all existing proposals', async function() {
    const propData = [
      {
        target: jurisdiction.address,
        name: "FreezeContract",
        pdata: "",
        description: "",
        parameters: [
          {
            name: "freeze",
            value: true,
            type: ParamType.t_bool,
            hint: ""
          }
        ]
      }
    ];
    const p1 = await prepareProposal(ethers, governor, propData, "1", 1)
    const p2 = await prepareProposal(ethers, governor, propData, "2", 2)
    const p3 = await prepareProposal(ethers, governor, propData, "3", 3)
    const p4 = await prepareProposal(ethers, governor, propData, "4", 4)

    await expect(governor.propose(p1.revs, p1.description, p1.version)).to.not.be.reverted;
    await expect(governor.propose(p2.revs, p2.description, p2.version)).to.not.be.reverted;
    await expect(governor.propose(p3.revs, p3.description, p3.version)).to.not.be.reverted;
    await expect(governor.propose(p4.revs, p4.description, p4.version)).to.not.be.reverted;
    
    await expect(await governor.proposalCount()).to.equal(4);
    await expect(await governor.proposalAtIndex(0)).to.equal(p1.proposalHash);
    await expect(await governor.proposalAtIndex(1)).to.equal(p2.proposalHash);
    await expect(await governor.proposalAtIndex(2)).to.equal(p3.proposalHash);
    await expect(await governor.proposalAtIndex(3)).to.equal(p4.proposalHash);
    await expect(governor.proposalAtIndex(4)).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);
  });
})

  /*
    Check who can propose (unknown and revision restrictions)
    Check who can cast votes
    Check link to jurisdiction
    What happens if we propose to freeze the governor? Can we unfreeze it?
  */
