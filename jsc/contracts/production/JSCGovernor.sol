// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import {ERC165Checker as erc165} from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import {JSCRevisionsLib as rlib} from "libraries/JSCRevisionsLib.sol";
import "./JSCConfigurable.sol";
import "../IJSCRevisioned.sol";
import "../IJSCGovernor.sol";
import "../IJSCJurisdiction.sol";
import "../IJSCCabinet.sol";

/**
 @dev This contract manages proposals for changes to the operation of the jurisdiction contracts.
 */
contract JSCGovernor is IJSCGovernor, JSCConfigurable {
    using SafeCast for uint256;
    using EnumerableSet for EnumerableSet.UintSet;

    mapping(uint256 => ProposalVote) private _proposalVotes;
    mapping(uint256 => ProposalCore) private _proposals;
    EnumerableSet.UintSet private _proposalIds; // Keep track of all proposals

    address private _jurisdiction;

    /**
    * @dev See {IJSCGovernor-init}.
    */
    function init(
            address jurisdiction,
            bool changeOwner,
            rlib.VotingRules memory votingRules) external onlyOwner {
        require(_jurisdiction == address(0), "init() cannot be called twice");
        require(jurisdiction != address(0), "invalid jurisdiction address");
        JSCConfigurable._init();
        _jurisdiction = jurisdiction;
        clib.addVotingParameters(_parameters, votingRules);
        _addParameterRevisions();

        if (changeOwner) {
            // This contract will own itself
            transferOwnership(address(this));
        }
    }

    /**
     * @dev See {IJSCCabinet-getJurisdiction}.
     */
    function getJurisdiction() view external returns (address) {
        return _jurisdiction;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IERC165, JSCConfigurable)
        returns (bool)
    {
        return
            interfaceId == type(IJSCGovernor).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IJSCGovernor.proposalCount}
     */
    function proposalCount() external view returns (uint256) {
        return _proposalIds.length();
    }
    
    /**
     * @dev See {IJSCGovernor.proposalAtIndex}
     */
    function proposalAtIndex(uint256 index) external view returns (uint256) {
        return _proposalIds.at(index);
    }
    
    /**
     * @dev See {IJSCGovernor.hashProposal}
     */
    function hashProposal(RevisionCall[] memory revs, bytes32 descriptionHash, uint256 version)
        public
        pure
        override
        returns (uint256)
    {
        return uint256(keccak256(abi.encode(revs, descriptionHash, version)));
    }

    /**
     * @dev See {IJSCGovernor.state}
     */
    function state(uint256 proposalId)
        public
        view
        override
        returns (ProposalState)
    {
        ProposalCore storage proposal = _proposals[proposalId];

        if (proposal.executed) {
            return ProposalState.Executed;
        }

        uint256 deadline = proposalDeadline(proposalId);

        if (deadline >= block.number) {
            return ProposalState.Active;
        }

        ProposalVote storage proposalvote = _proposalVotes[proposalId];
        if (
                quorum(proposalId) <= proposalvote.forVotes + proposalvote.abstainVotes && 
                Math.ceilDiv((proposalvote.forVotes + proposalvote.againstVotes + proposalvote.abstainVotes) * proposal.params.majority, 100) <= proposalvote.forVotes &&
                proposalvote.forVotes > proposalvote.againstVotes && 
                proposalvote.forVotes >= proposal.params.approvals) {
            return ProposalState.Succeeded;
        } else {
            return ProposalState.Defeated;
        }
    }

    /**
     * For each revision:
     * 1. make sure the target contract is in the jurisdiction
     * 2. make sure it implements IJSCRevisioned
     * 3. Get the voting rules and merge with others the get the most appropriate voting rules
     */
    function _mergeRules(RevisionCall[] memory revs)
        internal
        view
        returns (rlib.VotingRules memory res)
    {
        IJSCJurisdiction j = IJSCJurisdiction(_jurisdiction);
        IJSCCabinet c = IJSCCabinet(j.getContractAddress("jsc.contracts.cabinet"));
        for (uint256 i = 0; i < revs.length; i++) {
            RevisionCall memory r = revs[i];
            require(
                erc165.supportsInterface(r.target, type(IJSCConfigurable).interfaceId),
                "Contract does not support revisions"
            );

            // TODO: Get voting parameters from the target contract
            // But for now always use the parameters from the governor because not all voting parameters from all contracts are configurable in the UI yet
            IJSCConfigurable config = this; // IJSCConfigurable(r.target);
            rlib.VotingRules memory vr = clib.getVotingParameters(config);
            res.votingPeriod = vr.votingPeriod > res.votingPeriod
                ? vr.votingPeriod
                : res.votingPeriod;
            res.approvals = vr.approvals > res.approvals
                ? vr.approvals
                : res.approvals;
            res.quorum = vr.quorum > res.quorum ? vr.quorum : res.quorum;
            res.majority = vr.majority > res.majority
                ? vr.majority
                : res.majority;
            require(vr.role == 0 || c.hasRole(vr.role, msg.sender), "missing required role");
        }
    }

    /**
     * @dev See {IJSCGovernor.propose}
     */
    function propose(RevisionCall[] memory revs, string memory description, uint256 version)
        external
        override
    {
        uint256 proposalId = hashProposal(revs, keccak256(bytes(description)), version);

        require(revs.length > 0, "empty proposal");

        ProposalCore storage proposal = _proposals[proposalId];
        require(
            proposal.params.votingPeriod == 0,
            "proposal already exists"
        );

        rlib.VotingRules memory vr = _mergeRules(revs);
        proposal.voteStart = block.number.toUint64();
        proposal.params.votingPeriod = vr.votingPeriod;
        proposal.params.approvals = vr.approvals;
        proposal.params.majority = vr.majority;
        proposal.params.quorum = vr.quorum;
        _proposalIds.add(proposalId);

        require(
            proposal.params.votingPeriod > 0,
            "invalid proposal"
        );

        emit ProposalCreated(
            proposalId,
            _msgSender(),            
            proposal.voteStart,
            proposal.params,
            revs,
            version,
            description
        );
    }

    /**
     * @dev See {IJSCGovernor-execute}.
     */
    function execute(RevisionCall[] memory revs, bytes32 descriptionHash, uint256 version)
        public
        payable
        override
    {
        uint256 proposalId = hashProposal(revs, descriptionHash, version);

        ProposalState status = state(proposalId);
        require(
            status == ProposalState.Succeeded || status == ProposalState.Queued,
            "proposal not successful"
        );
        _proposals[proposalId].executed = true;

        emit ProposalExecuted(proposalId);

        _execute(proposalId, revs, descriptionHash, version);
    }

    /**
     * @dev Internal execution mechanism. Can be overridden to implement different execution mechanism
     */
    function _execute(
        uint256, /* proposalId */
        RevisionCall[] memory revs,
        bytes32, /* descriptionHash */
        uint256 /* version */
    ) internal {
        for (uint256 i = 0; i < revs.length; ++i) {
            RevisionCall memory r = revs[i];
            IJSCRevisioned(r.target).executeRevision(r.name, r.pdata);
        }
    }

    /**
     * @dev See {IJSCGovernor-castVote}.
     */
    function castVote(uint256 proposalId, uint8 support) public override {
        address voter = _msgSender();
        _castVote(proposalId, voter, support);
    }

    /**
     * @dev Internal vote casting mechanism: Check that the vote is pending, that it has not been cast yet, and call the {_countVote} internal function.
     *
     * Emits a {IJSCGovernor-VoteCast} event.
     */
    function _castVote(
        uint256 proposalId,
        address account,
        uint8 support
    ) internal {
        require(
            state(proposalId) == ProposalState.Active,
            "vote not currently active"
        );

        _countVote(proposalId, account, support);

        emit VoteCast(account, proposalId, support);
    }

    /**
     * @dev See {IJSCGovernor-hasVoted}.
     */
    function hasVoted(uint256 proposalId, address account)
        public
        view
        override
        returns (bool)
    {
        return _proposalVotes[proposalId].hasVoted[account];
    }

    /**
     * @dev See {IJSCGovernor-proposalVotes}.
     */
    function proposalVotes(uint256 proposalId)
        public
        view
        override
        returns (
            uint256 againstVotes,
            uint256 forVotes,
            uint256 abstainVotes
        )
    {
        ProposalVote storage proposalvote = _proposalVotes[proposalId];
        return (
            proposalvote.againstVotes,
            proposalvote.forVotes,
            proposalvote.abstainVotes
        );
    }

    /**
     * @dev See {IJSCGovernor-quorum}.
     */
    function quorum(uint256 proposalId) public view override returns (uint256) {
        ProposalCore storage proposal = _proposals[proposalId];

        // Quorum is reached when total votes > number of members * proposal quorum / 100
        IJSCJurisdiction j = IJSCJurisdiction(_jurisdiction);
        IJSCCabinet c = IJSCCabinet(j.getContractAddress("jsc.contracts.cabinet"));
        uint256 membersCount = c.memberCount();
        return Math.ceilDiv(membersCount * proposal.params.quorum, 100);
    }

    /**
     * @dev Returns the number of FOR votes required for the given proposal to be successful.
     */
    function approvals(uint256 proposalId) external view returns (uint16) {
        ProposalCore storage proposal = _proposals[proposalId];
        return proposal.params.approvals;
    }

    function majority(uint256 proposalId) external view returns (uint8) {
        ProposalCore storage proposal = _proposals[proposalId];
        return proposal.params.majority;
    }


    /**
     * @dev See {IJSCGovernor-proposalDeadline}.
     */
    function proposalDeadline(uint256 proposalId)
        public
        view
        override
        returns (uint256)
    {
        ProposalCore storage proposal = _proposals[proposalId];
        return proposal.voteStart + proposal.params.votingPeriod;
    }

    /**
     * @dev See {IJSCGovernor-existsProposal}.
     */
    function existsProposal(uint256 proposalId)
        public
        view
        override
        returns (bool)
    {
        ProposalCore storage proposal = _proposals[proposalId];
        return proposal.voteStart > 0;
    }

    /**
     * @dev Register a vote for `proposalId` by `account` with a given `support`, voting `weight` and voting `params`.
     *
     * Note: Support is generic and can represent various things depending on the voting system used.
     */
    function _countVote(
        uint256 proposalId,
        address account,
        uint8 support
    ) internal {
        ProposalVote storage proposalvote = _proposalVotes[proposalId];

        require(
            !proposalvote.hasVoted[account],
            "vote already cast"
        );
        proposalvote.hasVoted[account] = true;

        if (support == uint8(VoteType.Against)) {
            proposalvote.againstVotes += 1;
        } else if (support == uint8(VoteType.For)) {
            proposalvote.forVotes += 1;
        } else if (support == uint8(VoteType.Abstain)) {
            proposalvote.abstainVotes += 1;
        } else {
            revert("invalid value for enum VoteType");
        }
    }
}
