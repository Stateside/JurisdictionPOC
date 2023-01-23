import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Box, Button, CircularProgress, Divider, HStack, Input, Text, VStack } from '@chakra-ui/react';
import DeleteIcon from '@/components/icons/deleteIcon';

import { buildRoles } from '@/utils/roles';
import { useRouter } from 'next/router';
import { useAliases } from '@/store/useAliases';
import { ethers } from 'ethers';
import { useJurisdictions } from '@/store/useJurisdictions';
import PersonAddIcon from '@/components/icons/personAddIcon';
import { useCabinets } from '@/store/useCabinets';
import MemberOnlyButton from '@/components/MemberOnlyButton';

const LoadingIcon = () => <CircularProgress isIndeterminate size="1.3em" color='brand.java'/>

const roles = buildRoles(ethers);

const Members = () => {
  const { account, library } = useWeb3React();
  const { aliasesByAddress } = useAliases()
  const router = useRouter();

  // First load jurisdiction, then Cabinet, then members...
  // If this page was saved as a bookmark, then none of the above may be loaded yet.

  const jurisdictionAddress = router.query.id as string;
  const { loaded:jurisdictionsLoaded, loadContracts } = useJurisdictions();
  const jscCabinetAddress = useJurisdictions(state => state.contracts[jurisdictionAddress]?.byName['jsc.contracts.cabinet']?.address?.toLowerCase())
  const loadCabinet = useCabinets(state => state.get)
  const cabinet = useCabinets(state => state.cabinets[jscCabinetAddress])
  const members = cabinet?.members
  const [ isMember, setIsMember ] = useState(false)

  // Load jurisdiction contracts...
  useEffect(() => {
    if (jurisdictionsLoaded && jscCabinetAddress === undefined) {
      loadContracts(jurisdictionAddress, library);  // Does nothing if currently loading or already loaded
    }
  }, [jurisdictionAddress, jurisdictionsLoaded, jscCabinetAddress, library]);

  // Load cabinet details...
  useEffect(() => {
    if (cabinet === undefined)
      loadCabinet(jscCabinetAddress, library);  // Does nothing if currently loading or already loaded
  }, [cabinet, jscCabinetAddress, library]);

  // Load cabinet members...
  useEffect(() => {
    if (cabinet)
      cabinet.loadMembers(); // Does nothing if currently loading or already loaded
  }, [cabinet]);

  useEffect(() => {
    if (cabinet && account)
      cabinet?.isMember(account).then(res => res !== undefined && setIsMember(res))
  }, [cabinet, account])

  return (
    <VStack alignItems="flex-start" width="100%">
      {members &&
        members.length > 0 &&
        members.map(member => {
          return (
            <Box key={member.account} width="100%">
              <HStack width="100%" m="1em 0">
                <Text width="20%">{aliasesByAddress?.[member.account.toLowerCase()]?.alias || ""}</Text>
                <Text width="45%">{member.account}</Text>
                <Text width="20%">{roles.rolesById[member.role].friendlyName}</Text>
                <MemberOnlyButton width="15%"
                  variant="Transparent"
                  rightIcon={<DeleteIcon height={7} width={7} />}
                  onClick={() => router.push(`${jurisdictionAddress}/proposal/create?p=jsc.contracts.cabinet/RemoveMemberRole&account=${member.account}`)}
                >
                  Remove
                </MemberOnlyButton>
              </HStack>
              <Divider />
            </Box>
          );
        })}
      {cabinet && cabinet.membersLoaded && members.length === 0 && <Text>No information available</Text>}
      {!members && <LoadingIcon />}
      <HStack style={{marginTop: "30px"}} width="100%">
        <MemberOnlyButton
          rightIcon={<PersonAddIcon height={5} width={5} />}
          variant="Heading"
          onClick={() => router.push(`${jurisdictionAddress}/proposal/create?p=jsc.contracts.cabinet/AddMember`)}
        >
          Add new member
        </MemberOnlyButton>
      </HStack>
    </VStack>
  );
};

export default Members;
