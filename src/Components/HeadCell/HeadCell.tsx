import { ReactNode, ThHTMLAttributes, useRef, useState, useCallback, FC, ReactElement, useMemo } from "react";
import classnames from 'classnames';
import Cell from "@grossb/react-table/dist/Cell";
import { IconButton } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert"
import { FilterContainerProps } from "../../Filter/FilterContainer";
import '../styles/HeadCell.scss';

export type HeadCellProps = ThHTMLAttributes<HTMLElement>
  & {
    children?: ReactNode,
    filterable?: boolean,
    width?: number,
    filter?: ReactElement
    filterContainer?: FC<FilterContainerProps>
  };

export function HeadCell(props: HeadCellProps) {
  const { children, filterable, filter, filterContainer, ...rest } = props;
  const className = classnames('head-cell', props.className)
  const filterButtonRef = useRef(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const toggleFilters = useCallback((event: any) => {
    setIsPopoverOpen((x) => !x)
  }, [])

  const handleClose = useCallback(() => {
    setIsPopoverOpen(false);
  }, [])

  const filtrationButtonClassName = classnames({
    // "filtration-button--setted": isFilterSetted
  })

  const filterContainerProps: FilterContainerProps = useMemo(() => ({
    className: "head-cell__popper",
    disablePortal: true,
    open: isPopoverOpen,
    anchorEl: filterButtonRef?.current,
    onClose: handleClose,
    children: filter
  }), [isPopoverOpen, filterButtonRef, handleClose, filter])

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
      {filterContainer?.(filterContainerProps)}
    </div>
  </Cell >
}


export default HeadCell;