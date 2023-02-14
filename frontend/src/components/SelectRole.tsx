import { color, Select, Tooltip } from '@chakra-ui/react';
import { Role, buildRoles } from '@/utils/roles';
import { ethers } from 'ethers';

type SelectRoleProps = {
  disabled?: boolean
  isValid?: boolean
  tooltip?: string
  value: string
  width?: string
  onChange: (role: Role) => void
}

const invalidProps = { borderColor: "red", color: "red" }
const roles = buildRoles(ethers)

/**
 * Component that displays a role ID in a dropdown menu.
 */
const SelectRole = (props: SelectRoleProps) => {
  const select =     
    <Select
      placeholder="-"
      bg="white"
      {...(props.isValid===false ? invalidProps : {})}
      borderWidth={1}
      value={props.value}
      width="9rem"
      onChange={e => props.onChange(roles.rolesById[e.target.value])}
      disabled={props.disabled}
    >
      {roles.rolesArray.map((r: Role) => (<option key={r.id} value={r.id}>{r.friendlyName}</option>))}
    </Select>

  return props.tooltip 
    ? <Tooltip label={props.tooltip}>
        {select}
      </Tooltip> 
    : select
  }

export default SelectRole