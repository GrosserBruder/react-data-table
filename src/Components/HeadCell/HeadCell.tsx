import { ReactNode, ThHTMLAttributes, useRef, useState, useCallback } from "react";
import classnames from 'classnames';
import Cell from "@grossb/react-table/dist/Cell";
import { IconButton, Popover } from "@mui/material";
import SearchField from "../SearchField/SearchField";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import FilterAlt from "@mui/icons-material/FilterAlt";
import MoreVert from "@mui/icons-material/MoreVert"

import { SORT_VALUES } from '../../const'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import '../styles/HeadCell.scss';

export type HeadCellProps = ThHTMLAttributes<HTMLElement>
  & {
    children?: ReactNode,
    filtration?: boolean,
    onSearch?: (value: string) => void,
    onSort?: (value: string) => void,
    initialSearchValue?: string,
    initialSort?: string,
    width?: number
  };

export function HeadCell(props: HeadCellProps) {
  const { children, filtration, onSearch, onSort, initialSearchValue, initialSort, ...rest } = props;
  const className = classnames('head-cell', props.className)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const toggleFilters = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl])

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl])

  const onSearchHandler = useCallback((value: any) => {
    onSearch?.(value);
  }, [onSearch])

  const onSortHandler = useCallback((value: any) => {
    console.log()
    onSort?.(value);
  }, [onSearch])

  return <Cell component="th" {...rest} className={className}>
    <div className="head-cell__content">
      <div className="head-cell__children">{children}</div>
      <div className="head-cell__filters">
        {filtration && (
          <IconButton onClick={toggleFilters}>
            <MoreVert />
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
          horizontal: 'right',
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
            onChange={onSortHandler}
            size="small"
          >
            <MenuItem value={undefined}>Не выбрано</MenuItem>
            <MenuItem value={SORT_VALUES.ASC}>По возрастанию</MenuItem>
            <MenuItem value={SORT_VALUES.DESC}>По убыванию</MenuItem>
          </Select>
        </FormControl>
      </Popover>
    </div>
  </Cell >
}


export default HeadCell;