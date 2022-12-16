import { useEffect, useState } from 'react';
import { Button, HStack, Select, VStack } from '@chakra-ui/react';
import { ParamType } from '@/utils/types';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import LockIcon from '@/components/icons/lockIcon';
import ReloadIcon from '@/components/icons/reloadIcon';
import * as tc from '../../../typechain-types';

type JurisdictionContracts = {
  name: string;
  address: string;
  description: string;
};

const Contracts = () => {
  const [localError, setLocalError] = useState<string>('');
  const { active, library, error, connector } = useWeb3React();
  const router = useRouter();
  
  const [contracts, setContracts] = useState<JurisdictionContracts[]>([]);

  const [jscJurisdiction, setJSCJurisdiction] = useState<
    tc.IJSCJurisdiction | undefined
  >(undefined);

  useEffect(() => {
    if (library)
      try {
        setJSCJurisdiction(
          tc.IJSCJurisdiction__factory.connect(
            '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
            library
          )
        );
      } catch (err: any) {
        setLocalError(err ? err.toString() : 'unknown error');
      }
  }, [library]);

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
            <Select width="30%" placeholder="Select">
              <option value="option1">Option 1</option>
            </Select>
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
