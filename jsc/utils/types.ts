export enum ParamType {
    t_account,
    t_bool,
    t_contract,
    t_number,
    t_role,
    t_string
}

export const ParamType2SolidyType = {
    [ParamType.t_account]: "address",
    [ParamType.t_bool]: "bool",
    [ParamType.t_contract]: "address",
    [ParamType.t_number]: "uint256",
    [ParamType.t_role]: "uint256",
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
