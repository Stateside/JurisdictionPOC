// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import { JSCRevisionsLib as rlib } from "libraries/JSCRevisionsLib.sol";

/**
  This library contains code for use by the JSCTitleToken smart contract. It's purpose is primarily to reduce the size of 
  smart contracts that use this contract as a base class and centralize the type and functionality definitions.
 */
library JSCTitleTokenLib {
  using rlib for rlib.RevisionMap;
  using Address for address;

  /**
    * @dev Copied from IERC721 so that it can be emitted from this library
    */
  event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

  /**
    * @dev Copied from IERC721 so that it can be emitted from this library
    */
  event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

  /** Storage struct for the JSCTitleToken */
  struct Storage {
      // Owning Jurisdiciton contract address
      address jurisdiction;

      // Flag indicating if this contract is unfrozen and operational
      bool unfrozen;

      // Base URI for token metadata
      string baseURI;

      // Token name
      string name;

      // Token symbol
      string symbol;

      // Mapping from token ID to owner address
      mapping(uint => TitleToken) tokens;

      // Mapping owner address to tokenIds
      mapping(address => TokenIdList) tokensByOwner;

      // Mapping from owner to operator approvals
      mapping(address => mapping(address => bool)) operatorApprovals;

      // Mapping owner address to boolean value indicating frozen and cannot sell their tokens
      mapping(address => bool) frozenOwners;
  }

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


  /** Maintains a list of offers. Does not guarantee the order of the items in the list. In particular, removing an item can change the order */
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

  /** Removes the offer from the given offer. Fails if the offer does not exist in the list */
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

  /**
    * @dev Reverts if the `tokenId` has not been minted yet.
    */
  function requireMinted(Storage storage self, uint tokenId) public view {
    require(exists(self, tokenId), "invalid token ID");
  }

  /**
    * @dev Returns whether `tokenId` exists.
    *
    * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
    *
    * Tokens start existing when they are minted (`_mint`),
    * and stop existing when they are burned (`_burn`).
    */
  function exists(Storage storage self, uint tokenId) public view returns (bool) {
    return self.tokens[tokenId].owner != address(0);
  }

  /**
    * @dev Reverts if the frozen state of owner does not match the given state
    */
  function requireFrozenOwner(Storage storage self, address owner, bool frozen) public view {
      require(self.frozenOwners[owner] == frozen, !frozen?"token owner account is frozen":"token owner account is not frozen");
  }

  /**
    * @dev Reverts if the frozen state of tokenId does not match the given state
    */
  function requireFrozenToken(Storage storage self, uint tokenId, bool frozen) public view {
      require(self.tokens[tokenId].frozen == frozen, !frozen?"token is frozen":"token is not frozen");
  }
  
  /**
    * @dev Creates a new title token and transfers it to `owner`.
    *
    * Requirements:
    *
    * - If `owner` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
    * - `titleId` must not already exist.
    * - Owner of minted token must not be frozen
    *
    * Emits a {Transfer} event.
    */
  function mint(Storage storage self, address owner, string memory titleId, uint tokenId) public {
      require(owner != address(0), "mint to the zero address");
      
      addTokenId(self.tokensByOwner[owner], tokenId);
      self.tokens[tokenId].titleId = titleId;
      self.tokens[tokenId].owner = owner;

      emit Transfer(address(0), owner, tokenId);
      
      require(
          checkOnERC721Received(address(0), owner, tokenId, ""),
          "transfer to non ERC721Receiver implementer"
      );
  }
    
  /**
    * @dev Destroys `tokenId`.
    * The approval is cleared when the token is burned.
    *
    * Requirements:
    *
    * - `tokenId` must exist.
    *
    * Emits a {Transfer} event.
    */
  function burn(Storage storage self, uint tokenId, address owner) public {
    removeTokenId(self.tokensByOwner[owner], tokenId);
    delete self.tokens[tokenId];
    emit Transfer(owner, address(0), tokenId);
  }

  /**
    * @dev Transfers `tokenId` from `from` to `to`.
    *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
    *
    * Requirements:
    *
    * - `to` cannot be the zero address.
    * - `tokenId` token must be owned by `from`.
    *
    * Emits a {Transfer} event.
    */
  function transfer(
    Storage storage self, 
    address contractOwner,
    address from,
    address to,
    uint tokenId
  ) public {
    require(to != address(0), "transfer to the zero address");
    if (msg.sender != contractOwner) {
      requireFrozenToken(self, tokenId, false);
      requireFrozenOwner(self, from, false);
      requireFrozenOwner(self, to, false);
    }

    removeTokenId(self.tokensByOwner[from], tokenId);
    addTokenId(self.tokensByOwner[to], tokenId);
    self.tokens[tokenId].owner = to;
    if (self.tokens[tokenId].approval != address(0))
      approve(self, address(0), tokenId);

    emit Transfer(from, to, tokenId);
  }

  /**
    * @dev Approve `to` to operate on `tokenId`
    *
    * Emits an {Approval} event.
    */
  function approve(Storage storage self, address to, uint tokenId) public {
    TitleToken storage t = self.tokens[tokenId];
    t.approval = to;
    emit Approval(t.owner, to, tokenId);
  }

  function getRevisions() pure public returns (rlib.Revision[] memory result) {
    result = new rlib.Revision[](3);
    result[0] = getChangeOwnerRevision();
    result[1] = getFreezeTokenRevision();
    result[2] = getFreezeOwnerRevision();
  }

  function getChangeOwnerRevision() pure public returns (rlib.Revision memory) {
    string[] memory names = new string[](2);
    names[0] = "token";
    names[1] = "newOwner";
    rlib.ParamType[] memory types = new rlib.ParamType[](2);
    types[0] = rlib.ParamType.t_number;
    types[1] = rlib.ParamType.t_address;
    string[] memory hints = new string[](2);
    hints[0] = "ID of selected token";
    hints[1] = "Address of new owner";
    string[] memory roles = new string[](2);
    roles[0] = "Judicial";
    roles[1] = "Judicial";

    return rlib.Revision({
        name: "ChangeOwner",
        description: "Change the owner of a token",
        paramNames: names,
        paramTypes: types,
        paramHints: hints,
        rules: rlib.VotingRules(0,0,0,0,roles)
      });
  }

  function getFreezeTokenRevision() pure public returns (rlib.Revision memory) {
    string[] memory names = new string[](2);
    names[0] = "token";
    names[1] = "freeze";
    rlib.ParamType[] memory types = new rlib.ParamType[](2);
    types[0] = rlib.ParamType.t_number;
    types[1] = rlib.ParamType.t_bool;
    string[] memory hints = new string[](2);
    hints[0] = "ID of selected token";
    hints[1] = "Freeze token?";
    string[] memory roles = new string[](2);
    roles[0] = "Judicial";
    roles[1] = "Judicial";

    return rlib.Revision({
        name: "FreezeToken",
        description: "Freeze or unfreeze a token",
        paramNames: names,
        paramTypes: types,
        paramHints: hints,
        rules: rlib.VotingRules(0,0,0,0,roles)
      });
  }

  function getFreezeOwnerRevision() pure public returns (rlib.Revision memory) {
    string[] memory names = new string[](2);
    names[0] = "owner";
    names[1] = "freeze";
    rlib.ParamType[] memory types = new rlib.ParamType[](2);
    types[0] = rlib.ParamType.t_address;
    types[1] = rlib.ParamType.t_bool;
    string[] memory hints = new string[](2);
    hints[0] = "Address of selected owner";
    hints[1] = "Freeze owner?";
    string[] memory roles = new string[](2);
    roles[0] = "Judicial";
    roles[1] = "Judicial";

    return rlib.Revision({
        name: "FreezeOwner",
        description: "Freeze or unfreeze a property owner",
        paramNames: names,
        paramTypes: types,
        paramHints: hints,
        rules: rlib.VotingRules(0,0,0,0,roles)
      });
  }
}
