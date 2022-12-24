import { useEffect, useState } from 'react';
import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { ParamType } from '@/utils/types';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import LockIcon from '@/components/icons/lockIcon';
import ReloadIcon from '@/components/icons/reloadIcon';
import * as tc from '../../../../typechain-types';

type JurisdictionContracts = {
  name: string;
  address: string;
  description: string;
};

const Contracts = () => {
  const [localError, setLocalError] = useState<string>('');
  const { active, library, error, connector } = useWeb3React();
  const [contracts, setContracts] = useState<JurisdictionContracts[]>([]);
  const [jscJurisdiction, setJSCJurisdiction] = useState<tc.IJSCJurisdiction | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (library && router.query.id)
      try {
        setJSCJurisdiction(
          tc.IJSCJurisdiction__factory.connect(
            router.query.id as string,
            library
          )
        );
      } catch (err) {
        setLocalError(err as string);
      }
  }, [library, router.query.id]);

  useEffect(() => {
    if (jscJurisdiction) {
      const loadData = async () => {
        let _contracts: JurisdictionContracts[] = [];
        let i = await jscJurisdiction.iterateParameters();
        while (await jscJurisdiction.isValidParameterIterator(i)) {
          const p = await jscJurisdiction.parameterIteratorGet(i);
          if (p.ptype == ParamType.t_address) {
            let a = await jscJurisdiction.getAddressParameter(p.name);
            _contracts.push({
              name: p.name,
              address: a,
              description: p.description,
            });
            i = await jscJurisdiction.nextParameter(i);
          }
        }
        setContracts(_contracts);
      };
      loadData().catch(err =>
        setLocalError(err ? err.toString() : 'unknown error')
      );
    }
  }, [jscJurisdiction]);

  return (
    <VStack alignItems="flex-start">
      {contracts.map((contract: JurisdictionContracts) => {
        return (
          <HStack width="100%" key={contract.address}>
            <p style={{ width: '20%' }}>{contract.name}</p>
            <Text>{contract.address}</Text>
            <Button width="20%" rightIcon={<ReloadIcon height={7} width={7} />}>
              Replace
            </Button>
            <Button width="20%" rightIcon={<LockIcon height={7} width={7} />}>
              Freeze
            </Button>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default Contracts;
