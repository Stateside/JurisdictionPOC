export interface MenuItemInterface {
    label: string
    url: string
    command: string
} 

export interface SiteLayoutData {
    title: string
    ctaConnect: string
}

export interface SiteLabel {
    regular: string
    vip: string
}

export interface HomeLabels {
    pageTitle: string
    mainTitle: SiteLabel
    ctaConnect: string
}