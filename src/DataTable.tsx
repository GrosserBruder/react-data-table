import { Table, TableProps } from "@grossb/react-table"
import { memo, ReactElement, ReactNode, TdHTMLAttributes, useMemo } from "react"
import DataTableBody from "./DataTableBody"
import { useHandlers } from "./hooks/useHandlers"
import useSelectable from "./hooks/useSelectable"
import DataTableHead from "./DataTableHead"
import "./styles/DataTable.scss"
import { FILTERING_MODE, SORTING_MODE, SORTING_ORDER } from "./constants/const"
import useSorting from "./hooks/useSorting"
import { getColumnId } from "./helpers"
import { AllFilterData, FilterData, useFiltering } from "./hooks/useFiltering"
import { useEffects } from "./hooks/useEffects"

export type ColumnId = string | number

export type CellProps = TdHTMLAttributes<HTMLElement>

export type SortComparator = (a: DataItem, b: DataItem, sortingOrder: SORTING_ORDER) => number
export type FilterComparator = (dataItem: DataItem, columnFilterData?: FilterData, allFilterData?: AllFilterData) => boolean

export type Column = {
  id?: ColumnId,
  dataField?: string,
  valueGetter?: (value: DataItem) => ReactNode,
  header?: ReactNode,
  headCellProps?: CellProps
  bodyCellProps?: ((dataItem: DataItem) => CellProps) | CellProps
  sortComparator?: SortComparator
  filterComparator?: FilterComparator
  filterComponent?: ColumnFilterComponent
}

export type DataItem = {
  id: number | string,
  [key: string]: any,
}

export type SortingColumnOrder = {
  column: Column,
  sortingOrder: SORTING_ORDER
}

export type FormProps = {
  column: Column;
  allFilterData?: AllFilterData;
  columnFilterData?: FilterData,
  onSubmit: (data: any) => void;
  onReset: () => void;
}

export type FilterComponent = (props: FormProps) => ReactElement
export type ColumnFilterComponent = FilterComponent | false

export type DataTableProps = Pick<TableProps, "fixedTopTitle" | "striped" | "fixedLeftColumn"> & {
  data: Array<DataItem>,
  columns: Array<Column>,
  onRowClick?: (event: any, dataItem: DataItem) => void,
  selectable?: boolean,
  onSelectChange?: (selectedItems: Array<DataItem>) => void
  onSortChange?: (sortingColumnOrder?: SortingColumnOrder) => void
  sortable?: boolean,
  filterable?: boolean,
  defaultSortingColumnOrder?: SortingColumnOrder,
  commonFilterComponent?: FilterComponent,
  onFilterChange?: (allFilterData?: AllFilterData) => void,
  sortingMode?: SORTING_MODE
  filterMode?: FILTERING_MODE
}

const MemoDataTableHead = memo(DataTableHead)
const MemoDataTableBody = memo(DataTableBody)

export default function DataTable(props: DataTableProps) {
  const {
    data, columns, onRowClick, selectable, fixedTopTitle,
    striped, fixedLeftColumn, defaultSortingColumnOrder, sortable, commonFilterComponent,
    filterable, sortingMode = SORTING_MODE.CLIENT, filterMode = FILTERING_MODE.CLIENT,
  } = props

  // ToDo: Refactor
  const columnId = defaultSortingColumnOrder?.column ? getColumnId(defaultSortingColumnOrder?.column) : undefined
  const defaultSortingColumnIdOrder = columnId && defaultSortingColumnOrder ? { columnId, sortingOrder: defaultSortingColumnOrder.sortingOrder } : undefined

  const filteringHook = useFiltering({ columns })
  const { allFilterData, setFilter, removeFilter, filterData } = filteringHook

  const sortingHook = useSorting({ columns, data, defaultSortingColumnIdOrder })
  const { sortData, currentSorting } = sortingHook

  const selectableHook = useSelectable<DataItem>(data.length)

  const handlersHook = useHandlers(
    { ...props, sortingMode, filterMode },
    selectableHook,
    sortingHook,
    filteringHook
  )

  const sortingAndFilteredData = useMemo(() => {
    let result = data;

    if (filterable && filterMode === FILTERING_MODE.CLIENT) {
      result = filterData(result)
    }

    if (sortable && sortingMode === SORTING_MODE.CLIENT) {
      result = sortData(result)
    }

    return result
  }, [data, filterable, filterMode, filterData, sortable, sortingMode, sortData])

  useEffects(
    sortingAndFilteredData,
    { ...props, sortingMode, filterMode },
    selectableHook,
    sortingHook,
    filteringHook
  )

  return <Table
    className="data-table"
    fixedTopTitle={fixedTopTitle}
    fixedLeftColumn={fixedLeftColumn}
    striped={striped}
  >
    <MemoDataTableHead
      columns={columns}
      onSelectAllClick={handlersHook.onSelectAllClick}
      selectAllStatus={selectableHook.selectAllStatus}
      selectable={selectable}
      sortable={sortable}
      onHeaderCellClick={handlersHook.onHeadCellClick}
      currentSorting={currentSorting}
      filterable={filterable}
      commonFilterComponent={commonFilterComponent}
      allFilterData={allFilterData}
      onFilterSubmit={setFilter}
      onFilterReset={removeFilter}
      filterMode={filterMode}
      sortingMode={sortingMode}

    />
    <MemoDataTableBody
      columns={columns}
      data={sortingAndFilteredData}
      selectable={selectable}
      onRowClick={onRowClick}
      onSelectClick={handlersHook.onSelectClick}
      isSelected={selectableHook.isSelected}
    />
  </Table>
}