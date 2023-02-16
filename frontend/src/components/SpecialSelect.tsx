import { Box } from "@chakra-ui/react"
import { Select, CreatableSelect } from "chakra-react-select";



export default function SpecialSelect(props: { width: any, value: any, options: any, onChange: (newValue: object|undefined) => void }) {
    const selectOptions = Object.values(props.options);
    const addressesForSelect = selectOptions.map((element: any) => {
        const { address, alias } = element;
        return {
            label: alias,
            value: address,
        }
    })

    return (
        
        <Box w={props.width ? props.width : "100%"}>
            <CreatableSelect 
                placeholder="-"
                isClearable
                size="md"
                value={props.value}
                options={addressesForSelect}
                onChange={(address:any) => {
                    if (address) {
                        const {label , value} = address || { label: '', value: ''};
                        return props.onChange({ label, value })
                    }
                    else
                        return props.onChange(undefined)
                }} />
        </Box>
    )
}