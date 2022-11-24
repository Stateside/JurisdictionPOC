// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "contracts/production/JSCTitleToken.sol";

/**
 * @dev This is the title token smart contract. It includes an implementation of the https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard.
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
