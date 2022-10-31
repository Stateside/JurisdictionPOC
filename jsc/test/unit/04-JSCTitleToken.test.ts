import * as tc from "../../typechain-types"
// @ts-ignore
import { deployments, ethers } from "hardhat"
import { expect, use as chaiuse } from "chai"
import * as helpers from "@nomicfoundation/hardhat-network-helpers";

import { solidity } from "ethereum-waffle";
import { defaultAbiCoder } from "ethers/lib/utils"
chaiuse(solidity);

/**
 * Runs a colection of tests to ensure that the JSCTitleToken contract behaves as expected.
 * Includes tests for ERC-721 compliance.
 */
describe("JSCTitleToken", async () => {
  let titleToken: tc.JSCTitleToken
  let titleTokenTest: tc.JSCTitleTokenTest
  let tokenReceiver: tc.JSCTitleTokenReceiverTest
  let jurisdiction: tc.JSCJurisdiction
  let revisionsLib: tc.JSCRevisionsLib
  let configurableLib: any
  let titleTokenLib: tc.JSCTitleTokenLib

  let owner, bob, jane, sara;

  const zeroAddress = '0x0000000000000000000000000000000000000000';
  const badTokenId1 = 12345;
  const titleId1 = "title-1";
  const titleId2 = "title-2";
  const titleId3 = "title-3";

  const INTERFACE_ID_ERC721 = '0x80ac58cd';
  const INTERFACE_ID_ERC721_METADATA = '0x5b5e139f';
  const INTERFACE_ID_ERC165 = '0x01ffc9a7';

  const ONE_MINUTE = 60;

  let retrieveLastBlock = async (verbose?:any):Promise<any> => {
    let bn = await ethers.provider.getBlockNumber();
    let block:any = await ethers.provider.getBlock(bn);
    if (verbose)
      console.log(bn + ": ", block.timestamp);
    return block;
}

  beforeEach(async () => {
    await deployments.fixture(["all"]);
    titleToken = await ethers.getContract("JSCTitleToken");
    titleTokenTest = await ethers.getContract("JSCTitleTokenTest");
    tokenReceiver = await ethers.getContract("JSCTitleTokenReceiverTest");
    jurisdiction = await ethers.getContract("JSCJurisdiction");
    revisionsLib = await ethers.getContract("JSCRevisionsLib");
    configurableLib = await ethers.getContract("JSCConfigurableLib");
    titleTokenLib = await ethers.getContract("JSCTitleTokenLib");
    [owner, bob, jane, sara] = await ethers.getSigners();
  });

  it('remains frozen until initialized', async function() {
    const contract = await ethers.getContractFactory("JSCTitleToken", {
      libraries: {
        JSCRevisionsLib: revisionsLib.address,
        JSCConfigurableLib: configurableLib.address,
        JSCTitleTokenLib: titleTokenLib.address
      },
    });
    const deployedContract = await contract.deploy();
    await expect(await deployedContract.isFrozen()).to.equal(true);
  });

  it('fails on second init()', async function() {
    await expect(await titleToken.isFrozen()).to.equal(false);
    await expect(titleToken.init("name", "symbol", "uri", jurisdiction.address)).to.be.revertedWith('init() cannot be called twice');
  });

  it('(ERC721) correctly checks all the supported interfaces', async function() {
    expect(await titleToken.supportsInterface(INTERFACE_ID_ERC721)).to.equal(true);
    expect(await titleToken.supportsInterface(INTERFACE_ID_ERC165)).to.equal(true);
    expect(await titleToken.supportsInterface(INTERFACE_ID_ERC721_METADATA)).to.equal(true);
    expect(await titleToken.supportsInterface("0xffffffff")).to.equal(false);
  });

  it('(ERC721) correctly mints an NFT', async function() {
    expect(await titleToken.mint(bob.address, titleId1)).to.emit(titleToken, 'Transfer').withArgs(zeroAddress, bob.address, await titleToken.titleToTokenId(titleId1));
    expect(await titleToken.balanceOf(bob.address)).to.equal(1);
  });

  it('(ERC721) returns correct balanceOf', async function() {
    await titleToken.mint(bob.address, titleId1);
    expect(await titleToken.balanceOf(bob.address)).to.equal(1);
    await titleToken.mint(bob.address, titleId2);
    expect(await titleToken.balanceOf(bob.address)).to.equal(2);
  });

  it('(ERC721) throws when trying to get count of NFTs owned by 0x0 address', async function() {
    await expect(titleToken.balanceOf(zeroAddress)).to.be.revertedWith('address zero is not a valid owner');
  });

  it('(ERC721) throws when trying to mint 2 NFTs with the same ids', async function() {
    await titleToken.mint(bob.address, titleId1);
    await expect(titleToken.mint(bob.address, titleId1)).to.be.revertedWith('token already minted');
  });

  it('(ERC721) throws when trying to mint NFT to 0x0 address', async function() {
    await expect(titleToken.mint(zeroAddress, titleId1)).to.be.revertedWith('mint to the zero address');
  });

  it('(ERC721) finds the correct owner of titleToken id', async function() {
    await titleToken.mint(bob.address, titleId1);
    expect(await titleToken.ownerOf(await titleToken.titleToTokenId(titleId1))).to.equal(bob.address);
  });

  it('(ERC721) throws when trying to find owner of non-existing NFT id', async function() {
    await expect(titleToken.ownerOf(badTokenId1)).to.be.revertedWith('invalid token ID');
  });

  it('(ERC721) correctly approves and cancels account', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId = await titleToken.titleToTokenId(titleId1);
    expect(await titleToken.connect(bob).approve(sara.address, tokenId)).to.emit(titleToken, 'Approval').withArgs(bob.address, sara.address, tokenId);
    expect(await titleToken.getApproved(tokenId)).to.equal(sara.address);
    await titleToken.connect(bob).approve(zeroAddress, tokenId);
    expect(await titleToken.getApproved(tokenId)).to.equal(zeroAddress);
  });

  it('(ERC721) throws when trying to get approval of non-existing NFT id', async function() {
    await expect(titleToken.getApproved(badTokenId1)).to.be.revertedWith('invalid token ID');
  });

  it('(ERC721) throws when trying to approve NFT ID from a third party', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId = await titleToken.titleToTokenId(titleId1);
    await expect(titleToken.connect(sara).approve(sara.address, tokenId)).to.be.revertedWith('approve caller is not token owner nor approved for all');
  });

  it('(ERC721) correctly sets then cancels an operator', async function() {
    await titleToken.mint(bob.address, titleId1);
    expect(await titleToken.connect(bob).setApprovalForAll(sara.address, true)).to.emit(titleToken, 'ApprovalForAll').withArgs(bob.address, sara.address, true);
    expect(await titleToken.isApprovedForAll(bob.address, sara.address)).to.equal(true);
    await titleToken.connect(bob).setApprovalForAll(sara.address, false);
    expect(await titleToken.isApprovedForAll(bob.address, sara.address)).to.equal(false);
  });

  it('(ERC721) correctly transfers NFT from owner', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId = await titleToken.titleToTokenId(titleId1);
    
    expect(await titleToken.connect(bob).transferFrom(bob.address, sara.address, tokenId)).to.emit(titleToken, 'Transfer').withArgs(bob.address, sara.address, tokenId);
    expect(await titleToken.balanceOf(bob.address)).to.equal(0);
    expect(await titleToken.balanceOf(sara.address)).to.equal(1);
    expect(await titleToken.ownerOf(tokenId)).to.equal(sara.address);
  });

  it('(ERC721) correctly transfers NFT from approved address', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId = await titleToken.titleToTokenId(titleId1);
    
    await titleToken.connect(bob).approve(sara.address, tokenId);
    await titleToken.connect(sara).transferFrom(bob.address, jane.address, tokenId);
    expect(await titleToken.balanceOf(bob.address)).to.equal(0);
    expect(await titleToken.balanceOf(jane.address)).to.equal(1);
    expect(await titleToken.ownerOf(tokenId)).to.equal(jane.address);
  });

  it('(ERC721) correctly transfers NFT as operator', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId = await titleToken.titleToTokenId(titleId1);

    await titleToken.connect(bob).setApprovalForAll(sara.address, true);
    await titleToken.connect(sara).transferFrom(bob.address, jane.address, tokenId);
    expect(await titleToken.balanceOf(bob.address)).to.equal(0);
    expect(await titleToken.balanceOf(jane.address)).to.equal(1);
    expect(await titleToken.ownerOf(tokenId)).to.equal(jane.address);
  });

  it('(ERC721) throws when trying to transfer NFT as an address that is not owner, approved, or operator', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId = await titleToken.titleToTokenId(titleId1);

    await expect(titleToken.connect(sara).transferFrom(bob.address, jane.address, tokenId)).to.be.revertedWith('caller is not token owner nor approved');
    expect(await titleToken.balanceOf(bob.address)).to.equal(1);

    await titleToken.connect(bob).approve(sara.address, tokenId);
    await titleToken.connect(sara).transferFrom(bob.address, jane.address, tokenId);

    expect(await titleToken.balanceOf(bob.address)).to.equal(0);
    expect(await titleToken.balanceOf(jane.address)).to.equal(1);
    expect(await titleToken.ownerOf(tokenId)).to.equal(jane.address);
  });

  it('(ERC721) throws when trying to transfer NFT to a zero address', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId = await titleToken.titleToTokenId(titleId1);
    await expect(titleToken.connect(bob).transferFrom(bob.address, zeroAddress, tokenId)).to.be.revertedWith('transfer to the zero address');
  });

  it('(ERC721) throws when trying to transfer an invalid NFT', async function() {
    await expect(titleToken.connect(bob).transferFrom(bob.address, sara.address, badTokenId1)).to.be.revertedWith('invalid token ID');
  });

  it('(ERC721) correctly safe transfers NFT from owner', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId = await titleToken.titleToTokenId(titleId1);

    expect(await titleToken.connect(bob)['safeTransferFrom(address,address,uint256)'](bob.address, sara.address, tokenId)).to.emit(titleToken, 'Transfer').withArgs(bob.address, sara.address, tokenId);
    expect(await titleToken.balanceOf(bob.address)).to.equal(0);
    expect(await titleToken.balanceOf(sara.address)).to.equal(1);
    expect(await titleToken.ownerOf(tokenId)).to.equal(sara.address);
  });

  it('(ERC721) throws when trying to safe transfers NFT from owner to a smart contract', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId = await titleToken.titleToTokenId(titleId1);
    await expect(titleToken.connect(bob)['safeTransferFrom(address,address,uint256)'](bob.address, titleToken.address, tokenId)).to.be.revertedWith('attempted transfer to non ERC721Receiver implementer');
  });

  it('(ERC721) correctly safe transfers NFT from owner to smart contract that can receive NFTs', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId = await titleToken.titleToTokenId(titleId1);
    await titleToken.connect(bob)['safeTransferFrom(address,address,uint256)'](bob.address, tokenReceiver.address, tokenId);
    expect(await titleToken.balanceOf(bob.address)).to.equal(0);
    expect(await titleToken.balanceOf(tokenReceiver.address)).to.equal(1);
    expect(await titleToken.ownerOf(tokenId)).to.equal(tokenReceiver.address);
  });

  it('(ERC721) correctly safe transfers NFT from owner to smart contract that can receive NFTs with data', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId = await titleToken.titleToTokenId(titleId1);
    expect(await titleToken.connect(bob)['safeTransferFrom(address,address,uint256,bytes)'](bob.address, tokenReceiver.address, tokenId, '0x01')).to.emit(titleToken, 'Transfer').withArgs(bob.address, tokenReceiver.address, tokenId);
    expect(await titleToken.balanceOf(bob.address)).to.equal(0);
    expect(await titleToken.balanceOf(tokenReceiver.address)).to.equal(1);
    expect(await titleToken.ownerOf(tokenId)).to.equal(tokenReceiver.address);
  });

  it('(ERC721) correctly burns an NFT', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId = await titleToken.titleToTokenId(titleId1);
    expect(await titleToken.burn(tokenId)).to.emit(titleToken, 'Transfer').withArgs(bob.address, zeroAddress, tokenId);
    expect(await titleToken.balanceOf(bob.address)).to.equal(0);
    await expect(titleToken.ownerOf(tokenId)).to.be.revertedWith('invalid token ID');
  });

  it('(ERC721) throws when trying to burn non existent NFT', async function() {
    let tokenId = await titleToken.titleToTokenId(titleId1);
    await expect(titleToken.burn(tokenId)).to.be.revertedWith('invalid token ID');
  });

  it('iterates tokens for a given owner', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId1 = await titleToken.titleToTokenId(titleId1);
    let countBob = await titleToken.balanceOf(bob.address);
    await expect(countBob).to.equal(1);
    await expect(await titleToken.tokenAtIndex(bob.address, 0)).to.equal(tokenId1);
    await expect(titleToken.tokenAtIndex(bob.address, 1)).to.be.revertedWith('index out of bounds');

    await titleToken.mint(bob.address, titleId2);
    let tokenId2 = await titleToken.titleToTokenId(titleId2);
    countBob = await titleToken.balanceOf(bob.address);
    await expect(countBob).to.equal(2);
    await expect(await titleToken.tokenAtIndex(bob.address, 0)).to.equal(tokenId1);
    await expect(await titleToken.tokenAtIndex(bob.address, 1)).to.equal(tokenId2);
    await expect(titleToken.tokenAtIndex(bob.address, 2)).to.be.revertedWith('index out of bounds');

    await titleToken.mint(sara.address, titleId3);
    let tokenId3 = await titleToken.titleToTokenId(titleId3);
    let countSara = await titleToken.balanceOf(sara.address);
    await expect(countBob).to.equal(2);
    await expect(await titleToken.tokenAtIndex(bob.address, 0)).to.equal(tokenId1);
    await expect(await titleToken.tokenAtIndex(bob.address, 1)).to.equal(tokenId2);
    await expect(titleToken.tokenAtIndex(bob.address, 2)).to.be.revertedWith('index out of bounds');
    await expect(countSara).to.equal(1);
    await expect(await titleToken.tokenAtIndex(sara.address, 0)).to.equal(tokenId3);
    await expect(titleToken.tokenAtIndex(sara.address, 1)).to.be.revertedWith('index out of bounds');

    await titleToken.burn(tokenId1);
    countBob = await titleToken.balanceOf(bob.address);
    await expect(countBob).to.equal(1);
    await expect(await titleToken.tokenAtIndex(bob.address, 0)).to.equal(tokenId2);
    await expect(titleToken.tokenAtIndex(bob.address, 1)).to.be.revertedWith('index out of bounds');
    await expect(countSara).to.equal(1);
    await expect(await titleToken.tokenAtIndex(sara.address, 0)).to.equal(tokenId3);
    await expect(titleToken.tokenAtIndex(sara.address, 1)).to.be.revertedWith('index out of bounds');
  });

  it('prevents owner from using frozen tokens', async function() {
    await titleTokenTest.mint(bob.address, titleId1);
    let tokenId = await titleTokenTest.titleToTokenId(titleId1);
    expect(await titleTokenTest.connect(bob).transferFrom(bob.address, sara.address, tokenId)).to.emit(titleTokenTest, 'Transfer').withArgs(bob.address, sara.address, tokenId);

    await expect(await titleTokenTest.connect(owner).setFrozenToken(tokenId, true)).to.emit(titleTokenTest, 'TokenFrozen').withArgs(tokenId, true);
    await expect(titleTokenTest.connect(sara).transferFrom(sara.address, jane.address, tokenId), "transferFrom() did not revert").to.be.revertedWith('token is frozen');
    await expect(titleTokenTest.connect(sara).approve(jane.address, tokenId), "approve() did not revert").to.be.revertedWith('token is frozen');
    await expect(titleTokenTest.connect(sara)['safeTransferFrom(address,address,uint256)'](sara.address, tokenReceiver.address, tokenId), "safeTransferFrom() did not revert").to.be.revertedWith('token is frozen');
    await expect(titleTokenTest.connect(sara)['safeTransferFrom(address,address,uint256,bytes)'](sara.address, tokenReceiver.address, tokenId, '0x01'), "safeTransferFrom(with data) did not revert").to.be.revertedWith('token is frozen');

    await expect(await titleTokenTest.connect(owner).setFrozenToken(tokenId, false)).to.emit(titleTokenTest, 'TokenFrozen').withArgs(tokenId, false);
    await expect(titleTokenTest.connect(sara).transferFrom(sara.address, jane.address, tokenId), "transferFrom() reverted").not.to.be.reverted;
    await expect(titleTokenTest.connect(jane).approve(bob.address, tokenId), "approve() reverted").not.to.be.reverted;
    await expect(titleTokenTest.connect(jane)['safeTransferFrom(address,address,uint256)'](jane.address, tokenReceiver.address, tokenId), "safeTransferFrom() reverted").not.to.be.reverted;
    await expect(titleTokenTest.connect(owner).transferFrom(tokenReceiver.address, sara.address, tokenId), "transferFrom() reverted").not.to.be.reverted;
    await expect(titleTokenTest.connect(sara)['safeTransferFrom(address,address,uint256,bytes)'](sara.address, tokenReceiver.address, tokenId, '0x01'), "safeTransferFrom(with data) reverted").not.to.be.reverted;
  });

  it('prevents frozen owner from using tokens', async function() {
    await titleTokenTest.mint(bob.address, titleId1);
    let tokenId = await titleTokenTest.titleToTokenId(titleId1);

    await expect(await titleTokenTest.connect(owner).setFrozenOwner(bob.address, true)).to.emit(titleTokenTest, 'OwnerFrozen').withArgs(bob.address, true);
    await expect(titleTokenTest.connect(bob).transferFrom(bob.address, jane.address, tokenId), "transferFrom() did not revert").to.be.revertedWith('token owner account is frozen');
    await expect(titleTokenTest.connect(bob).approve(jane.address, tokenId), "approve() did not revert").to.be.revertedWith('token owner account is frozen');
    await expect(titleTokenTest.connect(bob).setApprovalForAll(jane.address, true), "setApprovalForAll() did not revert").to.be.revertedWith('token owner account is frozen');
    await expect(titleTokenTest.connect(bob).setApprovalForAll(jane.address, false), "setApprovalForAll() did not revert").to.be.revertedWith('token owner account is frozen');
    await expect(titleTokenTest.connect(bob)['safeTransferFrom(address,address,uint256)'](bob.address, tokenReceiver.address, tokenId), "safeTransferFrom() did not revert").to.be.revertedWith('token owner account is frozen');
    await expect(titleTokenTest.connect(bob)['safeTransferFrom(address,address,uint256,bytes)'](bob.address, tokenReceiver.address, tokenId, '0x01'), "safeTransferFrom(with data) did not revert").to.be.revertedWith('token owner account is frozen');

    await expect(await titleTokenTest.connect(owner).setFrozenOwner(bob.address, false)).to.emit(titleTokenTest, 'OwnerFrozen').withArgs(bob.address, false);
    await expect(titleTokenTest.connect(bob).transferFrom(bob.address, jane.address, tokenId), "transferFrom() reverted").not.to.be.reverted;
    await expect(titleTokenTest.connect(jane).transferFrom(jane.address, bob.address, tokenId), "transferFrom() reverted").not.to.be.reverted;
    await expect(titleTokenTest.connect(bob).approve(sara.address, tokenId), "approve() reverted").not.to.be.reverted;
    await expect(titleTokenTest.connect(bob).setApprovalForAll(jane.address, true), "setApprovalForAll() reverted").not.to.be.reverted;
    await expect(titleTokenTest.connect(bob).setApprovalForAll(jane.address, false), "setApprovalForAll() reverted").not.to.be.reverted;
    await expect(titleTokenTest.connect(bob)['safeTransferFrom(address,address,uint256)'](bob.address, tokenReceiver.address, tokenId), "safeTransferFrom() reverted").not.to.be.reverted;
    await expect(titleTokenTest.connect(owner).transferFrom(tokenReceiver.address, bob.address, tokenId), "transferFrom() reverted").not.to.be.reverted;
    await expect(titleTokenTest.connect(bob)['safeTransferFrom(address,address,uint256,bytes)'](bob.address, tokenReceiver.address, tokenId, '0x01'), "safeTransferFrom(with data) reverted").not.to.be.reverted;
  });

  it('receives and iterates offers to buy', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId1 = await titleToken.titleToTokenId(titleId1);
    
    let b1:any = await retrieveLastBlock();

    await helpers.time.setNextBlockTimestamp(b1.timestamp + ONE_MINUTE);
    await expect(await titleToken.connect(sara).offerToBuy(tokenId1, 1000)).to.emit(titleToken, 'OfferToBuy').withArgs(tokenId1, sara.address, 1000);
    let b2:any = await retrieveLastBlock();

    await helpers.time.setNextBlockTimestamp(b2.timestamp + ONE_MINUTE);
    await expect(await titleToken.connect(jane).offerToBuy(tokenId1, 2000)).to.emit(titleToken, 'OfferToBuy').withArgs(tokenId1, jane.address, 2000);
    let b3:any = await retrieveLastBlock();

    await expect(await titleToken.connect(bob).countOffersToBuy(tokenId1)).to.equal(2);
    
    let o = await titleToken.connect(bob).offerToBuyAtIndex(tokenId1, 0);
    await expect(o.buyer).to.equal(sara.address);
    await expect(o.amount).to.equal(1000);
    await expect(o.offeredOn).to.equal(b2.timestamp);

    o = await titleToken.connect(bob).offerToBuyAtIndex(tokenId1, 1);
    await expect(o.buyer).to.equal(jane.address);
    await expect(o.amount).to.equal(2000);
    await expect(o.offeredOn).to.equal(b3.timestamp);

    await expect(titleToken.connect(bob).offerToBuyAtIndex(tokenId1, 2), "offerToBuyAtIndex(2) did not revert").to.be.revertedWith('unknown offer to buy');
  });

  it('cancels offers to buy', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId1 = await titleToken.titleToTokenId(titleId1);
    
    await expect(titleToken.connect(sara).offerToBuy(tokenId1, 1000)).not.to.be.reverted;
    await expect(titleToken.connect(jane).offerToBuy(tokenId1, 2000)).not.to.be.reverted;
    await expect(await titleToken.connect(bob).countOffersToBuy(tokenId1)).to.equal(2);

    await expect(await titleToken.connect(sara).cancelOfferToBuy(tokenId1)).to.emit(titleToken, 'OfferToBuyCancelled').withArgs(tokenId1, sara.address);
    await expect(await titleToken.connect(bob).countOffersToBuy(tokenId1)).to.equal(1);
    let o = await titleToken.connect(bob).offerToBuyAtIndex(tokenId1, 0);
    await expect(o.buyer).to.equal(jane.address);
  });

  it('accepts offers to buy', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId1 = await titleToken.titleToTokenId(titleId1);
    
    await expect(titleToken.connect(sara).offerToBuy(tokenId1, 1000)).not.to.be.reverted;
    await expect(await titleToken.connect(bob).acceptOfferToBuy(tokenId1, sara.address))
      .to.emit(titleToken, 'Transfer').withArgs(bob.address, sara.address, tokenId1)
      .to.emit(titleToken, 'OfferToBuyCancelled').withArgs(tokenId1, sara.address);

    expect(await titleToken.ownerOf(tokenId1)).to.equal(sara.address);
    await expect(await titleToken.connect(sara).countOffersToBuy(tokenId1)).to.equal(0);
  });

  it('receives and iterates offers to sell', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId1 = await titleToken.titleToTokenId(titleId1);
    
    let b1:any = await retrieveLastBlock();

    await helpers.time.setNextBlockTimestamp(b1.timestamp + ONE_MINUTE);
    await expect(await titleToken.connect(bob).offerToSell(tokenId1, sara.address, 1000)).to.emit(titleToken, 'OfferToSell').withArgs(tokenId1, sara.address, 1000);
    let b2:any = await retrieveLastBlock();

    await helpers.time.setNextBlockTimestamp(b2.timestamp + ONE_MINUTE);
    await expect(await titleToken.connect(bob).offerToSell(tokenId1, jane.address, 2000)).to.emit(titleToken, 'OfferToSell').withArgs(tokenId1, jane.address, 2000);
    let b3:any = await retrieveLastBlock();

    await expect(await titleToken.connect(bob).countOffersToSell(tokenId1)).to.equal(2);
    
    let o = await titleToken.connect(bob).offerToSellAtIndex(tokenId1, 0);
    await expect(o.buyer).to.equal(sara.address);
    await expect(o.amount).to.equal(1000);
    await expect(o.offeredOn).to.equal(b2.timestamp);

    o = await titleToken.connect(bob).offerToSellAtIndex(tokenId1, 1);
    await expect(o.buyer).to.equal(jane.address);
    await expect(o.amount).to.equal(2000);
    await expect(o.offeredOn).to.equal(b3.timestamp);

    await expect(titleToken.connect(bob).offerToSellAtIndex(tokenId1, 2), "offerToBuyAtIndex(2) did not revert").to.be.revertedWith('unknown offer to sell');
  });

  it('cancels offers to sell', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId1 = await titleToken.titleToTokenId(titleId1);
    
    await expect(titleToken.connect(bob).offerToSell(tokenId1, sara.address, 1000)).not.to.be.reverted;
    await expect(titleToken.connect(bob).offerToSell(tokenId1, jane.address, 2000)).not.to.be.reverted;
    await expect(await titleToken.connect(bob).countOffersToSell(tokenId1)).to.equal(2);

    await expect(await titleToken.connect(bob).cancelOfferToSell(tokenId1, sara.address)).to.emit(titleToken, 'OfferToSellCancelled').withArgs(tokenId1, sara.address);
    await expect(await titleToken.connect(bob).countOffersToSell(tokenId1)).to.equal(1);
    let o = await titleToken.connect(bob).offerToSellAtIndex(tokenId1, 0);
    await expect(o.buyer).to.equal(jane.address);
  });

  it('accepts offers to sell', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId1 = await titleToken.titleToTokenId(titleId1);
    
    await expect(titleToken.connect(bob).offerToSell(tokenId1, sara.address, 1000)).not.to.be.reverted;
    await expect(await titleToken.connect(sara).acceptOfferToSell(tokenId1))
      .to.emit(titleToken, 'Transfer').withArgs(bob.address, sara.address, tokenId1)
      .to.emit(titleToken, 'OfferToSellCancelled').withArgs(tokenId1, sara.address);
    
    expect(await titleToken.ownerOf(tokenId1)).to.equal(sara.address);
    await expect(await titleToken.connect(sara).countOffersToSell(tokenId1)).to.equal(0);
  });

  it('accepts revision to freeze contract', async function() {
    await expect(await titleToken.isFrozen()).to.equal(false);
    let revArgs = defaultAbiCoder.encode(["bool"],[true]);
    let tresponse = titleToken.executeRevision("FreezeContract", revArgs);
    await expect(tresponse)
      .to.emit(titleToken, "RevisionExecuted").withArgs("FreezeContract", revArgs)
      .to.emit(titleToken, "ContractFrozen").withArgs(titleToken.address, true);
    await expect(await titleToken.isFrozen()).to.equal(true);
    revArgs = defaultAbiCoder.encode(["bool"],[false]);
    tresponse = titleToken.executeRevision("FreezeContract", revArgs);
    await expect(tresponse)
      .to.emit(titleToken, "RevisionExecuted").withArgs("FreezeContract", revArgs)
      .to.emit(titleToken, "ContractFrozen").withArgs(titleToken.address, false);
    await expect(await titleToken.isFrozen()).to.equal(false);
  });

  it('accepts revision to freeze token', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId1 = await titleToken.titleToTokenId(titleId1);

    await expect(await titleToken.isFrozenToken(tokenId1)).to.equal(false);
    let revArgs = defaultAbiCoder.encode(["uint", "bool"],[tokenId1, true]);
    let tresponse = titleToken.executeRevision("FreezeToken", revArgs);
    await expect(tresponse)
      .to.emit(titleToken, "RevisionExecuted").withArgs("FreezeToken", revArgs)
      .to.emit(titleToken, "TokenFrozen").withArgs(tokenId1, true);
    await expect(await titleToken.isFrozenToken(tokenId1)).to.equal(true);
    revArgs = defaultAbiCoder.encode(["uint", "bool"],[tokenId1, false]);
    tresponse = titleToken.executeRevision("FreezeToken", revArgs);
    await expect(tresponse)
      .to.emit(titleToken, "RevisionExecuted").withArgs("FreezeToken", revArgs)
      .to.emit(titleToken, "TokenFrozen").withArgs(tokenId1, false);
    await expect(await titleToken.isFrozenToken(tokenId1)).to.equal(false);
  });

  it('accepts revision to freeze owner', async function() {
    await titleToken.mint(bob.address, titleId1);

    await expect(await titleToken.isFrozenOwner(bob.address)).to.equal(false);
    let revArgs = defaultAbiCoder.encode(["address", "bool"],[bob.address, true]);
    let tresponse = titleToken.executeRevision("FreezeOwner", revArgs);
    await expect(tresponse)
      .to.emit(titleToken, "RevisionExecuted").withArgs("FreezeOwner", revArgs)
      .to.emit(titleToken, "OwnerFrozen").withArgs(bob.address, true);
    await expect(await titleToken.isFrozenOwner(bob.address)).to.equal(true);
    revArgs = defaultAbiCoder.encode(["address", "bool"],[bob.address, false]);
    tresponse = titleToken.executeRevision("FreezeOwner", revArgs);
    await expect(tresponse)
      .to.emit(titleToken, "RevisionExecuted").withArgs("FreezeOwner", revArgs)
      .to.emit(titleToken, "OwnerFrozen").withArgs(bob.address, false);
    await expect(await titleToken.isFrozenOwner(bob.address)).to.equal(false);
  });

  it('accepts revision to change owner', async function() {
    await titleToken.mint(bob.address, titleId1);
    let tokenId1 = await titleToken.titleToTokenId(titleId1);

    await expect(await titleToken.ownerOf(tokenId1)).to.equal(bob.address);
    let revArgs = defaultAbiCoder.encode(["uint", "address"],[tokenId1, sara.address]);
    let tresponse = titleToken.executeRevision("ChangeOwner", revArgs);
    await expect(tresponse)
      .to.emit(titleToken, "RevisionExecuted").withArgs("ChangeOwner", revArgs)
      .to.emit(titleToken, "Transfer").withArgs(bob.address, sara.address, tokenId1);
      await expect(await titleToken.ownerOf(tokenId1)).to.equal(sara.address);
  });

  const testPublicWriteOperations = async (contract:tc.JSCTitleToken, expectRevert?:boolean) => {
    const checkRevert = async (op:Chai.Assertion) => expectRevert ? await op.to.be.reverted : await op.to.not.be.reverted;

    await contract.mint(bob.address, titleId1); // mint() is onlyOwner and should work regardless of whether the contract is frozen
    let tokenId = await contract.titleToTokenId(titleId1);

    await checkRevert(expect(contract.connect(bob).approve(sara.address, tokenId), "approve sara"));
    await checkRevert(expect(contract.connect(bob).approve(zeroAddress, tokenId), "approve no one"));

    await checkRevert(expect(contract.connect(bob).setApprovalForAll(sara.address, true), "add sara as operator"));
    await checkRevert(expect(contract.connect(bob).setApprovalForAll(sara.address, false), "remove sara as operator"));

    await checkRevert(expect(contract.connect(bob).transferFrom(bob.address, sara.address, tokenId), "transfer from bob to sara"));
    if (!expectRevert) await checkRevert(expect(contract.connect(sara).transferFrom(sara.address, bob.address, tokenId), "transfer from sara to bob"));

    await checkRevert(expect(contract.connect(bob)['safeTransferFrom(address,address,uint256)'](bob.address, sara.address, tokenId), "safe transfer from bob to sara"));
    if (!expectRevert) await checkRevert(expect(contract.connect(sara)['safeTransferFrom(address,address,uint256)'](sara.address, bob.address, tokenId), "safe transfer from sara to bob"));

    await checkRevert(expect(contract.connect(sara).offerToBuy(tokenId, 1000), "sara offers to buy"));
    if (!expectRevert) await checkRevert(expect(contract.connect(sara).cancelOfferToBuy(tokenId), "sara cancels offer to buy"));

    await checkRevert(expect(contract.connect(sara).offerToBuy(tokenId, 1000), "sara offers to buy again"));
    if (!expectRevert) {
      await checkRevert(expect(contract.connect(bob).acceptOfferToBuy(tokenId, sara.address), "accepts sara's offer to buy"));
      await checkRevert(expect(contract.connect(sara).transferFrom(sara.address, bob.address, tokenId), "transfer from sara to bob after accepting offer to uy"));
    }

    await checkRevert(expect(contract.connect(bob).offerToSell(tokenId, sara.address, 1000), "offer to sell to sara"));
    if (!expectRevert) await checkRevert(expect(contract.connect(bob).cancelOfferToSell(tokenId, sara.address), "cancel offer to sell to sara"));

    await checkRevert(expect(contract.connect(bob).offerToSell(tokenId, sara.address, 1000), "offer to sell to sara again"));
    if (!expectRevert) {
      await checkRevert(expect(contract.connect(sara).acceptOfferToSell(tokenId), "accepts bob's offer to sell"));
      await checkRevert(expect(contract.connect(sara).transferFrom(sara.address, bob.address, tokenId), "transfer from sara to bob after accepting offer to sell"));
    }

    await contract.burn(tokenId); // burn() is onlyOwner and should work regardless of whether the contract is frozen
  }

  it('allows write operations when not frozen', async function() {
    await testPublicWriteOperations(titleToken);
  });

  it('reverts write operations when frozen', async function() {
    const factory = await ethers.getContractFactory("JSCTitleToken", {
      libraries: {
        JSCRevisionsLib: revisionsLib.address,
        JSCConfigurableLib: configurableLib.address,
        JSCTitleTokenLib: titleTokenLib.address
      },
    });
    const contract:tc.JSCTitleToken = await factory.deploy();

    // Contract is fozen because we have not initialized it
    await testPublicWriteOperations(contract, true);

    // We can also freeze an initialized contract
    await expect(await titleTokenTest.connect(owner).setFrozenContract(true)).to.emit(titleTokenTest, 'ContractFrozen').withArgs(titleTokenTest.address, true);
    await testPublicWriteOperations(titleTokenTest, true);
  });

  /**
   * Pending:
   *   Add payment to offers
   *   
   *   Test no transfer to frozen account
   *   Test if approval clear after transfer
   *   Test if approval can transfer ownership after cancelling
   *   Test if operator can transfer ownership after cancelling
   *   Clear offers when token transferred and create unit tests
   *   Make unit tests as focused as possible
   *   Check of wrong person can accept offers
   * Add tests to revisions while contract is frozen - they should be allowed
   *   Fix documentation
   */
})
