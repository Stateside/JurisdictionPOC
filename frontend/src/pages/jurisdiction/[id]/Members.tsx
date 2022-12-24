import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Button, HStack, Input, VStack } from '@chakra-ui/react';
import { accountsByAddress } from '@/utils/accounts';
import DeleteIcon from '@/components/icons/deleteIcon';

import * as tc from '../../../../typechain-types';
import * as roles from '../../../utils/roles';
import { useRouter } from 'next/router';

type Role = {
  name: string;
  id: string;
};

type MemberInfo = {
  name: string;
  account: string;
  role: Role;
};

const Members = () => {
  const [localError, setLocalError] = useState<string>('');
  const { library } = useWeb3React();
  const [members, setMembers] = useState<MemberInfo[]>([]);
  const [jscCabinet, setJSCCabinet] = useState<tc.IJSCCabinet | undefined>(undefined);
  const [jscJurisdiction, setJSCJurisdiction] = useState<tc.IJSCJurisdiction | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (library && router.query.id)
      try {
        setJSCJurisdiction(
          tc.IJSCJurisdiction__factory.connect(
            router.query.id as string,
            library
          )
        );
      } catch (err) {
        setLocalError(err as string);
      }
  }, [library, router.query.id]);

  useEffect(() => {
    if (library && jscJurisdiction) {
      const connect = async () => {
        try {
          setJSCCabinet(
            tc.IJSCCabinet__factory.connect(
              await jscJurisdiction.getAddressParameter('jsc.contracts.cabinet'),
              library
            )
          );
        } catch (err) {
          setLocalError(err as string);
        }
      }
      connect()
    }
  }, [library, jscJurisdiction]);

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
              name: accountsByAddress[acc.toLowerCase()].name,
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

  return (
    <VStack alignItems="flex-start">
      {members.map((member: MemberInfo) => {
        return (
          <HStack width="100%" key={member.account}>
            <Input width="20%" value={member.name} onChange={() => {}}/>
            <Input width="40%" value={member.account} onChange={() => {}}/>
            <Input width="20%" value={member.role.name} onChange={() => {}}/>
            <Button width="20%" rightIcon={<DeleteIcon height={7} width={7} />}>
              Remove
            </Button>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default Members;