import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Button, CircularProgress, HStack, Input, Text, VStack } from '@chakra-ui/react';
import DeleteIcon from '@/components/icons/deleteIcon';

import * as tc from '../../../../typechain-types';
import { buildRoles } from '../../../utils/roles';
import { useRouter } from 'next/router';
import { useAliases } from '@/store/useAliases';
import { ethers } from 'ethers';
import { useJurisdictions } from '@/store/useJurisdictions';

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
    if (members && members.length>0) {
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
  }, [members, aliasesByAddress])

  return (
    <VStack
      alignItems="flex-start"
      gap="20px"
      marginTop="20px"
      marginBottom="20px"
    >
      {members && members.length > 0 &&
        members.map((member: MemberInfo) => {
          return (
            <HStack width="100%" key={member.account}>
              <Input width="20%" value={member.name} onChange={() => {}} />
              <Input width="40%" value={member.account} onChange={() => {}} />
              <Input width="20%" value={member.role.name} onChange={() => {}} />
              <Button width="20%" rightIcon={<DeleteIcon height={7} width={7} />}>
                Remove
              </Button>
            </HStack>
          );
        })
      }
      {members && members.length === 0 && <Text>No information available</Text>}
      {!members && <LoadingIcon/>}
    </VStack>
  );
};

export default Members;
