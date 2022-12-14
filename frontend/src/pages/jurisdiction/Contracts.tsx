import { useEffect, useState } from 'react';
import { Button, HStack, Select, VStack } from '@chakra-ui/react';
import LockIcon from '@/components/icons/lockIcon';
import ReloadIcon from '@/components/icons/reloadIcon';

import { ContractInfo } from '../api/getContracts';

const Contracts = () => {
  
  const [contracts, setContracts] = useState<ContractInfo[]>([]);

  useEffect(() => {
    fetch('api/getContracts')
      .then((res: Response) => res.json())
      .then((json: ContractInfo[]) => setContracts(json));
  }, []);


  return (
    <VStack alignItems="flex-start">
      {contracts.map((contract: ContractInfo) => {
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
