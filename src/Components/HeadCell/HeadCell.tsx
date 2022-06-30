import { ReactNode, ThHTMLAttributes, useRef, useState } from "react";
import classnames from 'classnames';
import Cell from "@grossb/react-table/dist/Cell";
import { IconButton, Popover } from "@mui/material";
import SearchField from "../SearchField/SearchField";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import FilterAlt from "@mui/icons-material/FilterAlt";
import ArrowDownward from "@mui/icons-material/ArrowDownward"
import ArrowUpward from "@mui/icons-material/ArrowUpward"

import { SORT_VALUES } from '../../const'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import '../styles/HeadCell.scss';

export type HeadCellProps = ThHTMLAttributes<HTMLElement>
  & {
    children?: ReactNode,
    searchable?: boolean,
    sortable?: boolean,
    onSearch?: (value: string) => void,
    initialSearchValue?: string,
    initialSort?: string,
    width?: number
  };

export function HeadCell(props: HeadCellProps) {
  const { children, searchable, onSearch, initialSearchValue, initialSort, sortable, ...rest } = props;
  const cellRef = useRef<HTMLTableCellElement | null>(null);
  const className = classnames('head-cell', props.className)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const toggleSearch = (event: any) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSearchHandler = (value: any) => {
    if (!cellRef.current) return;
    onSearch?.(value);
  }

  return <Cell ref={cellRef} component="th" {...rest} className={className}>
    <div className="head-cell__content">
      <div className="head-cell__children">{children}</div>
      <div className="head-cell__filters">
        {searchable && (
          <IconButton onClick={toggleSearch}>
            {initialSearchValue ? <FilterAlt /> : <FilterAltOutlined />}
          </IconButton>
        )}
        {sortable && (
          <IconButton onClick={toggleSearch}>
            {initialSort === SORT_VALUES.DESC ? <ArrowDownward /> : <ArrowUpward />}
          </IconButton>
        )}
      </div>
      <Popover
        disablePortal
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <SearchField
          autoFocus
          withoutButton
          onSearch={onSearchHandler}
          initialValue={initialSearchValue}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" size="small">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            // onChange={handleChange}
            size="small"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Popover>
    </div>
  </Cell >
}


export default HeadCell;