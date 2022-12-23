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

/**
 @dev This contract manages proposals for changes to the operation of the jurisdiciton contracts.
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
            bool changeOwner) external onlyOwner {
        require(_jurisdiction == address(0), "init() cannot be called twice");
        require(jurisdiction != address(0), "invalid jurisdiction address");
        JSCConfigurable._init();
        _jurisdiction = jurisdiction;

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

        if (_quorumReached(proposalId) && _voteSucceeded(proposalId)) {
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
    function _validateAndMergeRules(RevisionCall[] memory revs)
        internal
        view
        returns (rlib.VotingRules memory res)
    {
        for (uint256 i = 0; i < revs.length; i++) {
            RevisionCall memory r = revs[i];
            require(
                erc165.supportsInterface(r.target, type(IJSCRevisioned).interfaceId),
                "Contract does not support revisions"
            );

            IJSCRevisioned c = IJSCRevisioned(r.target);
            rlib.VotingRules memory vr = c.getRevisionByName(r.name).rules;
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
            // TODO: Check the roles array here to ensure caller has permission
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

        require(revs.length > 0, "Governor: empty proposal");

        ProposalCore storage proposal = _proposals[proposalId];
        require(
            proposal.params.votingPeriod == 0,
            "Governor: proposal already exists"
        );

        rlib.VotingRules memory vr = _validateAndMergeRules(revs);
        proposal.voteStart = block.number.toUint64();
        proposal.params.votingPeriod = vr.votingPeriod;
        proposal.params.approvals = vr.approvals;
        proposal.params.majority = vr.majority;
        proposal.params.quorum = vr.quorum;
        _proposalIds.add(proposalId);

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
            "Governor: proposal not successful"
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
            "Governor: vote not currently active"
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
     * @dev Amount of votes already cast passes the threshold limit.
     */
    function _quorumReached(uint256 proposalId) internal view returns (bool) {
        ProposalVote storage proposalvote = _proposalVotes[proposalId];

        return
            quorum(proposalId) <=
            proposalvote.forVotes + proposalvote.abstainVotes;
    }

    /**
     * @dev See {IJSCGovernor-quorum}.
     */
    function quorum(uint256 proposalId) public view override returns (uint256) {
        ProposalCore storage proposal = _proposals[proposalId];

        // Quorum is reached when total votes > number of members * proposal quorum / 100
        uint256 membersCount = 3; // TODO get member count from JSCCabinet
        return Math.ceilDiv(membersCount * proposal.params.quorum, 100);
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
     * @dev Is the proposal successful or not. The forVotes must be strictly over the againstVotes.
     */
    function _voteSucceeded(uint256 proposalId) internal view returns (bool) {
        ProposalVote storage proposalvote = _proposalVotes[proposalId];

        return proposalvote.forVotes > proposalvote.againstVotes;
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
            "Governor: vote already cast"
        );
        proposalvote.hasVoted[account] = true;

        if (support == uint8(VoteType.Against)) {
            proposalvote.againstVotes += 1;
        } else if (support == uint8(VoteType.For)) {
            proposalvote.forVotes += 1;
        } else if (support == uint8(VoteType.Abstain)) {
            proposalvote.abstainVotes += 1;
        } else {
            revert("Governor: invalid value for enum VoteType");
        }
    }
}
