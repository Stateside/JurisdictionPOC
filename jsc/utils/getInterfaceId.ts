import { ethers } from 'hardhat'
import { utils } from 'ethers'
import * as tc from "../typechain-types"

const verbose = false;

export const getInterfaceID = (name:string, contractInterface: utils.Interface) => {
  if (verbose) console.log("Interface:", name);
  let interfaceID = ethers.constants.Zero;
  const functions: string[] = Object.keys(contractInterface.functions);
  for (let i = 0; i < functions.length; i++) {
    if (verbose) console.log("  Function:", functions[i]);
    interfaceID = interfaceID.xor(contractInterface.getSighash(functions[i]));
  }
  if (verbose) console.log("  IID:", interfaceID.toHexString());
  return interfaceID;
}    

// The following interface ID's contain the ID of the interface itself including base interfaces - all in BigNumber format

export const IID_BN_IERC165 = getInterfaceID("IID_IERC165", tc.IERC165__factory.createInterface());
export const IID_BN_IERC721 = getInterfaceID("IID_IERC721", tc.IERC721__factory.createInterface());
export const IID_BN_IERC721Metadata = getInterfaceID("IID_IERC721Metadata", tc.IERC721Metadata__factory.createInterface());
export const IID_BN_IJSCRevisioned = getInterfaceID("IID_IJSCRevisioned", tc.IJSCRevisioned__factory.createInterface());
export const IID_BN_IJSCFreezable = getInterfaceID("IJSCFreezable", tc.IJSCFreezable__factory.createInterface());
export const IID_BN_IJSCConfigurable = getInterfaceID("IJSCConfigurable", tc.IJSCConfigurable__factory.createInterface());
export const IID_BN_IJSCTitleToken = getInterfaceID("IJSCTitleToken", tc.IJSCTitleToken__factory.createInterface());
export const IID_BN_IJSCJurisdiction = getInterfaceID("IJSCJurisdiction", tc.IJSCJurisdiction__factory.createInterface());
export const IID_BN_IJSCGovernor = getInterfaceID("IJSCGovernor", tc.IJSCGovernor__factory.createInterface());

// The following interface ID's contain the ID of the interface itself including base interfaces - all in hex format
export const IID_FULL_IERC165 = IID_BN_IERC165.toHexString();
export const IID_FULL_IERC721 = IID_BN_IERC721.toHexString();
export const IID_FULL_IERC721Metadata = IID_BN_IERC721Metadata.toHexString();
export const IID_FULL_IJSCRevisioned = IID_BN_IJSCRevisioned.toHexString();
export const IID_FULL_IJSCFreezable = IID_BN_IJSCFreezable.toHexString();
export const IID_FULL_IJSCConfigurable = IID_BN_IJSCConfigurable.toHexString();
export const IID_FULL_IJSCTitleToken = IID_BN_IJSCTitleToken.toHexString();
export const IID_FULL_IJSCJurisdiction = IID_BN_IJSCJurisdiction.toHexString();
export const IID_FULL_IJSCGovernor = IID_BN_IJSCGovernor.toHexString();

// The following interface ID's contain the ID of the interface itself without base interfaces - all in hex format
export const IID_IERC165 = IID_BN_IERC165.toHexString();
export const IID_IERC721 = IID_BN_IERC721.xor(IID_BN_IERC165).toHexString();
export const IID_IERC721Metadata = IID_BN_IERC721Metadata.xor(IID_BN_IERC721).toHexString();
export const IID_IJSCRevisioned = IID_BN_IJSCRevisioned.xor(IID_BN_IERC165).toHexString();
export const IID_IJSCFreezable = IID_BN_IJSCFreezable.xor(IID_BN_IJSCRevisioned).toHexString();
export const IID_IJSCConfigurable = IID_BN_IJSCConfigurable.xor(IID_BN_IJSCFreezable).toHexString();
export const IID_IJSCTitleToken = IID_BN_IJSCTitleToken.xor(IID_BN_IJSCConfigurable).xor(IID_BN_IERC721Metadata).xor(IID_BN_IERC165).toHexString();
export const IID_IJSCJurisdiction = IID_BN_IJSCJurisdiction.xor(IID_BN_IJSCConfigurable).toHexString();
export const IID_IJSCGovernor = IID_BN_IJSCGovernor.xor(IID_BN_IJSCConfigurable).toHexString();
