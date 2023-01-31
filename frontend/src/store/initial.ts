import { MenuItemInterface, SiteLayoutData, SiteLabel, HomeLabels } from '@/interfaces/index';
import { mineBlocks } from '@/utils/mine-blocks';

const blocksPerDay = 5*60*24

export const siteMainMenu:Array<MenuItemInterface> = [
    {label: 'My Properties', url: '/my-properties', command: '⌘T'},
    {label: 'Create a Jurisdiction', url: '/jurisdiction/create', command: '⌘J'},
    {label: 'Show Sample Accounts', url: '/accounts', command: '⌘A'},
    {label: 'divider1', chainIds: [31337] },
    {label: 'Time Travel', chainIds: [31337], children: [
        {label: 'Mine 1 Block', url: '', action:() => mineBlocks(1), actionMsg:"Mined 1 block", command: '⌘1', chainIds: [31337]},
        {label: 'Mine 2 Blocks', url: '', action:() => mineBlocks(2), actionMsg:"Mined 2 blocks", command: '⌘2', chainIds: [31337]},
        {label: 'Mine 4 Blocks', url: '', action:() => mineBlocks(4), actionMsg:"Mined 4 blocks", command: '⌘4', chainIds: [31337]},
        {label: 'Mine 8 Blocks', url: '', action:() => mineBlocks(8), actionMsg:"Mined 8 blocks", command: '⌘8', chainIds: [31337]},
        {label: 'Mine 16 Blocks', url: '', action:() => mineBlocks(16), actionMsg:"Mined 16 blocks", command: '⌘6', chainIds: [31337]},
        {label: 'Mine 32 Blocks', url: '', action:() => mineBlocks(32), actionMsg:"Mined 32 blocks", command: '⌘3', chainIds: [31337]},
    ]}
]

export const siteLayoutData:SiteLayoutData = {
    title: `Blockchain Jurisdictions & Land Registries`,
    ctaConnect: 'Connect',
};

export const homeLabels:HomeLabels = {
    pageTitle: 'BER Dashboard',
    mainTitle: {
        regular: `Welcome,
        Please connect your 
        wallet to access the 
        platform`,
        vip: `Welcome to your
        digital registries`
    },
    ctaConnect: 'Connect with your Wallet'
}

export const listContractsLabels = {
    pageTitle: 'Deployed Contracts',
    heading: "Deployed Contracts"
}

export const jscJurisdictionLabels = {
    pageTitle: 'JSCJurisdiction',
    heading: "Jurisdiction Contracts",
    tableCaption: "Jurisdiction Contracts"
}

export const jscCabinetLabels = {
    pageTitle: 'JSCCabinet',
    heading: "Cabinet Members",
    tableCaption: "Cabinet Members"
}

export const jscGovernorLabels = {
    pageTitle: 'JSCGovernor',
    heading: "Current and Past Proposals",
    tableCaption: "Current and Past Members"
}

export const jscTitleTokenLabels = {
    pageTitle: 'JSCTitleToken',
    heading: "All Title Tokens",
    tableCaption: "All Title Tokens"
}

export const useBlockchainLabels = {
    warning: "Warning",
    error: "Error",
    pleaseLogin: "Please sign in to MetaMask",
    pleaseInstall: "Please install the MetaMask browser extension"
}

export const connectCheckLabels = {
    error: "Error",
    warning: "Warning",
    switchChain: `MetaMask is not connected to the correct chain. Please connect to the "${process.env.NEXT_PUBLIC_CHAIN_NAME}" chain...`,
    addChain: `MetaMask does not have the correct chain installed. Please install the "${process.env.NEXT_PUBLIC_CHAIN_NAME}" chain...`
}

/**
 * Return Label vip when account is available, or regular when
 * account is empty
 * @param account 
 * @param label 
 * @returns 
 */
export const getLabel = (active:boolean, label: SiteLabel):string =>  {
    return !active ? label.regular : label.vip
}

