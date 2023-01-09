import { ParamType } from "@/utils/types"
import { useCallback } from "react"
import { IRevisionDetails } from "./useGovernors"
import { buildRoles } from '@/utils/roles';
import { ethers } from 'ethers';
import { IRevisionParameter } from "db/interfaces/IRevisionParameter";
import { useAliases } from "./useAliases";

export type ParameterSimplifierHook = {
  simplifyValue: (param: IRevisionParameter) => any
  simplifyDescription: (revision: IRevisionDetails | undefined) => string | undefined
}

export const useParameterSimplifier = (): ParameterSimplifierHook => {
  const { aliasesByAddress } = useAliases()

  // Don't use useCallback() because we want all uses to rerender when the aliases or contracts change
  const simplifyValue = (param: IRevisionParameter): any => {
    let value: string = param.value
    switch (param.type) {
      case ParamType.t_address:
        // Check for contracts
        // Check for account aliases
        if (aliasesByAddress[value])
          value = aliasesByAddress[value].alias
        break;
      case ParamType.t_number:
        const roles = buildRoles(ethers)
        if (roles.rolesById[value])
          value = roles.rolesById[value].friendlyName
        break;
      case ParamType.t_bool:
        value = value === '1' ? 'True' : 'False'
        break;
      case ParamType.t_string:
        break;
    }
    return value
  }

  // Don't use useCallback() because we want all uses to rerender when the aliases or contracts change
  const simplifyDescription = (revision: IRevisionDetails | undefined): string | undefined => {
    if (!revision) return undefined;

    let s: string = revision.description
    revision.parameters.forEach(parameter => {
      s = s.replace(`{${parameter.name}}`, simplifyValue(parameter))
    })
    return s
  }

  return {
    simplifyValue,
    simplifyDescription
  }
}