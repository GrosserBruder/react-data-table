import { ReactNode, ThHTMLAttributes, useRef, useState, useCallback } from "react";
import classnames from 'classnames';
import Cell from "@grossb/react-table/dist/Cell";
import { IconButton } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert"
import Filter, { FilterValue } from "../Filter/Filter";
import FilterContainer from "../Filter/FilterContainer";
import { isEmptyDeep } from "../../utils"
import '../styles/HeadCell.scss';

export type HeadCellProps = ThHTMLAttributes<HTMLElement>
  & {
    children?: ReactNode,
    filterable?: boolean,
    width?: number,
    columnValue?: any;
    initialFilters?: FilterValue | undefined,
    onFilterChange?: (value: FilterValue) => void,
  };

export function HeadCell(props: HeadCellProps) {
  const { children, filterable, onFilterChange: onFilterChangeProps, columnValue, initialFilters, ...rest } = props;
  const className = classnames('head-cell', props.className)
  const filterButtonRef = useRef(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [isFilterSetted, setIsFilterSetted] = useState<boolean>(false);

  const toggleFilters = useCallback((event: any) => {
    setIsPopoverOpen((x) => !x)
  }, [])

  const handleClose = useCallback(() => {
    setIsPopoverOpen(false);
  }, [])

  const filtrationButtonClassName = classnames({
    "filtration-button--setted": isFilterSetted
  })

  const onFilterChangeHandler = useCallback((x: FilterValue) => {
    setIsFilterSetted(!isEmptyDeep(x))
    onFilterChangeProps?.(x)
  }, [])

  return <Cell component="th" {...rest} className={className}>
    <div className="head-cell__content">
      <div className="head-cell__children">{children}</div>
      <div className="head-cell__filters">
        {filterable && (
          <IconButton
            ref={filterButtonRef}
            onClick={toggleFilters}
            className={filtrationButtonClassName}
          >
            <MoreVert />
          </IconButton>
        )}
      </div>
      <FilterContainer
        className="head-cell__popper"
        disablePortal
        open={isPopoverOpen}
        anchorEl={filterButtonRef?.current}
        onClose={handleClose}
      >
        <Filter
          columnValue={columnValue}
          onFilterChange={onFilterChangeHandler}
          initialFilters={initialFilters}
        />
      </FilterContainer>
    </div>
  </Cell >
}


export default HeadCell;