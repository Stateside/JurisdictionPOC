import { BigNumber, ethers } from "ethers";

export const setProvider = (type:string) => { window.localStorage.setItem("provider", type) };
export const getProvider = () => { return window.localStorage.getItem("provider") };

export const refreshState = () => { window.localStorage.setItem("provider", 'undefined')};

export const getAccountShortName = (account:any, pre:number=6, post:number = 2): string => {
    return account !== '' ? `${account.slice(0, pre)}...${account.slice(-post)}` : '';
}

export const env = (varName:string, val:string|undefined) =>{
    if (val)
        return val;
    throw "Missing environment variable: " + varName
}

export const percentage = (total:BigNumber|undefined, part:BigNumber|undefined):number => 
    part && total && total.gt(ethers.constants.Zero) ? 
        part.mul(1_000_000).div(total).toNumber()/10_000
        : 0;

export const deepCopy = <T>(target: T): T => {
    if (target === null) {
        return target;
    }
    if (target instanceof Date) {
        return new Date(target.getTime()) as any;
    }
    if (target instanceof Array) {
        const cp = [] as any[];
        (target as any[]).forEach(v => {
        cp.push(v);
        });
        return cp.map((n: any) => deepCopy<any>(n)) as any;
    }
    if (typeof target === 'object' && target !== new Object) {
        const cp = { ...(target as { [key: string]: any }) } as {
        [key: string]: any;
        };
        Object.keys(cp).forEach(k => {
        cp[k] = deepCopy<any>(cp[k]);
        });
        return cp as T;
    }
    return target;
};

export const capitalizeString = (str: string) : string => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}
