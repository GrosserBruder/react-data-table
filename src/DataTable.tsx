import { RowProps, Table, TableProps } from "@grossb/react-table"
import { memo, ReactElement, ReactNode, TdHTMLAttributes, useMemo } from "react"
import { FILTERING_MODE, SORTING_MODE, SORTING_ORDER } from "./constants/const"
import DataTableBody from "./DataTableBody"
import DataTableHead from "./DataTableHead"
import { getColumnId } from "./helpers"
import { useEffects } from "./hooks/useEffects"
import { AllFilterData, FilterData, useFiltering } from "./hooks/useFiltering"
import { useHandlers } from "./hooks/useHandlers"
import useSelectable from "./hooks/useSelectable"
import useSorting from "./hooks/useSorting"
import "./styles/DataTable.scss"

export type ColumnId = string | number

export type CellProps = TdHTMLAttributes<HTMLElement>

export type SortComparator<T extends DataItem> = (a: T, b: T, sortingOrder: SORTING_ORDER) => number
export type FilterComparator<T extends DataItem> = (dataItem: T, columnFilterData?: FilterData, allFilterData?: AllFilterData) => boolean

export type Column<T extends DataItem = DataItem> = {
  id?: ColumnId,
  dataField?: string,
  valueGetter?: (value: T) => ReactNode,
  header?: ReactNode,
  headCellProps?: CellProps
  bodyCellProps?: ((dataItem: T) => CellProps) | CellProps
  sortComparator?: SortComparator<T>
  filterComparator?: FilterComparator<T>
  filterComponent?: ColumnFilterComponent<T>
}

export type DataItem = {
  id: number | string,
  [key: string]: any,
}

export type SortingColumnOrder<T extends DataItem> = {
  column: Column<T>,
  sortingOrder: SORTING_ORDER
}

export type FormProps<T extends DataItem> = {
  column: Column<T>;
  allFilterData?: AllFilterData;
  columnFilterData?: FilterData,
  onSubmit: (data: any) => void;
  onReset: () => void;
}

export type FilterComponent<T extends DataItem> = (props: FormProps<T>) => ReactElement
export type ColumnFilterComponent<T extends DataItem> = FilterComponent<T> | false

// ToDo: сделать пропс на получаение/вычисление параметров для строк. 
// Например, при выбранной строке нужно ее окрашивать в какой - то цвет
export type DataTableProps<T extends DataItem = DataItem> = Pick<TableProps, "fixedTopTitle" | "striped" | "fixedLeftColumn"> & {
  data: Array<T>,
  columns: Array<Column<T>>,
  onRowClick?: (event: any, dataItem: T) => void,
  selectable?: boolean,
  onSelectChange?: (selectedItems: Array<T>) => void
  onSortChange?: (sortingColumnOrder?: SortingColumnOrder<T>) => void
  sortable?: boolean,
  filterable?: boolean,
  defaultSortingColumnOrder?: SortingColumnOrder<T>,
  commonFilterComponent?: FilterComponent<T>,
  onFilterChange?: (allFilterData?: AllFilterData) => void,
  sortingMode?: SORTING_MODE
  filterMode?: FILTERING_MODE
  rowProps?: ((dataItem: T) => RowProps) | RowProps
}

const MemoDataTableHead = memo(DataTableHead) as typeof DataTableHead
const MemoDataTableBody = memo(DataTableBody) as typeof DataTableBody

export default function DataTable<T extends DataItem = DataItem>(props: DataTableProps<T>) {
  const {
    data, columns, onRowClick, selectable, fixedTopTitle,
    striped, fixedLeftColumn, defaultSortingColumnOrder, sortable, commonFilterComponent,
    filterable, sortingMode = SORTING_MODE.CLIENT, filterMode = FILTERING_MODE.CLIENT,
    rowProps,
  } = props

  // ToDo: Refactor
  const columnId = defaultSortingColumnOrder?.column ? getColumnId(defaultSortingColumnOrder?.column) : undefined
  const defaultSortingColumnIdOrder = columnId && defaultSortingColumnOrder ? { columnId, sortingOrder: defaultSortingColumnOrder.sortingOrder } : undefined

  const filteringHook = useFiltering<T>({ columns })
  const { allFilterData, setFilter, removeFilter, filterData } = filteringHook

  const sortingHook = useSorting<T>({ columns, data, defaultSortingColumnIdOrder })
  const { sortData, currentSorting } = sortingHook

  const selectableHook = useSelectable<T>(data.length)

  const handlersHook = useHandlers<T>(
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

  useEffects<T>(
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
    <MemoDataTableBody<T>
      columns={columns}
      data={sortingAndFilteredData}
      selectable={selectable}
      onRowClick={onRowClick}
      onSelectClick={handlersHook.onSelectClick}
      isSelected={selectableHook.isSelected}
      rowProps={rowProps}
    />
  </Table>
}