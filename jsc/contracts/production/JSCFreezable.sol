// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./JSCBaseProposable.sol";

/**
 * This is the title token smart contract.
 *
 * Includes implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard.
 */
contract JSCFreezable is JSCBaseProposable {
  bool private _frozen = true;

  event ContractFrozen(address con, bool frozen);

  /**
   * @dev Initializes the contract by setting frozen to false
   */
  function _init() internal virtual onlyOwner {
    _frozen = false;

    _addFreezableRevisions();
    _addFreezableHandlers();
  }
  
  /** Modifier to prevent operation if contract is frozen */
  modifier unfrozenContract {
    require(!_frozen, "This contract is currently frozen");
    _;
  }

  /** Indicates if this contract is frozen or not */
  function isFrozen() public view returns (bool) {
    return _frozen;
  }
  
  function _addFreezableRevisions() private {
    string[] memory names = new string[](1);
    names[0] = "freeze";
    rlib.ParamType[] memory types = new rlib.ParamType[](1);
    types[0] = rlib.ParamType.t_bool;
    string[] memory hints = new string[](1);
    hints[0] = "Freeze contract?";
    string[] memory roles = new string[](1);
    roles[0] = "Judicial";

    _addRevision(rlib.Revision({
        name: "FreezeContract",
        description: "Freeze or unfreeze contract {address}",
        paramNames: names,
        paramTypes: types,
        paramHints: hints,
        rules: rlib.VotingRules(0,0,0,0,roles)
      }));
  }

  function _addFreezableHandlers() private {
    _addHandler("FreezeContract", _executeFreezeContract);
  }

  /** Implements the FreezeContract revision */
  function _executeFreezeContract(bytes memory pdata) private {
    _setFrozenContract(abi.decode(pdata, (bool)));
  }

  function _setFrozenContract(bool frozen) internal {
    require(_frozen == !frozen, frozen ? "contract is already frozen" : "contract is not frozen" );
    _frozen = frozen;
    emit ContractFrozen(address(this), _frozen);
  }
}
