import { memo, useCallback } from "react"
import { Row, Cell } from "@grossb/react-table";
import { SelectedCheckbox } from "./components/SelectedCheckbox";
import { FILTERING_MODE, SELECT_STATUSES, SORTING_MODE } from "./constants/const";
import { Column, FilterComponent } from "./DataTable";
import { getColumnId } from "./helpers";
import DataTableHeadCell from "./DataTableHeadCell";
import { SortingColumnIdOrder } from "./hooks/useSorting";
import { AllFilterData } from "./hooks/useFiltering";

export type DataTableHeadRowProps = {
  columns: Array<Column>
  selectable?: boolean,
  onSelectAllClick?: (event: any) => void,
  selectAllStatus?: SELECT_STATUSES,
  sortable?: boolean,
  onHeaderCellClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>, column: Column) => void,
  currentSorting?: SortingColumnIdOrder,
  commonFilterComponent?: FilterComponent,
  allFilterData?: AllFilterData,
  onFilterSubmit?: (column: Column, data: any) => void,
  onFilterReset?: (column: Column) => void,
  filterable?: boolean,
  sortingMode?: SORTING_MODE
  filterMode?: FILTERING_MODE
}

const MemoDataTableHeadCell = memo(DataTableHeadCell)

function DataTableHeadRow(props: DataTableHeadRowProps) {
  const {
    columns, selectable, onSelectAllClick, selectAllStatus, onHeaderCellClick,
    currentSorting, sortable, commonFilterComponent, allFilterData, onFilterReset, onFilterSubmit,
    filterable, filterMode, sortingMode
  } = props;

  const onHeadCellClickHandler = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>, column: Column) => {
    onHeaderCellClick?.(event, column)
  }, [onHeaderCellClick])

  return <Row>
    {
      selectable && <Cell className="cell__select-all">
        <SelectedCheckbox onClick={onSelectAllClick} selectStatus={selectAllStatus} />
      </Cell>
    }
    {
      columns.map((column) => {
        const isSorting = currentSorting?.columnId === getColumnId(column) ? currentSorting?.sortingOrder : undefined

        const canFiltering = filterable && filterMode === FILTERING_MODE.CLIENT
          ? (column.filterComponent ?? commonFilterComponent) && column.filterComparator
          : column.filterComponent ?? commonFilterComponent

        const canSorting = sortable && sortingMode === SORTING_MODE.CLIENT
          ? column.sortComparator
          : true

        return <MemoDataTableHeadCell
          key={getColumnId(column)}
          column={column}
          onClick={onHeadCellClickHandler}
          isSorting={isSorting}
          sortable={Boolean(canSorting)}
          allFilterData={allFilterData}
          filterComponent={column.filterComponent ?? commonFilterComponent}
          onFilterSubmit={onFilterSubmit}
          onFilterReset={onFilterReset}
          filterable={Boolean(canFiltering)}
        />
      })
    }
  </Row>
}

export default DataTableHeadRow;