import { BigNumber, ethers } from "ethers";

export const setProvider = (type:string) => { window.localStorage.setItem("provider", type) };
export const getProvider = () => { return window.localStorage.getItem("provider") };

export const refreshState = () => { window.localStorage.setItem("provider", 'undefined')};

export const getAccountShortName = (account:any): string => {
    return account !== '' ? `${account.slice(0, 6)}...${account.slice(-2)}` : '';
}

export const env = (varName:string, val:string|undefined) =>{
    if (val)
        return val;
    throw "Missing environment variable: " + varName
}

export const percentage = (total:BigNumber|undefined, part:BigNumber|undefined):number => 
    part && total && total.gt(ethers.constants.Zero) ? 
        part.mul(1_000_000).div(total).toNumber()/10_000
        : 0
