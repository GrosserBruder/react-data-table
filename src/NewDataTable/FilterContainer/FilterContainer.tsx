import MoreVert from "@mui/icons-material/MoreVert";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import classnames from "classnames";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getColumnKey } from "../../utils";
import useDataTableContext from "../Context/DataTableContext/useDataTableContext";
import FilterContainerProvider from "../Context/FilterContainerContext/FilterContainerProvider";
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
    const columnKey = getColumnKey(column)

    if (columnKey === undefined) return false;

    return dataTableContext.filters.has(columnKey)
  }, [column, dataTableContext.filters])

  const togglePopover = useCallback((event: any) => {
    event.stopPropagation()

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

  // в HeadCell есть коллбэк на нажатие на ячейку
  // но при нажатии на элемент внутри Popper
  // коллбэк в HeadCell тоже вызывается
  // данная функция блокирует всплытие события
  const stopPropagation = useCallback((event: any) => {
    event.stopPropagation()
  }, [])

  const popperClassName = classnames("data-table__filter-container__popper", className)

  // в children находиться форма для установки фильтров
  // если ее нет, то не выводим кнопку для открытия формы
  if (!children) return <></>

  return <FilterContainerProvider
    column={column}
    onAccepte={dataTableContext.setFilter}
    onReset={dataTableContext.removeFilter}
    filters={dataTableContext.getFilterByFieldKey(column.id ?? column.dataField)}
  >
    <div className="filter-container" onClick={stopPropagation}>
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
  </FilterContainerProvider>
}