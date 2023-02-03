import { Box } from "@chakra-ui/react"
import { Select, CreatableSelect } from "chakra-react-select";



export default function SpecialSelect(props: { width: any, value: any, options: any, onChange: (newValue: object) => void }) {
    const selectOptions = Object.values(props.options);
    const addressesForSelect = selectOptions.map((element: any) => {
        const { address, alias } = element;
        return {
            label: alias,
            value: address,
        }
    })
    const customControlStyles = () => ({ display: 'contents' });

    return (
        
        <Box w={props.width ? props.width : "100%"}>
            <CreatableSelect 
                isClearable 
                colorScheme='cyan'
                styles={{ control: customControlStyles }}
                size="md"
                value={props.value}
                defaultValue={props.value}
                options={addressesForSelect}
                onChange={address => {
                    const {label , value} = address || { label: '', value: ''};
                    return props.onChange({ label, value })
                }} />
        </Box>
    )
}