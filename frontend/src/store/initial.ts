import { MenuItemInterface, SiteLayoutData, SiteLabel, HomeLabels } from '@/interfaces/index';


export const siteMainMenu:Array<MenuItemInterface> = [
    {label: 'Your Properties', url: '/tokens', command: '⌘T'},
    {label: 'Create a Jurisdiction', url: '/create-jurisdiction', command: '⌘J'},
    {label: 'Create a Propossal', url: '/create-propossal', command: '⌘P'},
]

export const siteLayoutData:SiteLayoutData = {
    title: `Blockchain Jurisdictions 
    & Land Registries`,
    ctaConnect: 'Connect',
};

export const homeLabels:HomeLabels = {
    pageTitle: 'Dashboard Jurisdiction',
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



