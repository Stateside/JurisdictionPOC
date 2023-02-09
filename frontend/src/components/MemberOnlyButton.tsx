import { Button, Tooltip } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useJurisdictions } from '@/store/useJurisdictions';
import { useEffect, useState } from 'react';
import { useCabinets } from '@/store/useCabinets';

type Props = {
  hideIfDisabled?: boolean
  [key: string]: any
}

/**
 * Component that displays a button which is enable only if the user is a member of the current jurisdiction.
 */
const MemberOnlyButton = (props: Props) => {
  const { account, library } = useWeb3React();
  const router = useRouter();

  // First load jurisdiction, then Cabinet...

  const jurisdictionAddress = (router.query.id as string)?.toLowerCase();
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

  const tooltip = props.tooltip || (userIsMember ? '' : 'You must be a member to use this feature')
  const disabled = props.disabled || !userIsMember
  const display = disabled && props.hideIfDisabled===true ? 'none' : 'flex'

  return tooltip ? 
    <Tooltip label={tooltip}>
      <Button {...props} disabled={disabled} display={display}/>
    </Tooltip> : 
    <Button {...props} disabled={disabled}/>
}

export default MemberOnlyButton