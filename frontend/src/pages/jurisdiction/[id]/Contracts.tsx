import { useEffect } from 'react';
import { Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
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
    <VStack alignItems="flex-start" width="100%">
      {contracts?.list?.length > 0 && contracts.list.map(contract => {
        return (
          <>
            <HStack width="100%" height="60px" key={contract.address}>
              <Text width="20%">{contract.name}</Text>
              <Text width="55%">{contract.address}</Text>
              <Button
                variant="Clear"
                rightIcon={<ReloadIcon height={6} width={6} />}
              >
                Replace
              </Button>
              <Button
                variant="Clear"
                rightIcon={<LockIcon height={6} width={6} />}
              >
                Freeze
              </Button>
            </HStack>
            <Divider />
          </>
        );
      })}
      {!contracts?.list?.length && <Text>No information available</Text>}
    </VStack>
  );
};

export default Contracts;
