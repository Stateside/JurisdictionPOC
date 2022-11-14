import { InjectedConnector } from "@web3-react/injected-connector";


const injected = new InjectedConnector({
  supportedChainIds: [1337, 1, 3, 4, 5, 42]
});

export const connectors = {
  injected: injected,
//   walletConnect: walletconnect,
//   coinbaseWallet: walletlink
};