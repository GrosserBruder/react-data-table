import MoreVert from "@mui/icons-material/MoreVert";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import classnames from "classnames";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import FilterProvider from "../Context/FilterProvider";
import useDataTableContext from "../Context/useDataTableBodyRowsContext";
import { DataTableColumn } from "../types";

export type FilterContainer = {
  className?: string
  children?: ReactNode
  filter?: ReactNode
  column: DataTableColumn,
}

export function FilterContainer(props: FilterContainer) {
  const { children, className, column } = props;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const filterButtonRef = useRef(null)

  const dataTableContext = useDataTableContext()

  const isFiltersInstalled = useMemo(() => {
    if (column?.id ?? column?.dataField === undefined) return false;

    return dataTableContext.filters.has(column.id ?? column.dataField)
  }, [column, dataTableContext.filters])

  const togglePopover = useCallback(() => {
    setIsPopoverOpen((x) => !x)
  }, [setIsPopoverOpen])

  const onClose = useCallback(() => {
    setIsPopoverOpen(false);
  }, [setIsPopoverOpen])

  const onClickAwayListener = useCallback((event: any) => {
    //workaround for Node as Portal
    if ((event.target as Node).nodeName === "BODY" && event.type === "click") {
      return;
    }
    onClose()
  }, [onClose])

  const onKeyDown = useCallback((event: any) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [onKeyDown])

  const popperClassName = classnames("data-table__filter-container__popper", className)

  const onAccepte = useCallback(() => { }, [])
  const onReset = useCallback(() => { }, [])

  // в children находиться форма для установки фильтров
  // если ее нет, то не выводим кнопку для открытия формы
  if (!children) return <></>

  return <FilterProvider
    column={column}
    onAccepte={onAccepte}
    onReset={onReset}
  >
    <div className="filter-container">

      <Badge
        color="secondary"
        badgeContent={" "}
        invisible={!isFiltersInstalled}
        overlap="circular"
        variant="dot"
      >
        <IconButton
          ref={filterButtonRef}
          onClick={togglePopover}
        >
          <MoreVert />
        </IconButton>
      </Badge>

      <Popper
        className={popperClassName}
        disablePortal
        open={isPopoverOpen}
        anchorEl={filterButtonRef?.current}
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={onClickAwayListener}>
          <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
            {children}
          </Box>
        </ClickAwayListener>
      </Popper>
    </div>
  </FilterProvider>
}