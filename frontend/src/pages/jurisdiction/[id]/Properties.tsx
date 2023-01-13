import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ProposalState } from '@/utils/types';
import * as tc from '../../../../typechain-types';
import { Box, Button, Divider, Text } from '@chakra-ui/react';
import Tag from '@/components/Tag';
import Paginator from '../Paginator';

type BlockchainProposal = { id: string; state: ProposalState };
type BlockchainProposalMap = { [hash: string]: BlockchainProposal };

const Properties = () => {

  const [tokens, setTokens] = useState([
    '001 - 456 - 87654 - E',
    '001 - 456 - 87654 - E',
    '001 - 456 - 87654 - E',
    '001 - 456 - 87654 - E',
    '001 - 456 - 87654 - E'
  ]);

  return (
    <>
      <Box mt="10px" mb="20px">
        <Button variant="Header">Add New Property Tokens</Button>
      </Box>
      <Divider />
      <Box marginTop={`${tokens.length > 12 ? '20px' : '40px'}`} marginBottom="20px" width="70%">
        {tokens.length > 12 && <Paginator />}

        {tokens.map((t, i) => {
          return (
            <Tag>
              <Text variant={'15/20'} key={i}>
                {t}
              </Text>
            </Tag>
          );
        })}

        {tokens.length > 12 && <Paginator />}
      </Box>
    </>
  );
};

export default Properties;
