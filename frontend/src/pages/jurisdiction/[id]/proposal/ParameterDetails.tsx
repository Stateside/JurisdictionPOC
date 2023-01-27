import {
  HStack,
  Text,
  Switch,
} from '@chakra-ui/react';
import { useParameterSimplifier } from '@/store/useParameterSimplifier';
import { IRevisionParameter, ParamType } from 'db/interfaces/IRevisionParameter';
import { useAliases } from '@/store/useAliases';

export type Props = {
  param: IRevisionParameter
  width: string
};

export const ParameterDetails = ({param, width}:Props) => {
  const { simplifyDescription, simplifyValue } = useParameterSimplifier();
  const { aliasesByAddress } = useAliases()

  switch(param.type) {
    case ParamType.t_address:
      return (
        <HStack width={width}>
          <Text variant="break-word">
            {aliasesByAddress[param.value.toLowerCase()]?.alias || param.value}
          </Text>
          <Text pl="3rem" variant="break-word">
            {param.value}
          </Text>
        </HStack>)
    case ParamType.t_bool:
      return (
        <Switch width={width} isChecked={param.value === '1'} disabled={true}/>
      )
    default:
      return (
        <Text width={width} variant="break-word">
          {simplifyValue(param)}
        </Text>)
  }
}
