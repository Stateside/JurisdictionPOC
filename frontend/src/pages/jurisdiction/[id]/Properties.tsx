import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ProposalState } from '@/utils/types';
import * as tc from '../../../../typechain-types';
import { Box, Button, HStack, Select, Text, VStack } from '@chakra-ui/react';
import Tag from '@/components/Tag';

type BlockchainProposal = { id: string; state: ProposalState };
type BlockchainProposalMap = { [hash: string]: BlockchainProposal };

const Properties = () => {

  return (
    <VStack>
      <Tag>
        <Text variant={'15/20'}>001 - 456 - 87654 - E</Text>
      </Tag>
      <Tag>
        <Text variant={'15/20'}>001 - 456 - 87654 - E</Text>
      </Tag>
      <Tag>
        <Text variant={'15/20'}>001 - 456 - 87654 - E</Text>
      </Tag>
      <Tag>
        <Text variant={'15/20'}>001 - 456 - 87654 - E</Text>
      </Tag>
      <Tag>
        <Text variant={'15/20'}>001 - 456 - 87654 - E</Text>
      </Tag>
    </VStack>
  );
};

export default Properties;
