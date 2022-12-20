import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ProposalState } from '@/utils/types';
import * as tc from '../../../typechain-types';
import { Box, Button, HStack, Select, Text, VStack } from '@chakra-ui/react';
import Tag from '@/components/Tag';

type BlockchainProposal = { id: string; state: ProposalState };
type BlockchainProposalMap = { [hash: string]: BlockchainProposal };

const Proposals = () => {
  const [localError, setLocalError] = useState<string>('');
  const { active, account, library, error } = useWeb3React();
  const [jscGovernor, setJSCGovernor] = useState<tc.IJSCGovernor | undefined>(
    undefined
  );
  const [jscProposals, setJSCProposals] = useState<BlockchainProposalMap>({});

  useEffect(() => {
    if (library)
      try {
        setJSCGovernor(
          tc.IJSCGovernor__factory.connect(
            '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
            library
          )
        );
      } catch (err) {
        setLocalError(err as string);
      }
  }, [library]);

  useEffect(() => {
    if (jscGovernor) {
      const loadData = async () => {
        let _proposals: BlockchainProposalMap = {};
        const pCount = (await jscGovernor.proposalCount()).toNumber();
        for (let pi = 0; pi < pCount; pi++) {
          const p = (await jscGovernor.proposalAtIndex(pi))
            .toHexString()
            .toLowerCase();
          const state: ProposalState = await jscGovernor.state(p);
          _proposals[p] = { id: p, state: state };
        }
        setJSCProposals(_proposals);
      };
      loadData().catch(err => setLocalError(err.toString()));
    }
  }, [jscGovernor]);

  return (
    <HStack alignItems="flex-start">
      <VStack width={'80%'} marginRight={'10%'} alignItems="flex-start">
        <Text variant={'15/20-BOLD'}>Active proposals</Text>
        <Box width={'100%'}>
          {Object.keys(jscProposals).map(proposal => {
            return (
              <Tag>
                <Text variant={'15/20'}>{proposal}</Text>
              </Tag>
            );
          })}
        </Box>
        <Text variant={'15/20-BOLD'}>Closed proposals</Text>
        <Box width={'100%'}>
          {Object.keys(jscProposals).map(proposal => {
            return (
              <Tag>
                <Text variant={'15/20'}>{proposal}</Text>
              </Tag>
            );
          })}
        </Box>
      </VStack>
      <Box>
        <Button variant="Heading">Create New Proposal</Button>
      </Box>
    </HStack>
  );
};

export default Proposals;
