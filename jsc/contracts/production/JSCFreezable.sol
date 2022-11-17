// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./JSCRevisioned.sol";
import "../IJSCFreezable.sol";

/**
 * This is a base contract that implements a frozen state which can only be changed using "revisions"
 */
contract JSCFreezable is IJSCFreezable, JSCRevisioned {
  bool private _frozen = true;

  /**
   * @dev Initializes the contract by setting frozen to false
   */
  function _init() internal virtual onlyOwner {
    _frozen = false;

    _addFreezableRevisions();
    _addFreezableHandlers();
  }
  
  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override(IERC165, JSCRevisioned) returns (bool) {
    return
      interfaceId == type(IJSCFreezable).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  /** Modifier to prevent operation if contract is frozen */
  modifier unfrozenContract {
    require(!_frozen, "This contract is currently frozen");
    _;
  }

  /**
   * @dev See {IJSCFreezable-isFrozen}.
   */
  function isFrozen() public view override returns (bool) {
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
        rules: rlib.VotingRules(rlib.BlocksPerWeek,0,51,51,roles)
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
