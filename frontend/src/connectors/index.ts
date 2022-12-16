import { injected } from '@/utils/connectors';
import { AbstractConnector } from '@web3-react/abstract-connector';

export const connectors:{[key:string]: AbstractConnector} = {
  "injected": injected,
//   walletConnect: walletconnect,
//   coinbaseWallet: walletlink
};