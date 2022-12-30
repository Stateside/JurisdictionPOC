import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ProposalState } from '@/utils/types';
import * as tc from '../../../../typechain-types';
import { Box, Text } from '@chakra-ui/react';
import Tag from '@/components/Tag';
import Paginator from '../Paginator';

type BlockchainProposal = { id: string; state: ProposalState };
type BlockchainProposalMap = { [hash: string]: BlockchainProposal };

const Properties = () => {

  return (
    <Box marginTop="20px" marginBottom="20px" width="80%">
      <Paginator />
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
      <Paginator />
    </Box>
  );
};

export default Properties;
