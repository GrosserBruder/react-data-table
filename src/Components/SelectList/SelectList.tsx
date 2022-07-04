import { ReactNode, useCallback } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectProps, SelectChangeEvent } from '@mui/material/Select';
import '../styles/SelectList.scss';

export type SelectListItem = {
  id: string,
  value: ReactNode,
}

export type SelectListProps = Omit<SelectProps, "onChange"> & {
  list: Array<SelectListItem>
  onChange?: (value: SelectListItem) => void,
  defaultValue?: SelectListItem,
};

export function SelectList(props: SelectListProps) {
  const {
    defaultValue, list, onChange, label, labelId = "select-list-label-id", fullWidth = true, ...restProps
  } = props;

  const onChangeHandler = useCallback((event: SelectChangeEvent<unknown>) => {
    const value = list.find((x) => x.id === event.target.value)

    if (!value) {
      throw new Error(`value is not find in list. value = ${event.target.value}`)
    };

    onChange?.(value)
  }, [list, onChange])

  return <FormControl fullWidth={fullWidth}>
    <InputLabel id={labelId} size="small">{label}</InputLabel>
    <Select
      labelId={labelId}
      defaultValue={defaultValue?.id}
      label={label}
      size="small"
      onChange={onChangeHandler}
      fullWidth={fullWidth}
      className="select-list"
      {...restProps}
    >
      {
        list.map((x) => <MenuItem key={x.id} value={x.id}>{x.value}</MenuItem>)
      }
    </Select>
  </FormControl>
}


export default SelectList;