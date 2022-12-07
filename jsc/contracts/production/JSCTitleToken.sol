// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "./JSCConfigurable.sol";
import "../IJSCTitleToken.sol";
import {JSCTitleTokenLib as tlib} from "libraries/JSCTitleTokenLib.sol";

/**
 * @dev This is the title token smart contract.
 *
 * Includes implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard.
 */
contract JSCTitleToken is IERC721, IERC721Metadata, IJSCTitleToken, JSCConfigurable
{
  using tlib for tlib.TokenIdList;
  using tlib for tlib.OfferList;
  using tlib for tlib.Storage;

  tlib.Storage private _storage;

  /**
   * @dev See {IJSCTitleToken-init}.
   */
  function init(
        string memory name_, 
        string memory symbol_, 
        string memory baseURI_, 
        address jurisdiction_,
        address registryAccount_,
        uint256 registryFee_,
        address maintainerAccount_,
        uint256 maintainerFee_
      ) external onlyOwner {
    require(
      bytes(_storage.name).length == 0,
      "init() cannot be called twice"
    );
    require(bytes(name_).length > 0, "invalid contract name");
    require(bytes(symbol_).length > 0, "invalid symbol name");
    require(bytes(baseURI_).length > 0, "invalid URI");

    JSCConfigurable._init();
    _addNumberParameter(tlib.getRegistryFeeParam(registryFee_));
    _addAddressParameter(tlib.getRegistryAccountParam(registryAccount_));
    _addNumberParameter(tlib.getMaintainerFeeParam(maintainerFee_));
    _addAddressParameter(tlib.getMaintainerAccountParam(maintainerAccount_));
    _addParameterRevisions();

    _storage.name = name_;
    _storage.symbol = symbol_;
    _storage.baseURI = baseURI_;
    _storage.jurisdiction = jurisdiction_;

    _addTitleRevisions();
    _addTitleHandlers();
  }

  /**
   * @dev See {IJSCCabinet-getJurisdiction}.
   */
  function getJurisdiction() view external returns (address) {
      return _storage.jurisdiction;
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId) public view virtual override(IERC165, JSCConfigurable) returns (bool) {
    return
      interfaceId == type(IJSCTitleToken).interfaceId ||
      interfaceId == type(IERC721).interfaceId ||
      interfaceId == type(IERC721Metadata).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  /**
   * @dev See {IERC721-balanceOf}.
   */
  function balanceOf(address owner) public view override returns (uint256) {
    tlib.requireAddress(owner);
    return _storage.tokensByOwner[owner].countTokenIds();
  }

  /**
   * @dev See {IJSCTitleToken-totalSupply}.
   */
  function totalSupply() external view returns (uint256) {
    return _storage.tokenIds.countTokenIds();
  }
  
  /**
   * @dev See {IJSCTitleToken-tokenAtIndex}.
   */
  function tokenAtIndex(uint256 index) external view returns (uint256) {
    return _storage.tokenIds.getTokenAt(index);
  }

  /**
   * @dev See {IJSCTitleToken-ownerTokenAtIndex}.
   */
  function ownerTokenAtIndex(address owner, uint256 index) external view returns (uint256) {
    return _storage.tokensByOwner[owner].getTokenAt(index);
  }

  /**
   * @dev See {IERC721-ownerOf}.
   */
  function ownerOf(uint256 tokenId) public view override returns (address) {
    address owner = _storage.tokens[tokenId].owner;
    tlib.requireTokenOwner(owner);
    return owner;
  }

  /**
   * @dev See {IERC721Metadata-name}.
   */
  function name() public view override returns (string memory) {
    return _storage.name;
  }

  /**
   * @dev See {IERC721Metadata-symbol}.
   */
  function symbol() public view override returns (string memory) {
    return _storage.symbol;
  }

  /**
   * @dev See {IERC721Metadata-tokenURI}.
   */
  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    _storage.requireMinted(tokenId);

    return
      bytes(_storage.baseURI).length > 0
        ? string(abi.encodePacked(_storage.baseURI, tokenId))
        : "";
  }

  /**
   * @dev See {IERC721-approve}.
   */
  function approve(address to, uint256 tokenId) public override unfrozenContract {
    _storage.validateAndApprove(_msgSender(), to, tokenId);
  }

  /**
   * @dev See {IERC721-getApproved}.
   */
  function getApproved(uint256 tokenId) public view override returns (address) {
    _storage.requireMinted(tokenId);

    return _storage.tokens[tokenId].approval;
  }

  /**
   * @dev See {IERC721-setApprovalForAll}.
   */
  function setApprovalForAll(address operator, bool approved) public override unfrozenContract {
    _setApprovalForAll(_msgSender(), operator, approved);
  }

  /**
   * @dev See {IERC721-isApprovedForAll}.
   */
  function isApprovedForAll(address owner, address operator) public view override returns (bool) {
    return _storage.operatorApprovals[owner][operator];
  }

  /**
   * @dev See {IERC721-transferFrom}.
   */
  function transferFrom(address from, address to, uint256 tokenId ) public override unfrozenContract {
    _checkApprovedOrOwner(_msgSender(), tokenId);
    _transfer(from, to, tokenId);
  }

  /**
   * @dev See {IERC721-safeTransferFrom}.
   */
  function safeTransferFrom(address from, address to, uint256 tokenId ) public override unfrozenContract {
    safeTransferFrom(from, to, tokenId, "");
  }

  /**
   * @dev See {IERC721-safeTransferFrom}.
   */
  function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override unfrozenContract {
    _checkApprovedOrOwner(_msgSender(), tokenId);
    _safeTransfer(from, to, tokenId, data);
  }

  /**
   * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
   * are aware of the ERC721 protocol to prevent tokens from being forever locked.
   *
   * `data` is additional data, it has no specified format and it is sent in call to `to`.
   *
   * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
   * implement alternative mechanisms to perform token transfer, such as signature-based.
   *
   * Requirements:
   *
   * - `from` cannot be the zero address.
   * - `to` cannot be the zero address.
   * - `tokenId` token must exist and be owned by `from`.
   * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
   *
   * Emits a {Transfer} event.
   */
  function _safeTransfer(address from, address to, uint256 tokenId, bytes memory data) internal {
    _transfer(from, to, tokenId);
    tlib.requireReceived(from, to, tokenId, data);
  }

  /**
   * @dev See {IJSCTitleToken-titleToTokenId}.
   */
  function titleToTokenId(string memory titleId) public pure returns (uint256) {
    return uint256(keccak256(abi.encode(titleId)));
  }

  /**
   * @dev See {IJSCTitleToken-tokenToTitleId}.
   */
  function tokenToTitleId(uint tokenId) external view returns (string memory) {
    return _storage.getTitleToken(tokenId).titleId;
  }

  /**
   * @dev Returns whether `spender` is allowed to manage `tokenId`.
   *
   * Requirements:
   *
   * - `tokenId` must exist.
   */
  function _checkApprovedOrOwner(address spender, uint256 tokenId) internal view {
    address tokenOwner = ownerOf(tokenId);
    address contractOwner = owner();
    require(
      spender == contractOwner ||
        spender == tokenOwner ||
        isApprovedForAll(tokenOwner, spender) ||
        getApproved(tokenId) == spender,
      "caller is not token owner nor approved"
    );
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
  function mint(address owner, string memory titleId) external onlyOwner {
    uint256 tokenId = titleToTokenId(titleId);
    require(!_storage.exists(tokenId), "token already minted");
    _storage.mint(owner, titleId, tokenId);
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
  function burn(uint256 tokenId) external onlyOwner {
    _burn(tokenId);
  }

  function _burn(uint256 tokenId) internal {
    address owner = ownerOf(tokenId);
    _storage.burn(tokenId, owner);
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
  function _transfer(address from, address to, uint256 tokenId) internal {
    require(ownerOf(tokenId) == from, "transfer from incorrect owner");
    _storage.transfer(owner(), from, to, tokenId);
  }

  /**
   * @dev Approve `operator` to operate on all of `owner` tokens
   *
   * Emits an {ApprovalForAll} event.
   */
  function _setApprovalForAll(address owner, address operator, bool approved) internal {
    require(owner != operator, "approve to caller");
    _storage.requireFrozenOwner(owner, false);
    if (approved) // Do not approve frozen accounts - be we can remove them
      _storage.requireFrozenOwner(operator, false);
    _storage.operatorApprovals[owner][operator] = approved;
    emit ApprovalForAll(owner, operator, approved);
  }

  /** Freezes the given token so that it can no longer be transferred */
  function _setFrozenToken(uint256 tokenId, bool frozen) internal onlyOwner {
    _storage.requireMinted(tokenId);
    _storage.requireFrozenToken(tokenId, !frozen);
    _storage.tokens[tokenId].frozen = frozen;
    emit TokenFrozen(tokenId, frozen);
  }

  /**
   * @dev See {IJSCTitleToken-isFrozenToken}.
   */
  function isFrozenToken(uint256 tokenId) public view returns (bool) {
    _storage.requireMinted(tokenId);
    return _storage.tokens[tokenId].frozen;
  }

  /** Freezes the given owner so that they can no longer send or receive tokens */
  function _setFrozenOwner(address owner, bool frozen) internal onlyOwner {
    _storage.requireFrozenOwner(owner, !frozen);
    _storage.frozenOwners[owner] = frozen;
    emit OwnerFrozen(owner, frozen);
  }

  /**
   * @dev See {IJSCTitleToken-isFrozenOwner}.
   */
  function isFrozenOwner(address owner) public view returns (bool) {
    return _storage.frozenOwners[owner];
  }

  /**
   * @dev See {IJSCTitleToken-countOffersToBuy}.
   */
  function countOffersToBuy(uint256 tokenId) external view returns (uint256) {
    _storage.requireMinted(tokenId);
    return _storage.tokens[tokenId].offersToBuy.arr.length;
  }

  /**
   * @dev See {IJSCTitleToken-offerToBuyAtIndex}.
   */
  function offerToBuyAtIndex(uint256 tokenId, uint256 index) external view returns (tlib.Offer memory) {
    _storage.requireMinted(tokenId);
    require(
      index < _storage.tokens[tokenId].offersToBuy.arr.length,
      "unknown offer to buy"
    );
    tlib.Offer storage o = _storage.tokens[tokenId].offersToBuy.arr[index];
    return o;
  }

  /**
   * @dev See {IJSCTitleToken-offerToBuy}.
   */
  function offerToBuy(uint256 tokenId, uint256 amount) external payable unfrozenContract {
    _storage.offerToBuy(_msgSender(), tokenId, msg.value, amount);
    emit OfferToBuy(tokenId, _msgSender(), amount);
  }

  /**
   * @dev See {IJSCTitleToken-acceptOfferToBuy}.
   */
  function acceptOfferToBuy(uint256 tokenId, address buyer) external unfrozenContract {
    address owner = ownerOf(tokenId);
    require(_msgSender() == owner, "only the owner can accept an offer to buy");

    uint amt = _storage.tokens[tokenId].offersToBuy.getOfferFrom(buyer);

    _storage.cancelOfferToBuyFrom(tokenId, buyer);
    safeTransferFrom(owner, buyer, tokenId);

    tlib.pay(amt, amt, payable(owner));
  }

  /**
   * @dev See {IJSCTitleToken-cancelOfferToBuy}.
   */
  function cancelOfferToBuy(uint256 tokenId) external unfrozenContract {
    _cancelOfferToBuyFrom(tokenId, _msgSender());
  }

  function _cancelOfferToBuyFrom(uint256 tokenId, address buyer) internal {
    uint amt = _storage.tokens[tokenId].offersToBuy.getOfferFrom(buyer);

    _storage.cancelOfferToBuyFrom(tokenId, buyer);
    tlib.pay(amt, amt, payable(buyer));
    emit OfferToBuyCancelled(tokenId, buyer);
  }

  /**
   * @dev See {IJSCTitleToken-countOffersToSell}.
   */
  function countOffersToSell(uint256 tokenId) external view returns (uint256) {
    _storage.requireMinted(tokenId);
    return _storage.tokens[tokenId].offersToSell.arr.length;
  }

  /**
   * @dev See {IJSCTitleToken-offerToSellAtIndex}.
   */
  function offerToSellAtIndex(uint256 tokenId, uint256 index) external view returns (tlib.Offer memory) {
    _storage.requireMinted(tokenId);
    require(
      index < _storage.tokens[tokenId].offersToSell.arr.length,
      "unknown offer to sell"
    );
    tlib.Offer storage o = _storage.tokens[tokenId].offersToSell.arr[index];
    return o;
  }

  /**
   * @dev See {IJSCTitleToken-offerToSell}.
   */
  function offerToSell(uint256 tokenId, address buyer, uint256 amount ) external unfrozenContract {
    _storage.offerToSell(_msgSender(), tokenId, buyer, amount);
    emit OfferToSell(tokenId, buyer, amount);
  }

  /**
   * @dev See {IJSCTitleToken-acceptOfferToSell}.
   */
  function acceptOfferToSell(uint256 tokenId) external payable unfrozenContract {
    address buyer = _msgSender();
    address owner = ownerOf(tokenId);

    tlib.OfferList storage o = _storage.tokens[tokenId].offersToSell;
    uint amt = o.getOfferFrom(buyer);
    o.removeOffer(buyer);

    _safeTransfer(owner, buyer, tokenId, "");

    tlib.pay(msg.value, amt, payable(owner));
  }

  /**
   * @dev See {IJSCTitleToken-cancelOfferToSell}.
   */
  function cancelOfferToSell(uint256 tokenId, address buyer) public unfrozenContract {
    _storage.cancelOfferToSell(_msgSender(), tokenId, buyer);
    emit OfferToSellCancelled(tokenId, buyer);
  }

  function _addTitleRevisions() private {
    rlib.Revision[] memory revs = tlib.getRevisions();
    for (uint256 i = 0; i < revs.length; i++) {
      _addRevision(revs[i]);
    }
  }

  function _addTitleHandlers() private {
    _addHandler("ChangeOwner", _executeChangeOwner);
    _addHandler("FreezeToken", _executeFreezeToken);
    _addHandler("FreezeOwner", _executeFreezeOwner);
  }

  /** Implements the ChangeOwner revision */
  function _executeChangeOwner(bytes memory pdata) private {
      uint tokenId;
      address newOwner;
      (tokenId, newOwner) = abi.decode(pdata, (uint, address));
      _safeTransfer(ownerOf(tokenId), newOwner, tokenId, "");
  }

  /** Implements the FreezeToken revision */
  function _executeFreezeToken(bytes memory pdata) private {
      uint tokenId;
      bool frozen;
      (tokenId, frozen) = abi.decode(pdata, (uint, bool));
      _setFrozenToken(tokenId, frozen);
  }

  /** Implements the FreezeOwner revision */
  function _executeFreezeOwner(bytes memory pdata) private {
      address owner;
      bool frozen;
      (owner, frozen) = abi.decode(pdata, (address, bool));
      _setFrozenOwner(owner, frozen);
  }
}
