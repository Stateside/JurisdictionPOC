import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Box, Button, CircularProgress, Divider, HStack, Input, Text, VStack } from '@chakra-ui/react';
import DeleteIcon from '@/components/icons/deleteIcon';

import * as tc from '../../../../typechain-types';
import { buildRoles } from '../../../utils/roles';
import { useRouter } from 'next/router';
import { useAliases } from '@/store/useAliases';
import { ethers } from 'ethers';
import { useJurisdictions } from '@/store/useJurisdictions';
import PersonAddIcon from '@/components/icons/personAddIcon';

const LoadingIcon = () => <CircularProgress isIndeterminate size="1.3em" color='brand.java'/>

type Role = {
  name: string;
  id: string;
};

type MemberInfo = {
  name: string;
  account: string;
  role: Role;
};

const roles = buildRoles(ethers);

const Members = () => {
  const bcRoles : {[key: string]: string} = {
    JUDICIAL_ROLE: 'Judicial',
    LEGISLATIVE_ROLE: 'Legislative',
    EXECUTIVE_ROLE: 'Executive',
  }
  const [localError, setLocalError] = useState<string>('');
  const { library } = useWeb3React();
  const [members, setMembers] = useState<MemberInfo[]|undefined>();
  const [jscCabinet, setJSCCabinet] = useState<tc.IJSCCabinet | undefined>(undefined);
  const { aliasesByAddress, loaded:aliasesLoaded } = useAliases()
  const router = useRouter();

  // First load jurisdiction, then Cabinet, then members...
  // If this page was saved as a bookmark, then none of the above may be loaded yet.

  const jurisdictionAddress = router.query.id as string;
  const { loaded:jurisdictionsLoaded, loadContracts } = useJurisdictions();
  const jscCabinetAddress = useJurisdictions(state => state.contracts[jurisdictionAddress]?.byName['jsc.contracts.cabinet']?.address)

  useEffect(() => {
    if (jurisdictionsLoaded && jscCabinet === undefined) {
      loadContracts(jurisdictionAddress, library);
    }
  }, [jurisdictionAddress, jurisdictionsLoaded, jscCabinet, library]);

  // Connect to the JSC Cabinet contract
  useEffect(() => {
    if (library && jscCabinetAddress) {
      const connect = async () => {
        try {
          setJSCCabinet(
            tc.IJSCCabinet__factory.connect(
              jscCabinetAddress,
              library
            )
          );
        } catch (err) {
          setLocalError(err as string);
        }
      }
      connect()
    }
  }, [library, jscCabinetAddress]);

  // Load the members from the cabinet contract
  useEffect(() => {
    if (jscCabinet) {
      const loadData = async () => {
        let _members: MemberInfo[] = [];
        const roleCount = (await jscCabinet.getRoleCount()).toNumber();
        for (let r = 0; r < roleCount; r++) {
          const roleId = await jscCabinet.getRoleAt(r);
          const roleName = roles.rolesById[roleId.toLowerCase()].name;
          const roleMemberCount = (
            await jscCabinet.getRoleMemberCount(roleId)
          ).toNumber();
          for (let rm = 0; rm < roleMemberCount; rm++) {
            const acc = await jscCabinet.getRoleMember(roleId, rm);
            _members.push({
              name: "",
              account: acc,
              role: {
                name: roleName,
                id: roleId,
              },
            });
          }
        }
        setMembers(_members);
      }
      loadData().catch(err => setLocalError(err));
    }
  }, [jscCabinet]);

  // Display aliases for known addresses in cabinet
  useEffect(() => {
    if (members && members.length>0 && aliasesLoaded) {
        const _members = [...members]
        let changed = false
        for (let i = 0; i < _members.length; i++) {
          const member = _members[i]
          const aliasInfo = aliasesByAddress[member.account.toLowerCase()]
          if (aliasInfo && member.name != aliasInfo.alias) {
            member.name = aliasInfo.alias
            changed = true
          }
        }
        if (changed)
          setMembers(_members)
      }
  }, [members, aliasesByAddress, aliasesLoaded])

  return (
    <VStack alignItems="flex-start" width="100%">
      {members &&
        members.length > 0 &&
        members.map((member: MemberInfo) => {
          return (
            <Box key={member.account} width="100%">
              <HStack width="100%" m="1em 0">
                <Text width="20%">{member.name}</Text>
                <Text width="45%">{member.account}</Text>
                <Text width="20%">{bcRoles[member.role.name]}</Text>
                <Button width="15%"
                  variant="Transparent"
                  rightIcon={<DeleteIcon height={7} width={7} />}
                  onClick={() => router.push(`${jurisdictionAddress}/proposal/create?p=jsc.contracts.cabinet/RemoveMemberRole/${member.account}`)}
                >
                  Remove
                </Button>
              </HStack>
              <Divider />
            </Box>
          );
        })}
      {members && members.length === 0 && <Text>No information available</Text>}
      {!members && <LoadingIcon />}
      <HStack style={{marginTop: "30px"}} width="100%">
        <Button
          rightIcon={<PersonAddIcon height={5} width={5} />}
          variant="Heading"
          onClick={() => router.push(`${jurisdictionAddress}/proposal/create?p=jsc.contracts.cabinet/AddMember`)}
        >
          Add new member
        </Button>
\      </HStack>
    </VStack>
  );
};

export default Members;
