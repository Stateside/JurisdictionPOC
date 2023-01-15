import { useEffect } from 'react';
import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
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
          <Box key={contract.name} width="100%">
            <HStack width="100%" m="1em 0">
              <Text width="25%">{contract.name}</Text>
              <Text width="45%">{contract.address}</Text>
              <Button width="15%"
                variant="Transparent"
                rightIcon={<ReloadIcon height={6} width={6} />}
                onClick={() => router.push(`${jurisdictionAddress}/proposal/create?p=${contract.name}/Upgrade`)}
              >
                Replace
              </Button>
              <Button width="15%"
                variant="Transparent"
                rightIcon={<LockIcon height={6} width={6} />}
                onClick={() => router.push(`${jurisdictionAddress}/proposal/create?p=${contract.name}/Freeze`)}
              >
                Freeze
              </Button>
            </HStack>
            <Divider />
          </Box>
        );
      })}
      {!contracts?.list?.length && <Text>No information available</Text>}
    </VStack>
  );
};

export default Contracts;
