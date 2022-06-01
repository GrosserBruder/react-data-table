import { ReactNode, ThHTMLAttributes, useRef, useState } from "react";
import classnames from 'classnames';
import Cell from "./Cell";
import { IconButton, Popover } from "@mui/material";
// import SearchField from "../SearchField/SearchField";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import FilterAlt from "@mui/icons-material/FilterAlt";

export type HeadCellProps = ThHTMLAttributes<HTMLElement>
  & {
    children?: ReactNode,
    searchable?: boolean,
    onSearch?: (value: string) => void,
    initialSearchValue?: string,
    width?: number
  };

export function HeadCell(props: HeadCellProps) {
  const { children, searchable, onSearch, initialSearchValue, ...rest } = props;
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
    <div>
      {children}
      {searchable && <IconButton onClick={toggleSearch}>
        {initialSearchValue ? <FilterAlt /> : <FilterAltOutlined />}
      </IconButton>
      }
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
        {/* <SearchField
          autoFocus
          withoutButton
          onSearch={onSearchHandler}
          initialValue={initialSearchValue}
        /> */}
      </Popover>
    </div>
  </Cell >
}


export default HeadCell;