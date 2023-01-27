import DeleteIcon from "@/components/icons/deleteIcon";
import { useAliases } from "@/store/useAliases";
import { ParamType } from "@/utils/types";
import { Button, HStack, Input, Select, Switch } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react";

export type Props = {
  name: string
  hint: string
  type: ParamType
  value: string
  width: string
  onChange: (value: string) => void
}

const AliasAndAddress = (props:{value:string, onChange:(newValue:string) => void}) => {
  const { aliasesByAddress, aliasesByName } = useAliases()
  const [alias, setAlias] = useState<string>("")
  const address = props.value || ""

  const updateParent = (newValue:string) => {
    props.onChange(newValue)
  }

  const updateAlias = (newValue:string) => {
    const lcAddress = address.toLowerCase()
    const lcNewValue = newValue.toLowerCase()
    const lcAlias = alias.toLowerCase()
    let expectedAddress:string = aliasesByName[lcAlias]?.address || ""
    let newAddress:string = aliasesByName[lcNewValue]?.address || ""
    if (lcAddress !== "" && lcAddress !== expectedAddress.toLowerCase())
      newAddress = address
    setAlias(newValue)
    if (newAddress?.toLowerCase() !== lcAddress)
      updateParent(newAddress)
  }

  const updateAddress = (newValue:string) => {
    const lcAddress = address.toLowerCase()
    const lcNewValue = newValue.toLowerCase()
    const lcAlias = alias.toLowerCase()
    let expectedAlias:string = aliasesByAddress[lcAddress]?.alias || "" 
    let newAlias:string = aliasesByAddress[lcNewValue]?.alias || ""
    if (lcAlias !== "" && lcAlias !== expectedAlias.toLowerCase())
      newAlias = alias
    setAlias(newAlias)
    updateParent(newValue)
  }

  useEffect(() => {
    const lcAddress = address.toLowerCase()
    if (alias === "" && address != "" && aliasesByAddress[lcAddress]) {
      setAlias(aliasesByAddress[lcAddress]?.alias)
    }
  }, [address, alias, aliasesByAddress])
  
  return (
    <HStack width="100%">
      <Input width="25%" value={alias||""} onChange={e => updateAlias(e.target.value)}/>
      <Input width="75%" value={address||""} onChange={e => updateAddress(e.target.value)}/>
    </HStack>
  )
}

const Parameter = (props:Props) => {
  const controls = useMemo(() => {
    switch(props.type) {
      case ParamType.t_address:
        return (
          <AliasAndAddress value={props.value||""} onChange={address => props.onChange(address)}/>
        )
      case ParamType.t_bool:
        return (
          <Switch isChecked={props.value === "1"} onChange={e => props.onChange(props.value === "1" ? "0" : "1")}/>
        )
      default:
        return (
          <Input value={props.value || ""} onChange={e => props.onChange(e.target.value)}/>
        )
    }
  },[props.type, props.value, props.onChange])

  return (
    <HStack width={props.width}>
      {controls}
    </HStack>
  );
}

export default Parameter