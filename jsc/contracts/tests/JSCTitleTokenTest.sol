// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "contracts/production/JSCTitleToken.sol";

/**
  This contract is for testing the JSCTitleTokenTest contract.
 */
contract JSCTitleTokenTest is JSCTitleToken {
  function setFrozenToken(uint tokenId, bool frozen) external { 
    _setFrozenToken(tokenId, frozen);
  }

  function setFrozenOwner(address owner, bool frozen) external { 
    _setFrozenOwner(owner, frozen);
  }

  function setFrozenContract(bool frozen) external { 
    _setFrozenContract(frozen);
  }
}
