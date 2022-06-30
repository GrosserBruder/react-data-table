import { ReactNode, ThHTMLAttributes, useRef, useState, useCallback } from "react";
import { SORT_VALUES } from '../../const'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectProps, SelectChangeEvent } from '@mui/material/Select';
import '../styles/HeadCell.scss';

export type SelectListProps = SelectProps & {
  list: Array<>
  onChagne?: (value: string) => void,
};

export function SelectList(props: SelectListProps) {
  <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label" size="small">Age</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      // value={age}
      label="Age"
      onChange={onSortHandler}
      size="small"
    >
      <MenuItem value={undefined}>Не выбрано</MenuItem>
      <MenuItem value={SORT_VALUES.ASC}>По возрастанию</MenuItem>
      <MenuItem value={SORT_VALUES.DESC}>По убыванию</MenuItem>
    </Select>
  </FormControl>
}


export default SelectList;