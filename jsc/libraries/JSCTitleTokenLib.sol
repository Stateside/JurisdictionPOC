// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Address.sol";

/**
  This library contains code for use by the JSCTitleToken smart contract. It's purpose is primarily to reduce the size of 
  smart contracts that use this contract as a base class and centralize the type and functionality definitions.
 */
library JSCTitleTokenLib {
  using Address for address;

  // Offer Struct
  struct Offer {
      address buyer;
      uint amount;
      uint offeredOn;
  }

  // Token Struct
  struct TitleToken {
      string titleId;
      address owner;
      address approval;
      bool frozen;
      OfferList offersToSell;
      OfferList offersToBuy;
  }

  /**
    * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
    * The call is not executed if the target address is not a contract.
    *
    * @param from address representing the previous owner of the given token ID
    * @param to target address that will receive the tokens
    * @param tokenId uint ID of the token to be transferred
    * @param data bytes optional data to send along with the call
    * @return bool whether the call correctly returned the expected magic value
    */
  function checkOnERC721Received(
    address from,
    address to,
    uint tokenId,
    bytes memory data
  ) public returns (bool) {
    if (to.isContract()) {
      try IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, data) returns (bytes4 retval) {
        return retval == IERC721Receiver.onERC721Received.selector;
      } catch (bytes memory reason) {
        if (reason.length == 0) {
          revert("attempted transfer to non ERC721Receiver implementer");
        } else {
          /// @solidity memory-safe-assembly
          assembly {
            revert(add(32, reason), mload(reason))
          }
        }
      }
    } else {
      return true;
    }
  }

  /** Maintains an list of token IDs. Does not guarantee the order of the items in the list. In particular, removing an item can change the order */
  struct TokenIdList {
    uint[] arr;
    mapping(uint => uint) indexes;
  }

  /** Adds the given tokenId. Fails if the tokenId already exists in the list */
  function addTokenId(TokenIdList storage self, uint tokenId) public {
    require(self.indexes[tokenId] == 0, "TokenId already exists");

    self.arr.push(tokenId);
    self.indexes[tokenId] = self.arr.length;
  }
  
  /** Removes the given tokenId. Fails if the tokenId doesn not exist in the list */
  function removeTokenId(TokenIdList storage self, uint tokenId) public {
    require(self.indexes[tokenId] > 0, "TokenId does not exist");

    if (self.indexes[tokenId] < self.arr.length)
      self.arr[self.indexes[tokenId]-1] = self.arr[self.arr.length-1];
    self.arr.pop();
    delete self.indexes[tokenId];
  }

  /** Returns the number of tokenIds in the given list */
  function countTokenIds(TokenIdList storage self) public view returns (uint) {
    return self.arr.length;
  }

  /** Returns the token ID at the given index */
  function getTokenAt(TokenIdList storage self, uint index) public view returns (uint) {
    require(index < self.arr.length, "index out of bounds");
    return self.arr[index];
  }


  /** Maintains an list of offers. Does not guarantee the order of the items in the list. In particular, removing an item can change the order */
  struct OfferList {
    Offer[] arr;
    mapping(address => uint) indexes; // map of buyer addresses to index in arr
  }

  /** Adds the given offer. Overwrites any existing offer for the same address */
  function addOffer(OfferList storage self, address buyer, uint amount) public {
    require(amount > 0, "Amount must not be zero");

    Offer memory o = Offer(buyer, amount, block.timestamp);
    if (self.indexes[buyer] != 0)
      self.arr[self.indexes[buyer]-1] = o;
    else {
      self.arr.push(o);
      self.indexes[buyer] = self.arr.length;
    }
  }
  /** Removes the offer from the given offer. Fails if the offer doesn not exist in the list */
  function removeOffer(OfferList storage self, address buyer) public {
    require(self.indexes[buyer] > 0, "No offer found");

    if (self.indexes[buyer] < self.arr.length)
      self.arr[self.indexes[buyer]-1] = self.arr[self.arr.length-1];
    self.arr.pop();
    delete self.indexes[buyer];
  }

  /** Returns the number of offers in the given list */
  function countOffers(OfferList storage self) public view returns (uint) {
    return self.arr.length;
  }

  /** Returns the offer at the given index */
  function getOfferAt(OfferList storage self, uint index) public view returns (Offer storage) {
    require(index < self.arr.length, "index out of bounds");
    return self.arr[index];
  }
}
