import { MouseEventHandler, useCallback, useRef } from "react"
import { Cell } from "@grossb/react-table";
import { Column, ColumnFilterComponent, DataItem, FormProps } from "./DataTable";
import { getColumnId } from "./helpers";
import { SORTING_ORDER } from "./constants/const";
import classnames from "classnames";
import { AllFilterData } from "./hooks/useFiltering";
import FilterContainer, { FilterContainerRenderProps } from "./FilterContainer";
import "./styles/DataTableHeadCell.scss"

export type DataTableHeadCellProps<T extends DataItem> = {
  column: Column<T>
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>, column: Column<T>) => void
  isSorting?: SORTING_ORDER,
  sortable?: boolean,
  allFilterData?: AllFilterData
  filterComponent?: ColumnFilterComponent<T>
  onFilterSubmit?: (column: Column<T>, data: any) => void;
  onFilterReset?: (column: Column<T>) => void;
  filterable?: boolean
}

export function DataTableHeadCell<T extends DataItem>(props: DataTableHeadCellProps<T>) {
  const {
    column, onClick, isSorting, sortable, filterComponent, allFilterData, onFilterReset,
    onFilterSubmit, filterable,
  } = props;

  const cellRef = useRef()

  const onFilterSubmitHandler = useCallback((data: any) => {
    onFilterSubmit?.(column, data)
  }, [column, onFilterSubmit])

  const onFilterResetHandler = useCallback(() => {
    onFilterReset?.(column)
  }, [column, onFilterReset])

  const onClickHandler: MouseEventHandler<HTMLElement> = useCallback((event) => {
    // workaround for filterContainer clickAwaitListener
    if ((event.target as Element).classList.contains("cell__wrapper")) {
      onClick?.(event, column)

      column?.headCellProps?.onClick?.(event)
    }
  }, [onClick, column])

  const className = classnames("data-table-head-cell", column.headCellProps?.className, {
    "sortable": sortable,
    "filterable": filterable,
    "asd-sorting": isSorting === SORTING_ORDER.ASC,
    "desc-sorting": isSorting === SORTING_ORDER.DESC,
  })

  const filter = useCallback(({ onClose }: FilterContainerRenderProps) => {

    const columnId = getColumnId(column)
    const columnFilterData = columnId && allFilterData ? allFilterData[columnId] : undefined

    const formProps: FormProps<T> = {
      column,
      allFilterData,
      columnFilterData,
      onSubmit: (data: any) => {
        onClose()
        onFilterSubmitHandler(data)
      },
      onReset: () => {
        onClose()
        onFilterResetHandler()
      }
    }

    if (filterComponent) {
      return filterComponent?.(formProps)
    }
  }, [filterComponent, column, allFilterData, onFilterSubmitHandler, onFilterResetHandler])

  return <Cell
    ref={cellRef}
    {...column.headCellProps}
    className={className}
    key={getColumnId(column)}
    component="th"
    onClick={onClickHandler}
  >
    {column.header}
    {
      filterable && <FilterContainer anchorRef={cellRef} isFilterInstalled={false}>
        {filter}
      </FilterContainer>
    }
  </Cell>
}

export default DataTableHeadCell;