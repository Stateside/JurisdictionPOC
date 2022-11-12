// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import { JSCRevisionsLib as rlib } from "libraries/JSCRevisionsLib.sol";

/**
  This is the interface for that all smart contracts that form prt of a JSCJurisdiction governance contract
  and want to advertise revisiosn that they support.
 */
interface IJSCRevisioned is IERC165 {
  event RevisionAdded(string name);
  event RevisionRemoved(string name);
  event RevisionExecuted(string name, bytes pdata);

  /** @dev Returns the number of revisions supported by this contract */
  function revisionCount() external view returns (uint);

  /** @dev Returns an iterator that allows you to retrieve the full list of revisions supported by this contract */
  function iterateRevisions() external view returns (rlib.Iterator);

  /** @dev Returns true if the given iterator refers to an existing revision or false if you have already passed the end of the list of revisions */
  function isValidRevisionIterator(rlib.Iterator i) external view returns (bool);

  /** @dev Returns an iterator pointing to the revision that comes after the revision pointed to by the given iterator */
  function nextRevision(rlib.Iterator i) external view returns (rlib.Iterator);

  /** @dev Returns Revision details pointed to by the given iterator */
  function revisionIteratorGet(rlib.Iterator i) external view returns (rlib.Revision memory value);

  /** Verifies that the given revision exists and executes it with the given ABI encoded parameter data */
  function executeRevision(string memory name, bytes memory pdata) external;

  /** @dev Returns Revision details for revision with given name */
  function getRevisionByName(string memory name) external view returns (rlib.Revision memory value);
}
