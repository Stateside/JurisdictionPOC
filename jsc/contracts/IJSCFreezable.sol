// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IJSCRevisioned.sol";

/**
 * This is the interface for the JSCFreezable contract which maintains a frozen state which can only be changed using "revisions"
 */
interface IJSCFreezable is IJSCRevisioned {
  event ContractFrozen(address con, bool frozen);

  /** Indicates if this contract is frozen or not */
  function isFrozen() external view returns (bool);
}
