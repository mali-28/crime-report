import { InputLabel, FormControl, MenuItem, Select} from '@mui/material';

const DropDown = (props) => {
    return <>
        <FormControl variant={props.variant || "standard"} sx={props.style}>
            {props.id ? <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel> : <></>}
            <Select

                labelId={`${props.id || "anonymous"}-label`}
                id={props.id || "id"}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                label={props.label}
            >
                {props.arr?.map((val, id) => {
                    return <MenuItem key={id} value={val} className="text-capitalize">{val}</MenuItem>

                })}

            </Select>
        </FormControl>
    </>
}
export default DropDown;