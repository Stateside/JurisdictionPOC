import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from "@web3-react/injected-connector";


const injected = new InjectedConnector({
  supportedChainIds: [31337, 1, 3, 4, 5, 42]
});

export const connectors:{[key:string]: AbstractConnector} = {
  "injected": injected,
//   walletConnect: walletconnect,
//   coinbaseWallet: walletlink
};