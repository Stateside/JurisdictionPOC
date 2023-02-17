import { SiteLayoutData, SiteLabel, HomeLabels } from '@/interfaces/index';

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
        vip: `Welcome to the
        Blockchain Estate Registry`
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

