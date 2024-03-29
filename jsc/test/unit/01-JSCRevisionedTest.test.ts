import * as tc from "../../typechain-types"

// @ts-ignore
import { deployments, ethers } from "hardhat"
import { expect } from "chai"
import { defaultAbiCoder } from "ethers/lib/utils"
import * as iid from "../../utils/getInterfaceId"

describe("JSCRevisionedTest", async () => {
  let proposable: tc.JSCRevisionedTest
  let owner, bob, jane, sara;

  beforeEach(async () => {
    await deployments.fixture(["unittests"])
    proposable = await ethers.getContract("unittests_JSCRevisionedTest");
    [owner, bob, jane, sara] = await ethers.getSigners();
  })

  it('correctly checks interfaces IDs', async function() {
    expect(await proposable.supportsInterface("0xffffffff")).to.equal(false);
    expect(await proposable.supportsInterface(iid.IID_IERC165)).to.equal(true);
    expect(await proposable.supportsInterface(iid.IID_IERC721)).to.equal(false);
    expect(await proposable.supportsInterface(iid.IID_IERC721Metadata)).to.equal(false);
    expect(await proposable.supportsInterface(iid.IID_IAccessControl)).to.equal(false);
    expect(await proposable.supportsInterface(iid.IID_IAccessControlEnumerable)).to.equal(false);
    expect(await proposable.supportsInterface(iid.IID_IJSCRevisioned)).to.equal(true);
    expect(await proposable.supportsInterface(iid.IID_IJSCFreezable)).to.equal(false);
    expect(await proposable.supportsInterface(iid.IID_IJSCConfigurable)).to.equal(false);
    expect(await proposable.supportsInterface(iid.IID_IJSCTitleToken)).to.equal(false);
    expect(await proposable.supportsInterface(iid.IID_IJSCJurisdiction)).to.equal(false);
    expect(await proposable.supportsInterface(iid.IID_IJSCGovernor)).to.equal(false);
    expect(await proposable.supportsInterface(iid.IID_IJSCCabinet)).to.equal(false);
  });

  it("iterates revisions", async () => {
    let i = await proposable.iterateRevisions()
    await expect((await proposable.revisionIteratorGet(i)).name).to.be.equal("first")
    i = await proposable.nextRevision(i)
    await expect((await proposable.revisionIteratorGet(i)).name).to.be.equal("second")
    i = await proposable.nextRevision(i)
    await expect((await proposable.revisionIteratorGet(i)).name).to.be.equal("third")
    i = await proposable.nextRevision(i)
    await expect(proposable.revisionIteratorGet(i)).to.be.revertedWith("Invalid iterator")
  })

  it("reverts on duplicate revision", async () => {
    await expect(proposable.addDuplicate()).to.be.revertedWith("Revision with same name already exists")
  })

  it("removes revisions", async () => {
    await expect((await proposable.first()).name).to.be.equal("first")
    let tresponse = proposable.remove("first");
    await expect(tresponse).to.not.be.reverted;
    await expect(tresponse).to.emit(proposable, "RevisionRemoved").withArgs("first");
    await expect((await proposable.first()).name).to.be.equal("second")
  })

  it("fails to execute revision if not owner", async () => {
    let revArgs = defaultAbiCoder.encode(["string"],["rev1"]);
    await expect(proposable.connect(bob).executeRevision("first", revArgs)).to.be.revertedWith('Ownable: caller is not the owner');
  })

  it("executes string revision", async () => {
    await expect((await proposable.rev())).to.be.equal("none");
    let revArgs = defaultAbiCoder.encode(["string"],["rev1"]);
    let tresponse = proposable.executeRevision("first", revArgs);
    await expect(tresponse).to.emit(proposable, "RevisionExecuted").withArgs("first", revArgs);
    await expect((await proposable.rev())).to.be.equal("rev1")
  })

  it("executes number revision", async () => {
    await expect((await proposable.rev())).to.be.equal("none");
    let revArgs = defaultAbiCoder.encode(["uint"],[1]);
    let tresponse = proposable.executeRevision("second", revArgs);
    await expect(tresponse).to.emit(proposable, "RevisionExecuted").withArgs("second", revArgs);
    await expect((await proposable.rev())).to.be.equal("1")
  })

  it("executes address revision", async () => {
    await expect((await proposable.rev())).to.be.equal("none");
    let revArgs = defaultAbiCoder.encode(["address"],["0x111122223333444455556666777788889999aaaa"]);
    let tresponse = proposable.executeRevision("third", revArgs);
    await expect(tresponse).to.emit(proposable, "RevisionExecuted").withArgs("third", revArgs);
    await expect((await proposable.rev())).to.be.equal("0x111122223333444455556666777788889999aaaa")
  })
})
