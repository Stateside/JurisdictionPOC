// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "./IJSCConfigurable.sol";
import {JSCTitleTokenLib as tlib} from "libraries/JSCTitleTokenLib.sol";

/**
 * This is the title token smart contract.
 *
 * Includes implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard.
 */
interface IJSCTitleToken is IJSCConfigurable, IERC721, IERC721Metadata
{
  event TokenFrozen(uint256 tokenId, bool frozen);
  event OwnerFrozen(address owner, bool frozen);
  event OfferToSell(uint256 tokenId, address buyer, uint256 amount);
  event OfferToSellCancelled(uint256 tokenId, address buyer);
  event OfferToBuy(uint256 tokenId, address buyer, uint256 amount);
  event OfferToBuyCancelled(uint256 tokenId, address buyer);

  /**
   * @dev Initializes the contract by setting a `name` and a `symbol` for the token collection and connecting this contract to a jurisdiction
   */
  function init(
      string memory name_, 
      string memory symbol_, 
      string memory baseURI_, 
      address jurisdiction_,
      address registryAccount_,
      uint256 registryFee_,
      address maintainerAccount_,
      uint256 maintainerFee_,
      address newOwner
    ) external;

  /**
   * @dev Returns the address of the jurisdicion of which this contract is a part
   */
  function getJurisdiction() view external returns (address);

  /**
   * @dev Returns the amount of title tokens in existence.
   */
  function totalSupply() external view returns (uint256);
  
  /**
   * @dev returns the tokenId at the given index. The index must be between 0 and totalSupply(). Note that the supply
   * of tokens (and the assigned indexes) may change if iterating the list spans multiple blocks.
   */
  function tokenAtIndex(uint256 index) external view returns (uint256);

  /**
   * @dev returns the tokenId belonging to the given owner at the given index. The given index must be
   * between 0 and balanceOf(owner)
   */
  function ownerTokenAtIndex(address owner, uint256 index) external view returns (uint256);

  /**
   * @dev Returns `tokenId` for given titleId.
   */
  function titleToTokenId(string memory titleId) external pure returns (uint256);

  /**
   * @dev Returns `titleId` for given tokenId.
   */
  function tokenToTitleId(uint tokenId) external view returns (string memory);

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
  function mint(address owner, string memory titleId) external;

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
  function burn(uint256 tokenId) external;

  /** Returns true if the given token is frozen */
  function isFrozenToken(uint256 tokenId) external view returns (bool);

  /** Returns true if the given owner is frozen */
  function isFrozenOwner(address owner) external view returns (bool);

  /** Returns count of offers to buy from other addresses */
  function countOffersToBuy(uint256 tokenId) external view returns (uint256);

  /** Returns count of offers to buy from other addresses */
  function offerToBuyAtIndex(uint256 tokenId, uint256 index) external view returns (tlib.Offer memory);

  /** 
   * Adds an offer to buy the given token for the given amount. 
   * That amount of crypto currency must be available in the callers account. 
   * It will be transferred to this contract until the offer is is cancelled or the owner accepts the offer.
   */
  function offerToBuy(uint256 tokenId, uint256 amount) external payable;

  /** Accepts an existing offer to buy from the given buyer */
  function acceptOfferToBuy(uint256 tokenId, address buyer) external;

  /** Cancels my offer to buy the given token. Fails if no such offer exists */
  function cancelOfferToBuy(uint256 tokenId) external;

  /** Returns count of offers to sell to other addresses */
  function countOffersToSell(uint256 tokenId) external view returns (uint256);

  /** Returns count of offers to sell from other addresses */
  function offerToSellAtIndex(uint256 tokenId, uint256 index) external view returns (tlib.Offer memory);

  /** Adds an offer to sell the given token to the given buyer for the given amount */
  function offerToSell(uint256 tokenId, address buyer, uint256 amount ) external;

  /** 
   * Accepts an existing offer to sell the given. 
   * The offerred amount of crypto currency must be available in the callers account. 
   * It will be transferred to this owner while the token's ownership will be transferred to the caller.
   */
  function acceptOfferToSell(uint256 tokenId) external payable;

  /** Cancels an offer to sell the given token to the given buyer. Fails if no such offer exists */
  function cancelOfferToSell(uint256 tokenId, address buyer) external;
}
