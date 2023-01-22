import { getAccountShortName } from '@/utils/util';
import { Button, Tooltip, useDisclosure } from '@chakra-ui/react';
import WalletIcon from '@/components/icons/walletIcon';
import SelectWalletModal from "@/components/Modal";
import useBlockchain from "hooks/useBlockchain";
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useJurisdictions } from '@/store/useJurisdictions';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCabinets } from '@/store/useCabinets';

type Props = {
  [key: string]: any
}

/**
 * Component that connects to MetaMask and displays a button with the account number or "Connect".
 */
const MemberOnlyButton = (props: Props) => {
  const { account, library } = useWeb3React();
  const router = useRouter();

  // First load jurisdiction, then Cabinet...

  const jurisdictionAddress = router.query.id as string;
  const { loaded: jurisdictionsLoaded, loadContracts } = useJurisdictions();
  const jscCabinetAddress = useJurisdictions(state => state.contracts[jurisdictionAddress]?.byName['jsc.contracts.cabinet']?.address?.toLowerCase())
  const loadCabinet = useCabinets(state => state.get)
  const cabinet = useCabinets(state => state.cabinets[jscCabinetAddress])
  const [userIsMember, setUserIsMember] = useState(false)

  // Load jurisdiction contracts...
  useEffect(() => {
    if (jurisdictionsLoaded && jscCabinetAddress === undefined) {
      loadContracts(jurisdictionAddress, library);  // Needed if jurisdiction address is not in the database. Does nothing if currently loading or already loaded
    }
  }, [jurisdictionAddress, jurisdictionsLoaded, jscCabinetAddress, library]);

  // Load cabinet details...
  useEffect(() => {
    if (cabinet === undefined)
      loadCabinet(jscCabinetAddress, library);  // Does nothing if currently loading or already loaded
  }, [cabinet, jscCabinetAddress, library]);

  // Check if current user is a member
  useEffect(() => {
    if (cabinet && account)
      cabinet?.isMember(account).then(res => res !== undefined && setUserIsMember(res))
  }, [cabinet, account])

  const children = props.children
  const propsWithoutChidren = { ...props, children: undefined }

  const tooltip = props.tooltip || (userIsMember ? '' : 'You must be a member to use this feature')

  return tooltip ? 
    <Tooltip label={tooltip}>
      <Button {...props} disabled={props.disabled || !userIsMember}/>
    </Tooltip> : 
    <Button {...props} disabled={props.disabled || !userIsMember}/>
}

export default MemberOnlyButton