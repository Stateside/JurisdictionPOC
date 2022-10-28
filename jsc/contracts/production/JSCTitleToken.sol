// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "./JSCBaseConfigurable.sol";
import { JSCTitleTokenLib as tlib } from "libraries/JSCTitleTokenLib.sol";

/**
 * This is the title token smart contract. 
 * 
 * Includes implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard.
 */
contract JSCTitleToken is ERC165, IERC721, IERC721Metadata, JSCBaseConfigurable {
    using tlib for tlib.TokenIdList;
    using tlib for tlib.OfferList;
    using tlib for tlib.Storage;
    using Strings for uint;

    event TokenFrozen(uint tokenId, bool frozen);
    event OwnerFrozen(address owner, bool frozen);
    event OfferToSell(uint tokenId, address buyer, uint amount);
    event OfferToSellCancelled(uint tokenId, address buyer);
    event OfferToBuy(uint tokenId, address buyer, uint amount);
    event OfferToBuyCancelled(uint tokenId, address buyer);

    tlib.Storage private _storage;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    function init(string memory name_, string memory symbol_, string memory baseURI_) external onlyOwner {
        require(bytes(_storage.name).length == 0, "init() cannot be called twice");
        require(bytes(name_).length > 0, "invalid contract name");
        require(bytes(symbol_).length > 0, "invalid symbol name");
        require(bytes(baseURI_).length > 0, "invalid URI");

        _storage.name = name_;
        _storage.symbol = symbol_;
        _storage.baseURI = baseURI_;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view override(ERC165, IERC165) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     */
    function balanceOf(address owner) public view override returns (uint) {
        require(owner != address(0), "address zero is not a valid owner");
        return _storage.tokensByOwner[owner].countTokenIds();
    }

    /**
     * @dev returns the tokenId belonging to the given owner at the given index. The given index must be 
     * between 0 and balanceOf(owner)
     */
    function tokenAtIndex(address owner, uint index) external view returns (uint) {
        return _storage.tokensByOwner[owner].getTokenAt(index);
    }

    /**
     * @dev See {IERC721-ownerOf}.
     */
    function ownerOf(uint tokenId) public view override returns (address) {
        address owner = _storage.tokens[tokenId].owner;
        require(owner != address(0), "invalid token ID");
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
    function tokenURI(uint tokenId) public view override returns (string memory) {
        _storage.requireMinted(tokenId);

        return bytes(_storage.baseURI).length > 0 ? string(abi.encodePacked(_storage.baseURI, tokenId)) : "";
    }

    /**
     * @dev See {IERC721-approve}.
     */
    function approve(address to, uint tokenId) public override {
        address owner = ownerOf(tokenId);
        require(to != owner, "approval to current owner");
        _storage.requireFrozenOwner(owner, false);

        require(
            msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "approve caller is not token owner nor approved for all"
        );

        _storage.approve(to, tokenId);
    }

    /**
     * @dev See {IERC721-getApproved}.
     */
    function getApproved(uint tokenId) public view override returns (address) {
        _storage.requireMinted(tokenId);

        return _storage.tokens[tokenId].approval;
    }

    /**
     * @dev See {IERC721-setApprovalForAll}.
     */
    function setApprovalForAll(address operator, bool approved) public override {
        _setApprovalForAll(msg.sender, operator, approved);
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
    function transferFrom(
        address from,
        address to,
        uint tokenId
    ) public override {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(msg.sender, tokenId), "caller is not token owner nor approved");

        _transfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint tokenId
    ) public override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint tokenId,
        bytes memory data
    ) public override {
        require(_isApprovedOrOwner(msg.sender, tokenId), "caller is not token owner nor approved");
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
    function _safeTransfer(
        address from,
        address to,
        uint tokenId,
        bytes memory data
    ) internal {
        _transfer(from, to, tokenId);
        require(tlib.checkOnERC721Received(from, to, tokenId, data), "transfer to non ERC721Receiver implementer");
    }

    /**
     * @dev Returns `tokenId` for given title id.
     */
    function titleToTokenId(string memory titleId) public pure returns (uint) {
        return uint(keccak256(abi.encode(titleId)));
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _isApprovedOrOwner(address spender, uint tokenId) internal view returns (bool) {
        address tokenOwner = ownerOf(tokenId);
        address contractOwner = owner();
        return (spender == contractOwner || spender == tokenOwner || isApprovedForAll(tokenOwner, spender) || getApproved(tokenId) == spender);
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
        uint tokenId = titleToTokenId(titleId);
        require(!_storage.exists(tokenId), "token already minted");
        _storage.mint(owner, titleId, tokenId);
    }

    function burn(uint tokenId) external onlyOwner {
        _burn(tokenId);
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
    function _burn(uint tokenId) internal {
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
    function _transfer(
        address from,
        address to,
        uint tokenId
    ) internal {
        require(ownerOf(tokenId) == from, "transfer from incorrect owner");
        _storage.transfer(from, to, tokenId);
    }

    /**
     * @dev Approve `operator` to operate on all of `owner` tokens
     *
     * Emits an {ApprovalForAll} event.
     */
    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal {
        require(owner != operator, "approve to caller");
        _storage.requireFrozenOwner(owner, false);
        _storage.operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    /** Freezes the given token so that it can no longer be transferred */
    function _setFrozenToken(
        uint tokenId,
        bool frozen
    ) internal onlyOwner {
        _storage.requireMinted(tokenId);
        _storage.requireFrozenToken(tokenId, !frozen);
        _storage.tokens[tokenId].frozen = frozen;
        emit TokenFrozen(tokenId, frozen);
    }

    /** Freezes the given owner so that they can no longer send or receive tokens */
    function _setFrozenOwner(
        address owner,
        bool frozen
    ) internal onlyOwner {
        _storage.requireFrozenOwner(owner, !frozen);
        _storage.frozenOwners[owner] = frozen;
        emit OwnerFrozen(owner, frozen);
    }

    /** Returns count of offers to buy from other addresses */
    function countOffersToBuy(
        uint tokenId
    ) external view returns(uint) {
        _storage.requireMinted(tokenId);
        return _storage.tokens[tokenId].offersToBuy.arr.length;
    }

    /** Returns count of offers to buy from other addresses */
    function offerToBuyAtIndex(
        uint tokenId,
        uint index
    ) external view returns(tlib.Offer memory) {
        _storage.requireMinted(tokenId);
        require(index < _storage.tokens[tokenId].offersToBuy.arr.length, "unknown offer to buy");
        tlib.Offer storage o = _storage.tokens[tokenId].offersToBuy.arr[index];
        return o;
    }

    /** Adds an offer to buy the given token for the given amount */
    function offerToBuy(uint tokenId, uint amount) external {
        _storage.requireMinted(tokenId);
        _storage.requireFrozenToken(tokenId, false);

        address buyer = msg.sender;
        tlib.TitleToken storage t = _storage.tokens[tokenId];
        require(buyer != t.owner, "owner cannot buy their own token");

        t.offersToBuy.addOffer(buyer, amount);
        emit OfferToBuy(tokenId, buyer, amount);
    }

    /** Accepts an existing offer to buy from the given buyer */
    function acceptOfferToBuy(uint tokenId, address buyer) external {
        _cancelOfferToBuyFrom(tokenId, buyer);
        safeTransferFrom(msg.sender, buyer, tokenId);
    }

    /** Cancels my offer to buy the given token. Fails if no such offer exists */
    function cancelOfferToBuy(uint tokenId) external {
        _cancelOfferToBuyFrom(tokenId, msg.sender);
    }

    /** Cancels an offer to buy the given token. Fails if no such offer exists */
    function _cancelOfferToBuyFrom(uint tokenId, address buyer) internal {
        _storage.requireMinted(tokenId);

        tlib.TitleToken storage t = _storage.tokens[tokenId];
        t.offersToBuy.removeOffer(buyer);
        emit OfferToBuyCancelled(tokenId, buyer);
    }

    /** Returns count of offers to sell to other addresses */
    function countOffersToSell(
        uint tokenId
    ) external view returns(uint) {
        _storage.requireMinted(tokenId);
        return _storage.tokens[tokenId].offersToSell.arr.length;
    }

    /** Returns count of offers to sell from other addresses */
    function offerToSellAtIndex(
        uint tokenId,
        uint index
    ) external view returns(tlib.Offer memory) {
        _storage.requireMinted(tokenId);
        require(index < _storage.tokens[tokenId].offersToSell.arr.length, "unknown offer to sell");
        tlib.Offer storage o = _storage.tokens[tokenId].offersToSell.arr[index];
        return o;
    }

    /** Adds an offer to sell the given token to the given buyer for the given amount */
    function offerToSell(uint tokenId, address buyer, uint amount) external {
        require(msg.sender != buyer, "owners cannot sell to themselves");
        _storage.requireMinted(tokenId);
        _storage.requireFrozenToken(tokenId, false);

        tlib.TitleToken storage t = _storage.tokens[tokenId];
        require(msg.sender == t.owner, "caller is not token owner");
        _storage.requireFrozenOwner(t.owner, false);
        
        t.offersToSell.addOffer(buyer, amount);
        emit OfferToSell(tokenId, buyer, amount);
    }

    /** Accepts an existing offer to sell the given */
    function acceptOfferToSell(uint tokenId) external {
        address buyer = msg.sender;
        _safeTransfer(ownerOf(tokenId), buyer, tokenId, "");
        cancelOfferToSell(tokenId, buyer);
    }

    /** Cancels an offer to sell the given token to the given buyer. Fails if no such offer exists */
    function cancelOfferToSell(uint tokenId, address buyer) public {
        _storage.requireMinted(tokenId);

        tlib.TitleToken storage t = _storage.tokens[tokenId];
        require(msg.sender == t.owner, "caller is not token owner");
        t.offersToSell.removeOffer(buyer);
        emit OfferToSellCancelled(tokenId, buyer);
    }
}
