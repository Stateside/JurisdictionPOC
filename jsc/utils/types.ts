export enum ParamType {
    t_address,
    t_bool,
    t_number,
    t_string
}

export const ParamType2SolidyType = {
    [ParamType.t_address]: "address",
    [ParamType.t_bool]: "bool",
    [ParamType.t_number]: "uint256",
    [ParamType.t_string]: "string"
}

export enum ProposalState {
    Active,
    Canceled,
    Defeated,
    Succeeded,
    Queued,
    Expired,
    Executed
}

export enum VoteType {
    Against,
    For,
    Abstain
}
