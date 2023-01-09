import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { Heading, Box } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Container, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { jscCabinetLabels } from '@/store/initial'
import { useWeb3React } from "@web3-react/core";
import * as tc from "../../../typechain-types"
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import { buildRoles } from "../../utils/roles"
import { accountsByAddress } from '@/utils/accounts'
import { getAccountShortName } from '@/utils/util'
import { ethers } from 'ethers'

type CabinetRole = {
  name: string
  id: string
}

type CabinetMember = {
  name: string
  account: string
  role: CabinetRole
}

const showJSCCabinet: NextPage = () => {
  const [localError, setLocalError] = useState<string>("")
  const { active, account, library, error } = useWeb3React();
  const router = useRouter()
  const [members, setMembers] = useState<CabinetMember[]>([])

  const [jscCabinet, setJSCCabinet] = useState<tc.IJSCCabinet|undefined>(undefined)
  const lastError = useMemo(() => localError || error?.cause as unknown as string, [localError, error])

  useEffect(() => {
    if (library && router.query.address)
      try {
        setJSCCabinet(tc.IJSCCabinet__factory.connect(router.query.address as string, library))
      } catch(err) {
        setLocalError(err as string)
      }
  }, [library, router.query.address])

  useEffect(() => {
    if (jscCabinet) {
      const loadData = async () => {
        let _members:CabinetMember[] = []
        const roles = buildRoles(ethers)
        const roleCount = (await jscCabinet.getRoleCount()).toNumber();
        for (let r = 0; r < roleCount; r++) {
          const roleId = await jscCabinet.getRoleAt(r);
          const roleName = roles.rolesById[roleId.toLowerCase()].name
          const roleMemberCount = (await jscCabinet.getRoleMemberCount(roleId)).toNumber();
          for (let rm = 0; rm < roleMemberCount; rm++) {
            const acc = await jscCabinet.getRoleMember(roleId, rm);
            _members.push({
              name: accountsByAddress[acc.toLowerCase()].name,
              account: acc,
              role: {
                name: roleName,
                id: roleId
              }
            })
          }
        }
        setMembers(_members)
      }
      loadData().catch(err => setLocalError(err))
    }
  }, [jscCabinet])

  return (
    <Box width='100%' >
      <Head>
        <title>{jscCabinetLabels.pageTitle}</title>
      </Head>
        {active &&
          <VStack padding='2rem 0' margin='0 0 40px 0'>
            <Heading
              whiteSpace='pre-line'
              my={4}
              marginBottom='48px'>
              {jscCabinetLabels.heading}
            </Heading>
            <Container
                display='flex'
                width='100%'
                flexDirection='row'
                justifyContent='flex-start'
                maxWidth={'100%'}
                padding='0'>
                  {lastError ?
                    <Alert status='error'>
                      <AlertIcon />
                      <AlertTitle>Error!</AlertTitle>
                      <AlertDescription>{lastError}</AlertDescription>
                    </Alert> :
                  (members.length == 0 ? <Loader /> : 
                    <TableContainer whiteSpace={'normal'}>
                      <Table variant='simple'>
                        <TableCaption>{jscCabinetLabels.tableCaption}</TableCaption>
                        <Thead>
                          <Tr>
                            <Th>Name</Th>
                            <Th>Account</Th>
                            <Th flexWrap={'wrap'}>Role</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {members.map(m => 
                            <Tr key={m.account+m.role.id}>
                              <Td>{m.name}</Td>
                              <Td>{getAccountShortName(m.account)}</Td>
                              <Td flexWrap={'wrap'}>{m.role.name || m.role.id}</Td>
                            </Tr>
                          )}
                        </Tbody>
                      </Table>
                    </TableContainer>)}
            </Container>
          </VStack>
          
        }
    </Box>
  )
}

export default showJSCCabinet