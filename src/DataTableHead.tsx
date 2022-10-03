import { Head } from "@grossb/react-table"
import classNames from "classnames";
import { FILTERING_MODE, SELECT_STATUSES, SORTING_MODE } from "./constants/const";
import { Column, FilterComponent } from "./DataTable";
import { SortingColumnIdOrder } from "./hooks/useSorting";
import { memo } from "react";
import DataTableHeadRow from "./DataTableHeadRow";
import { AllFilterData } from "./hooks/useFiltering";

export type DataTableHeadProps = {
  columns: Array<Column>
  selectable?: boolean
  // getCellProps?: (column: Column) => HeadCellPropsCommunity,
  onSelectAllClick?: (event: any) => void,
  selectAllStatus?: SELECT_STATUSES
  className?: string
  sortable?: boolean,
  onHeaderCellClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>, column: Column) => void,
  currentSorting?: SortingColumnIdOrder,
  commonFilterComponent?: FilterComponent,
  allFilterData?: AllFilterData,
  onFilterSubmit?: (column: Column, data: any) => void,
  onFilterReset?: (column: Column) => void,
  filterable?: boolean
  sortingMode?: SORTING_MODE
  filterMode?: FILTERING_MODE
}

const MemoDataTableHeadRow = memo(DataTableHeadRow)

function DataTableHead(props: DataTableHeadProps) {
  const {
    columns, selectable, className, selectAllStatus, onSelectAllClick, onHeaderCellClick,
    sortable, currentSorting, commonFilterComponent, allFilterData, onFilterSubmit, onFilterReset,
    filterable, filterMode, sortingMode
  } = props

  const headClassName = classNames("data-table__head", className)

  return <Head className={headClassName}>
    <MemoDataTableHeadRow
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