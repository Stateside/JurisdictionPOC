import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ProposalState } from '@/utils/types';
import { PreparedProposal } from '@/utils/proposals';
import { createSampleProposals } from '@/utils/sample-proposals';
import * as tc from '../../../../typechain-types';
import { Box, Button, HStack, Select, Text, VStack } from '@chakra-ui/react';
import Tag from '@/components/Tag';

type PreparedProposalMap = { [hash: string]: PreparedProposal };
type BlockchainProposal = { id: string; state: ProposalState };
type BlockchainProposalMap = { [hash: string]: BlockchainProposal };

const Proposals = () => {
  const [localError, setLocalError] = useState<string>('');
  const { active, account, library, error } = useWeb3React();
  const [jscJurisdiction, setJSCJurisdiction] = useState<
    tc.IJSCJurisdiction | undefined
  >(undefined);
  const [jscGovernor, setJSCGovernor] = useState<tc.IJSCGovernor | undefined>(
    undefined
  );
  const [sampleProposals, setSampleProposals] = useState<PreparedProposalMap>(
    {}
  );
  const [jscCabinet, setJSCCabinet] = useState<tc.IJSCCabinet | undefined>(
    undefined
  );
  const [jscTitleToken, setJSCTitleToken] = useState<
    tc.IJSCTitleToken | undefined
  >(undefined);
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
    const getJurisdictionAddress = async () => {
      try {
        if (jscGovernor)
          setJSCJurisdiction(
            tc.IJSCJurisdiction__factory.connect(
              await jscGovernor.getJurisdiction(),
              library
            )
          );
      } catch (err) {
        setLocalError(err as string);
      }
    };
    if (library && jscGovernor)
      getJurisdictionAddress().catch(err => setLocalError(err.toString()));
  }, [library, jscGovernor]);

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

  useEffect(() => {
    const loadSampleProposals = async () => {
      if (jscGovernor && jscCabinet && jscTitleToken) {
        const sp = await createSampleProposals(
          jscGovernor,
          jscCabinet,
          jscTitleToken
        );
        const proposalMap: { [hash: string]: PreparedProposal } = {};
        for (let i = 0; i < sp.length; i++) {
          const p = sp[i];
          proposalMap[p.proposalHash.toHexString().toLowerCase()] = p;
        }
        setSampleProposals(proposalMap);
      }
    };
    loadSampleProposals().catch(err => setLocalError(err.toString()));
  }, [jscGovernor, jscCabinet, jscTitleToken]);

  useEffect(() => {
    const getAddresses = async () => {
      if (library && jscJurisdiction)
        try {
          setJSCCabinet(
            tc.IJSCCabinet__factory.connect(
              (await jscJurisdiction.getContractAddress(
                'jsc.contracts.cabinet'
              )) as string,
              library
            )
          );
          setJSCTitleToken(
            tc.IJSCTitleToken__factory.connect(
              (await jscJurisdiction.getContractAddress(
                'jsc.contracts.tokens'
              )) as string,
              library
            )
          );
        } catch (err) {
          setLocalError((err as any).toString());
        }
    };
    getAddresses().catch(err => setLocalError(err.toString()));
  }, [library, jscJurisdiction]);

  return (
    <HStack alignItems="flex-start">
      <VStack width={'80%'} marginRight={'10%'} alignItems="flex-start">
        <Text variant={'15/20-BOLD'}>Active proposals</Text>
        <Box width={'100%'}>
          {Object.keys(jscProposals).map(proposal => {
            const cProposal = jscProposals[proposal];
            return (
              !!cProposal.state && <Tag>
                <Text variant={'15/20'}>
                  {sampleProposals[proposal]?.description || 'unknown'}
                </Text>
              </Tag>
            );
          })}
        </Box>
        <Text variant={'15/20-BOLD'}>Closed proposals</Text>
        <Box width={'100%'}>
          {Object.keys(jscProposals).map(proposal => {
            const cProposal = jscProposals[proposal];
            return (
              !cProposal.state && (
                <Tag>
                  <Text variant={'15/20'}>
                    {sampleProposals[proposal]?.description || 'unknown'}
                  </Text>
                </Tag>
              )
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
