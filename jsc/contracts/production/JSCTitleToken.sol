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
    using Strings for uint;

    event TokenFrozen(uint tokenId, bool frozen);
    event OwnerFrozen(address owner, bool frozen);
    event OfferToSell(uint tokenId, address buyer, uint amount);
    event OfferToSellCancelled(uint tokenId, address buyer);
    event OfferToBuy(uint tokenId, address buyer, uint amount);
    event OfferToBuyCancelled(uint tokenId, address buyer);

    // Base URI for token metadata
    string private _baseURI;

    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    // Mapping from token ID to owner address
    mapping(uint => tlib.TitleToken) private _tokens;

    // Mapping owner address to tokenIds
    mapping(address => tlib.TokenIdList) private _tokensByOwner;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // Mapping owner address to boolean value indicating frozen and cannot sell their tokens
    mapping(address => bool) private _frozenOwners;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    function init(string memory name_, string memory symbol_, string memory baseURI_) external onlyOwner {
        require(bytes(_name).length == 0, "init() cannot be called twice");
        require(bytes(name_).length > 0, "invalid contract name");
        require(bytes(symbol_).length > 0, "invalid symbol name");
        require(bytes(baseURI_).length > 0, "invalid URI");

        _name = name_;
        _symbol = symbol_;
        _baseURI = baseURI_;
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
        return _tokensByOwner[owner].countTokenIds();
    }

    /**
     * @dev returns the tokenId belonging to the given owner at the given index. The given index must be 
     * between 0 and balanceOf(owner)
     */
    function tokenAtIndex(address owner, uint index) external view returns (uint) {
        return _tokensByOwner[owner].getTokenAt(index);
    }

    /**
     * @dev See {IERC721-ownerOf}.
     */
    function ownerOf(uint tokenId) public view override returns (address) {
        address owner = _tokens[tokenId].owner;
        require(owner != address(0), "invalid token ID");
        return owner;
    }

    /**
     * @dev See {IERC721Metadata-name}.
     */
    function name() public view override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IERC721Metadata-symbol}.
     */
    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint tokenId) public view override returns (string memory) {
        _requireMinted(tokenId);

        return bytes(_baseURI).length > 0 ? string(abi.encodePacked(_baseURI, tokenId)) : "";
    }

    /**
     * @dev See {IERC721-approve}.
     */
    function approve(address to, uint tokenId) public override {
        address owner = ownerOf(tokenId);
        require(to != owner, "approval to current owner");
        _requireFrozenOwner(owner, false);

        require(
            msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "approve caller is not token owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    /**
     * @dev See {IERC721-getApproved}.
     */
    function getApproved(uint tokenId) public view override returns (address) {
        _requireMinted(tokenId);

        return _tokens[tokenId].approval;
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
        return _operatorApprovals[owner][operator];
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
     * @dev Returns whether `tokenId` exists.
     *
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     */
    function _exists(uint tokenId) internal view returns (bool) {
        return _tokens[tokenId].owner != address(0);
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
        require(owner != address(0), "mint to the zero address");
        _requireFrozenOwner(owner, false);
        
        uint tokenId = titleToTokenId(titleId);
        require(!_exists(tokenId), "token already minted");

        _beforeTokenTransfer(address(0), owner, tokenId);

        _tokensByOwner[owner].addTokenId(tokenId);
        _tokens[tokenId].titleId = titleId;
        _tokens[tokenId].owner = owner;

        emit Transfer(address(0), owner, tokenId);

        _afterTokenTransfer(address(0), owner, tokenId);

        require(
            tlib.checkOnERC721Received(address(0), owner, tokenId, ""),
            "transfer to non ERC721Receiver implementer"
        );
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

        _beforeTokenTransfer(owner, address(0), tokenId);

        _tokensByOwner[owner].removeTokenId(tokenId);
        delete _tokens[tokenId];

        emit Transfer(owner, address(0), tokenId);

        _afterTokenTransfer(owner, address(0), tokenId);
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
        require(to != address(0), "transfer to the zero address");
        _requireFrozenToken(tokenId, false);
        _requireFrozenOwner(from, false);
        _requireFrozenOwner(to, false);

        _beforeTokenTransfer(from, to, tokenId);

        _tokensByOwner[from].removeTokenId(tokenId);
        _tokensByOwner[to].addTokenId(tokenId);
        _tokens[tokenId].owner = to;
        _approve(address(0), tokenId);

        emit Transfer(from, to, tokenId);

        _afterTokenTransfer(from, to, tokenId);
    }

    /**
     * @dev Approve `to` to operate on `tokenId`
     *
     * Emits an {Approval} event.
     */
    function _approve(address to, uint tokenId) internal {
        _requireFrozenToken(tokenId, false);
        tlib.TitleToken storage t = _tokens[tokenId];
        _requireFrozenOwner(t.owner, false);
        t.approval = to;
        emit Approval(t.owner, to, tokenId);
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
        _requireFrozenOwner(owner, false);
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    /**
     * @dev Reverts if the `tokenId` has not been minted yet.
     */
    function _requireMinted(uint tokenId) internal view {
        require(_exists(tokenId), "invalid token ID");
    }

    /**
     * @dev Reverts if the frozen state of tokenId does not match the given state
     */
    function _requireFrozenToken(uint tokenId, bool frozen) internal view {
        require(_tokens[tokenId].frozen == frozen, !frozen?"token is frozen":"token is not frozen");
    }

    /**
     * @dev Reverts if the frozen state of owner does not match the given state
     */
    function _requireFrozenOwner(address owner, bool frozen) internal view {
        require(_frozenOwners[owner] == frozen, !frozen?"token owner account is frozen":"token owner account is not frozen");
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint tokenId
    ) internal {}

    /**
     * @dev Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint tokenId
    ) internal {}

    /** Freezes the given token so that it can no longer be transferred */
    function _setFrozenToken(
        uint tokenId,
        bool frozen
    ) internal onlyOwner {
        _requireMinted(tokenId);
        _requireFrozenToken(tokenId, !frozen);
        _tokens[tokenId].frozen = frozen;
        emit TokenFrozen(tokenId, frozen);
    }

    /** Freezes the given owner so that they can no longer send or receive tokens */
    function _setFrozenOwner(
        address owner,
        bool frozen
    ) internal onlyOwner {
        _requireFrozenOwner(owner, !frozen);
        _frozenOwners[owner] = frozen;
        emit OwnerFrozen(owner, frozen);
    }

    /** Adds an offer to buy the given token for the given amount */
    function offerToBuy(uint tokenId, uint amount) external {
        _requireMinted(tokenId);
        _requireFrozenToken(tokenId, false);

        address buyer = msg.sender;
        tlib.TitleToken storage t = _tokens[tokenId];
        require(buyer != t.owner, "owner cannot buy their own token");

        t.offersToBuy.addOffer(buyer, amount);
    }

    /** Cancels an offer to buy the given token. Fails if no such offer exists */
    function cancelOfferToBuy(uint tokenId) external {
        _requireMinted(tokenId);

        address buyer = msg.sender;
        tlib.TitleToken storage t = _tokens[tokenId];
        t.offersToBuy.removeOffer(buyer);
    }

    /** Adds an offer to sell the given token to the given buyer for the given amount */
    function offerToSell(uint tokenId, address buyer, uint amount) external {
        require(msg.sender != buyer, "owners cannot sell to themselves");
        _requireMinted(tokenId);
        _requireFrozenToken(tokenId, false);

        tlib.TitleToken storage t = _tokens[tokenId];
        require(msg.sender == t.owner, "caller is not token owner");
        _requireFrozenOwner(t.owner, false);
        
        t.offersToSell.addOffer(buyer, amount);
    }

    /** Cancels an offer to sell the given token to the given buyer. Fails if no such offer exists */
    function cancelOfferToSell(uint tokenId, address buyer) external {
        _requireMinted(tokenId);

        tlib.TitleToken storage t = _tokens[tokenId];
        require(msg.sender == t.owner, "caller is not token owner");
        t.offersToSell.removeOffer(buyer);
    }
}
