import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import Tag from "@/components/Tag";
import { ArrowBackIcon, CopyIcon } from '@chakra-ui/icons';
import { getAccountShortName } from '@/utils/util';
import accounts from '@/utils/accounts';
import { useCallback, useMemo } from 'react';

const DemoAccounts: NextPage = () => {
  const toast = useToast()
  
  const onCopyAccount = useCallback((account:string) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(account)
        toast({
          title: 'Address Copied',
          description: "The address of this account is now available in your clipboard.",
          status: 'success',
          duration: 3000
        })
    }
  }, [toast])
  
  const onCopyPrivateKey = useCallback((key:string) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(key)
        toast({
          title: 'Private Key Copied',
          description: "The private key for this account is now available in your clipboard.",
          status: 'success',
          duration: 3000
        })
      }
  }, [toast])
  
  const Account = useCallback((props:{address:string, privateKey:string, name:string}) => {
    return (
      <Tag caret={null} disableHover={true}>
        <HStack width="100%">
          <Text width="20%">
            {props.name}
          </Text>
          <Text width="30%">
            {getAccountShortName(props.address, 10, 8)} <IconButton color="ButtonText" ml="2" size="xs" title='Copy Address' icon={<CopyIcon/>} aria-label='Copy Address' onClick={() => onCopyAccount(props.address)} />
          </Text>
          <Text width="30%">
            {getAccountShortName(props.privateKey, 10, 8)}  <IconButton color="ButtonText" ml="2" size="xs" title='Copy Private Key' icon={<CopyIcon/>} aria-label='Copy Private Key' onClick={() => onCopyPrivateKey(props.privateKey)} />
          </Text>
        </HStack>
      </Tag>
    );
  }, [])
  
  return (
    <Box width="100%">
      <Head>
        <title>Sample Accounts</title>
      </Head>
      <Link href="/" display="flex" fontWeight="bold">
        <ArrowBackIcon marginRight="10px" marginTop="5px" />
        <Text>Back to Dashboard</Text>
      </Link>
      <Heading whiteSpace="pre-line" marginBottom="48px" variant="80">
        Sample Accounts
      </Heading>
      <Box width="100%">
        <Tag caret={null}>
          <HStack width="100%">
            <Text width="20%">Name</Text>
            <Text width="30%">Address</Text>
            <Text width="30%">Private Key</Text>
          </HStack>
        </Tag>
        {accounts.map((account) => (<Account key={account.address} {...account} />))}
      </Box>
    </Box>
  );
};

export default DemoAccounts;
