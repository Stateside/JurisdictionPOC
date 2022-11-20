// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IJSCConfigurable.sol";

/**
 * This is the governor interface. Although inspired by (and to some extent copied from) OpenZeppelin's governor
 * this governor has some important differences:
 *
 * 1. Proposals are made of predefined revisions instead of being arbitrary contracts and function calls
 * 2. Only members of the JSCCabinet can vote
 * 3. Voting rules, quorum, and voting period are specific to proposals, rather than a single rule for all proposals
 * 4. There is no timelock controller
 *
 * The governor works as follows:
 *
 * - Proposals can be created, cancelled, voted on, and executed
 * - Proposals contain an id, a description, a proposer, one or more target contracts with one or more "revisions" for each contract
 * - Votes can be For, Against, or Abstain. Every member has a single vote. All votes have the same weight.
 * - Emits events: ProposalCanceled, ProposalCreated, VoteCast
 *
 * Detailed differences from OpenZeppelin and Compound
 * - Contacts must be in the jurisdiction and revisions must be supported by the contracts (they are not arbitrary operations)
 * - Votes cannot be delagated or bought so we don't need to create checkpoint of voting power
 * - There is no voting delay as votes cannot be delegated
 * - There is no external timelock controller - everything is done in the governor
 * - Each revision determines its own quorum, voting period, and voting rules (instead of a single one for all proposals)
 * - Revisions can be proposed by embers of the JSCCabinet with specific roles
 * - We will not be supporting EIP712 in the first version of this contract as we will not accept votes using signatures
 */
interface IJSCGovernor is IJSCConfigurable {
    struct VotingParams {
        /** How long voting lasts in number of blocks */
        uint16 votingPeriod;
        /** How many approvals needed (0-65535). Yes votes count as approvals. */
        uint16 approvals;
        /** Percentage of quorum that are yes votes needed for revision to pass (0-100) */
        uint8 majority;
        /** Percentage of cabinet response needed for vote to be considered valid (0-100). */
        uint8 quorum;
    }

    struct ProposalCore {
        uint64 voteStart;
        VotingParams params;
        bool executed;
        bool canceled;
    }

    enum ProposalState {
        Active,
        Canceled,
        Defeated,
        Succeeded,
        Queued,
        Expired,
        Executed
    }

    /**
     * @dev Supported vote types. Matches Governor Bravo ordering.
     */
    enum VoteType {
        Against,
        For,
        Abstain
    }

    struct ProposalVote {
        uint256 againstVotes;
        uint256 forVotes;
        uint256 abstainVotes;
        mapping(address => bool) hasVoted;
    }

    /** Contains the parameters needed to execute a revision */
    struct RevisionCall {
        address target;
        string name;
        bytes pdata;
    }

    /**
     * @dev Emitted when a proposal is created.
     */
    event ProposalCreated(
        uint256 proposalId,
        address proposer,
        uint256 startBlock,
        VotingParams params,
        RevisionCall[] revs,
        uint256 version,
        string description
    );

    /**
     * @dev Emitted when a proposal is executed.
     */
    event ProposalExecuted(uint256 proposalId);

    /**
     * @dev Emitted when a vote is cast without params.
     *
     * Note: `support` values should be seen as buckets. Their interpretation depends on the voting module used.
     */
    event VoteCast(address indexed voter, uint256 proposalId, uint8 support);

    /**
     * @dev Initializes the contract by connecting it to a jurisdiction
     */
    function init(address jurisdiction) external;

    /**
     * @dev Returns the number of proposals every created
     */
    function proposalCount() external view returns (uint256);
    
    /**
     * @dev returns the proposal ID at the given index. The index must be between 0 and proposalCount().
     */
    function proposalAtIndex(uint256 index) external view returns (uint256);
    
    /**
     * @dev The proposal id is produced by hashing the ABI encoded `revs` array, and the descriptionHash (bytes32 which itself
     * is the keccak256 hash of the description string) and the version. This proposal id
     * can be produced from the proposal data which is part of the {ProposalCreated} event. It can even be computed in
     * advance, before the proposal is submitted.
     *
     * Note that the chainId and the governor address are not part of the proposal id computation. Consequently, the
     * same proposal (with same operation and same description and same version) will have the same id if submitted on multiple governors
     * across multiple networks. In order to execute the same operation twice (on the same
     * governor) the proposer will have to change the version in order to avoid proposal id conflicts.
     */
    function hashProposal(
        RevisionCall[] memory revs,
        bytes32 descriptionHash,
        uint256 version
    ) external pure returns (uint256);

    /**
     * @dev Current state of a proposal, following Compound's convention
     */
    function state(uint256 proposalId) external view returns (ProposalState);

    /**
     * @dev Block number at which votes close. Votes close at the end of this block, so it is possible to cast a vote
     * during this block.
     */
    function proposalDeadline(uint256 proposalId)
        external
        view
        returns (uint256);

    /**
     * @dev Cast a vote
     *
     * Emits a {VoteCast} event.
     */
    function castVote(uint256 proposalId, uint8 support) external;

    /**
     * @dev Returns true if `account` has cast a vote on `proposalId`.
     */
    function hasVoted(uint256 proposalId, address account)
        external
        view
        returns (bool);

    /**
     * @dev Accessor to the internal vote counts.
     */
    function proposalVotes(uint256 proposalId)
        external
        view
        returns (
            uint256 againstVotes,
            uint256 forVotes,
            uint256 abstainVotes
        );

    /**
     * @dev Returns the minimum number of cast votes required for the given proposal to be successful.
     */
    function quorum(uint256 proposalId) external view returns (uint256);

    /**
     * @dev Create a new proposal. Vote starts in the block after the proposal is created and ends
     * a number of blocks later determined by the revisions. The version is arbitrary and allows
     * you to make the same proposal multiple times by changing the version. The convention is to use
     * a number which represents the date of the form YYYYMMDDnn: for example 2022123100.
     *
     * Emits a {ProposalCreated} event.
     *
     * This function must pull the voting rules from the contracts and calculate the merged rules
     */
    function propose(
        RevisionCall[] memory revs,
        string memory description,
        uint256 version
    ) external;

    /**
     * @dev Execute a successful proposal. This requires the quorum to be reached, the vote to be successful, and the
     * deadline to be reached.
     *
     * Emits a {ProposalExecuted} event.
     */
    function execute(
        RevisionCall[] memory revs,
        bytes32 descriptionHash,
        uint256 version
    ) external payable;
}
