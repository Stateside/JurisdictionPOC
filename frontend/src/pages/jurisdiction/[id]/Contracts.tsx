import { useEffect } from 'react';
import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import LockIcon from '@/components/icons/lockIcon';
import ReloadIcon from '@/components/icons/reloadIcon';
import { useJurisdictions } from '@/store/useJurisdictions';

const Contracts = () => {
  const router = useRouter();
  const jurisdictionAddress = router.query.id as string;
  const { library } = useWeb3React();
  
  // First load jurisdiction, then contracts...
  // If this page was saved as a bookmark, then none of the above may be loaded yet.

  const { loaded, loadContracts } = useJurisdictions();
  const contracts = useJurisdictions(state => state.contracts[jurisdictionAddress]);

  // Load contracts from jurisdiciton
  useEffect(() => { loaded && contracts === undefined && loadContracts(jurisdictionAddress, library) },
    [jurisdictionAddress, loaded, library]);

  return (
    <VStack alignItems="flex-start">
      {contracts?.list?.length > 0 && contracts.list.map(contract => {
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
        )
      })}
      {!contracts?.list?.length && <Text>No information available</Text>}
    </VStack>
  );
};

export default Contracts;
