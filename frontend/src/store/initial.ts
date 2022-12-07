import { MenuItemInterface, SiteLayoutData, SiteLabel, HomeLabels } from '@/interfaces/index';


export const siteMainMenu:Array<MenuItemInterface> = [
    {label: 'Your Properties', url: '/tokens', command: '⌘T'},
    {label: 'Create a Jurisdiction', url: '/create-jurisdiction', command: '⌘J'},
    {label: 'Create a Propossal', url: '/create-propossal', command: '⌘P'},
    {label: 'List Contracts', url: '/contracts', command: '⌘P'},
]

export const siteLayoutData:SiteLayoutData = {
    title: `Blockchain Estate Registry`,
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

export const jscJurisdicitonLabels = {
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



