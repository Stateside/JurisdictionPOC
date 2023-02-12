import {
  HStack,
  Text,
  Switch,
  Tooltip,
} from '@chakra-ui/react';
import { useParameterSimplifier } from '@/store/useParameterSimplifier';
import { IRevisionParameter, ParamType } from 'db/interfaces/IRevisionParameter';
import { useAliases } from '@/store/useAliases';
import { buildRoles } from '@/utils/roles';
import { ethers } from 'ethers';

export type Props = {
  param: IRevisionParameter
  width: string
};

const roles = buildRoles(ethers)

const ParameterDetails = ({param, width}:Props) => {
  const { simplifyValue } = useParameterSimplifier();
  const { aliasesByAddress } = useAliases()
console.log(param)
  switch(param.type) {
    case ParamType.t_contract:
    case ParamType.t_account:
      return (
        <HStack width={width}>
          <Text variant="break-word">
            {aliasesByAddress[param.value.toLowerCase()]?.alias || param.value}
          </Text>
          <Text pl="2rem" variant="break-word">
            {param.value}
          </Text>
        </HStack>
      )
    case ParamType.t_bool:
      return (
        <Switch width={width} isChecked={param.value === '1'} disabled={true} variant={param.value === '1' ? 'java' : ''} size="lg"/>
      )
    case ParamType.t_role:
      return (
        <Text>{roles.rolesById[param.value].friendlyName}</Text>
      )
    default:
      return (
        <Text width={width} variant="break-word">
          {simplifyValue(param)}
        </Text>
      )
  }
}

export default ParameterDetails;