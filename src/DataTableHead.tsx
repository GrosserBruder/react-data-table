import { Head } from "@grossb/react-table"
import classNames from "classnames";
import { FILTERING_MODE, SELECT_STATUSES, SORTING_MODE } from "./constants/const";
import { Column, DataItem, FilterComponent } from "./DataTable";
import { SortingColumnIdOrder } from "./hooks/useSorting";
import { memo } from "react";
import DataTableHeadRow from "./DataTableHeadRow";
import { AllFilterData } from "./hooks/useFiltering";

export type DataTableHeadProps<T extends DataItem> = {
  columns: Array<Column<T>>
  selectable?: boolean
  // getCellProps?: (column: Column) => HeadCellPropsCommunity,
  onSelectAllClick?: (event: any) => void,
  selectAllStatus?: SELECT_STATUSES
  className?: string
  sortable?: boolean,
  onHeaderCellClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>, column: Column<T>) => void,
  currentSorting?: SortingColumnIdOrder,
  commonFilterComponent?: FilterComponent<T>,
  allFilterData?: AllFilterData,
  onFilterSubmit?: (column: Column<T>, data: any) => void,
  onFilterReset?: (column: Column<T>) => void,
  filterable?: boolean
  sortingMode?: SORTING_MODE
  filterMode?: FILTERING_MODE
}

const MemoDataTableHeadRow = memo(DataTableHeadRow) as typeof DataTableHeadRow

function DataTableHead<T extends DataItem>(props: DataTableHeadProps<T>) {
  const {
    columns, selectable, className, selectAllStatus, onSelectAllClick, onHeaderCellClick,
    sortable, currentSorting, commonFilterComponent, allFilterData, onFilterSubmit, onFilterReset,
    filterable, filterMode, sortingMode
  } = props

  const headClassName = classNames("data-table__head", className)

  return <Head className={headClassName}>
    <MemoDataTableHeadRow<T>
      columns={columns}
      selectable={selectable}
      onSelectAllClick={onSelectAllClick}
      selectAllStatus={selectAllStatus}
      onHeaderCellClick={onHeaderCellClick}
      sortable={sortable}
      currentSorting={currentSorting}
      commonFilterComponent={commonFilterComponent}
      allFilterData={allFilterData}
      onFilterSubmit={onFilterSubmit}
      onFilterReset={onFilterReset}
      filterable={filterable}
      filterMode={filterMode}
      sortingMode={sortingMode}
    />
  </Head>
}

export default DataTableHead;