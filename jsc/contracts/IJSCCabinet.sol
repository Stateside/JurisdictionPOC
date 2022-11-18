// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/IAccessControlEnumerable.sol";
import "./IJSCConfigurable.sol";

/**
 * This is the cabinet interface. It keeps track of the members of the jurisdiction cabinet and their roles
 */
interface IJSCCabinet is IAccessControlEnumerable, IJSCConfigurable {  
    enum Role {Judicial, Legislative, Executive }

    /**
     * @dev Initializes the contract by connecting it to a jurisdiction and adding initial members
     */
    function init(
        address jurisdiction,
        address[] memory accounts,
        bytes32[] memory roles) external;

    /** @dev Indicates if the given member account is a member of this cabinet */
    function isMember(address account) external view returns (bool);

    /** @dev Indicates how many roles are in use by this Cabinet */
    function getRoleCount() external view returns (uint256);

    /** @dev Returns the role at the given index */
    function getRoleAt(uint256 index) external view returns (bytes32);
}