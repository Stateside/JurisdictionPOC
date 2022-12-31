import { useEffect, useState } from 'react';
import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import LockIcon from '@/components/icons/lockIcon';
import ReloadIcon from '@/components/icons/reloadIcon';
import { useJurisdictions } from '@/store/jurisdictions';

const Contracts = () => {
  const router = useRouter();
  const jurisdictionAddress = router.query.id as string;
  const { library } = useWeb3React();
  
  const loaded = useJurisdictions(state => state.loaded);
  const contracts = useJurisdictions(state => state.contracts[jurisdictionAddress]);
  const getContracts = useJurisdictions(state => state.getContracts);

  useEffect(() => {
    if (contracts === undefined && loaded) {
      // Database jurisdictions were loaded but this jurisdiction is new...
      // Only needed if someone types in a new address manually into the URL
      getContracts(jurisdictionAddress, library);
    }
  }, [jurisdictionAddress, loaded]);

  return (
    <VStack alignItems="flex-start">
      {contracts?.map(contract => {
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
