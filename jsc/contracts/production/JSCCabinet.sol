// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {JSCConfigurableLib as clib} from "libraries/JSCConfigurableLib.sol";
import {JSCRevisionsLib as rlib} from "libraries/JSCRevisionsLib.sol";
import "./JSCConfigurable.sol";
import "../IJSCCabinet.sol";

/**
  @dev This contract keeps track of the members of the jurisdiction cabinet and their roles.
*/
contract JSCCabinet is
    Context,
    AccessControlEnumerable,
    JSCConfigurable,
    IJSCCabinet
{
    using EnumerableSet for EnumerableSet.Bytes32Set;

    address private _jurisdiction;
    mapping(address => uint) private _roleCounts; // Count roles for each member
    EnumerableSet.Bytes32Set private _roles; // Keep track of roles in use

    /**
     * @dev See {IJSCCabinet-init}.
     */
    function init(
        address jurisdiction,
        address[] memory accounts,
        bytes32[] memory roles,
        address newOwner,
        rlib.VotingRules memory votingRules
    ) external onlyOwner {
        require(_jurisdiction == address(0), "init() cannot be called twice");
        require(jurisdiction != address(0), "invalid jurisdiction address");
        require(accounts.length == roles.length, "invalid parameters");
        JSCConfigurable._init();
        _jurisdiction = jurisdiction;

        for (uint i = 0; i < accounts.length; i++) {
            _grantRole(roles[i], accounts[i]);
        }

        clib.addVotingParameters(_parameters, votingRules);
        _addParameterRevisions();
        _addCabinetRevisions();

        if (newOwner != address(0)) {
            // Change onership of this contract to the new owner (governor usually)
            transferOwnership(newOwner);
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
        override(AccessControlEnumerable, JSCConfigurable, IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IJSCCabinet).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /** @dev See {IJSCCabinet-isMember} */
    function isMember(address account) public view override returns (bool) {
        return _roleCounts[account] > 0;
    }

    /** @dev See {IJSCCabinet-getRoleCount} */
    function getRoleCount() public view override returns (uint256) {
        return _roles.length();
    }

    /** @dev See {IJSCCabinet-getRoleAt} */
    function getRoleAt(uint256 index) public view override returns (bytes32) {
        return _roles.at(index);
    }

    function _grantRole(bytes32 role, address account) internal override {
        if (!hasRole(role, account)) {
            super._grantRole(role, account);
            _roleCounts[account]++; // Counts number of roles this account has
            if (getRoleMemberCount(role) == 1) 
                _roles.add(role); // _roles holds the set of all roles currently in use
        }
    }

    function _revokeRole(bytes32 role, address account) internal override {
        if (hasRole(role, account)) {
            super._revokeRole(role, account);
            _roleCounts[account]--; // Counts number of roles this account has
            if (getRoleMemberCount(role) == 0) 
                _roles.remove(role); // _roles holds the set of all roles currently in use
        }
    }

    function _addCabinetRevisions() internal {
        _addRevision(
            _createRevisionForAddMemberRole(
                "AddMemberRole",
                "Add a new member {account} with {role} role"
            )
        );
        _addHandler("AddMemberRole", _handlerAddMemberRole);
        _addRevision(
            _createRevisionForRemoveMemberRole(
                "RemoveMemberRole",
                "Remove the {role} role from member {account}"
            )
        );
        _addHandler("RemoveMemberRole", _handleRemoveMemberRole);
        _addRevision(
            _createRevisionForRemoveMember(
                "RemoveMember",
                "Remove the member {account}"
            )
        );
        _addHandler("RemoveMember", _handleRemoveMember);
    }

    function _createRevisionForAddMemberRole(
        string memory rname,
        string memory description
    ) internal pure returns (rlib.Revision memory) {
        string[] memory names = new string[](2);
        names[0] = "account";
        names[1] = "role";
        rlib.ParamType[] memory types = new rlib.ParamType[](2);
        types[0] = rlib.ParamType.t_account;
        types[1] = rlib.ParamType.t_role;
        string[] memory hints = new string[](2);
        hints[0] = "Address of member's account";
        hints[1] = "New role for this member";

        return
            rlib.Revision({
                name: rname,
                description: description,
                paramNames: names,
                paramTypes: types,
                paramHints: hints
            });
    }

    function _createRevisionForRemoveMemberRole(
        string memory rname,
        string memory description
    ) internal pure returns (rlib.Revision memory) {
        string[] memory names = new string[](2);
        names[0] = "account";
        names[1] = "role";
        rlib.ParamType[] memory types = new rlib.ParamType[](2);
        types[0] = rlib.ParamType.t_account;
        types[1] = rlib.ParamType.t_role;
        string[] memory hints = new string[](2);
        hints[0] = "Address of member's account";
        hints[1] = "Revoked role for this member";

        return
            rlib.Revision({
                name: rname,
                description: description,
                paramNames: names,
                paramTypes: types,
                paramHints: hints
            });
    }

    function _createRevisionForRemoveMember(
        string memory rname,
        string memory description
    ) internal pure returns (rlib.Revision memory) {
        string[] memory names = new string[](1);
        names[0] = "account";
        rlib.ParamType[] memory types = new rlib.ParamType[](1);
        types[0] = rlib.ParamType.t_account;
        string[] memory hints = new string[](1);
        hints[0] = "Address of member's account";

        return
            rlib.Revision({
                name: rname,
                description: description,
                paramNames: names,
                paramTypes: types,
                paramHints: hints
            });
    }

    function _handlerAddMemberRole(bytes memory pdata) internal {
        address account;
        uint role;
        (account, role) = abi.decode(pdata, (address, uint));
        _grantRole(bytes32(role), account);
    }

    function _handleRemoveMemberRole(bytes memory pdata) internal {
        address account;
        uint role;
        (account, role) = abi.decode(pdata, (address, uint));
        _revokeRole(bytes32(role), account);
    }

    function _handleRemoveMember(bytes memory pdata) internal {
        address account;
        (account) = abi.decode(pdata, (address));
        uint cnt = getRoleCount();
        // Go backwards through roles in case a role is removed
        // Stop when i == 0 since uint's cannot be negative
        for (uint i = cnt; i > 0; i--) { 
            _revokeRole(getRoleAt(i-1), account);
        }
    }
}
