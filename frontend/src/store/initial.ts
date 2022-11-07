// import { siteDetaultsData } from './layoutData';

interface SiteLayoutData {
    title: string
    ctaConnect: string
}

interface SiteLabel {
    regular: string
    vip: string
}

interface HomeLabels {
    pageTitle: string
    mainTitle: SiteLabel
    ctaConnect: string
}


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
export const getLabel = (account:string, label: SiteLabel):string =>  {
    return account === '' ? label.regular : label.vip
}



