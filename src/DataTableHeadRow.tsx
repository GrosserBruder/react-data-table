import { memo, useCallback } from "react"
import { Row, Cell } from "@grossb/react-table";
import { SelectedCheckbox } from "./components/SelectedCheckbox";
import { FILTERING_MODE, SELECT_STATUSES, SORTING_MODE } from "./constants/const";
import { Column, DataItem, FilterComponent } from "./DataTable";
import { getColumnId } from "./helpers";
import DataTableHeadCell from "./DataTableHeadCell";
import { SortingColumnIdOrder } from "./hooks/useSorting";
import { AllFilterData } from "./hooks/useFiltering";

export type DataTableHeadRowProps<T extends DataItem> = {
  columns: Array<Column<T>>
  selectable?: boolean,
  onSelectAllClick?: (event: any) => void,
  selectAllStatus?: SELECT_STATUSES,
  sortable?: boolean,
  onHeaderCellClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>, column: Column<T>) => void,
  currentSorting?: SortingColumnIdOrder,
  commonFilterComponent?: FilterComponent<T>,
  allFilterData?: AllFilterData,
  onFilterSubmit?: (column: Column<T>, data: any) => void,
  onFilterReset?: (column: Column<T>) => void,
  filterable?: boolean,
  sortingMode?: SORTING_MODE
  filterMode?: FILTERING_MODE
}

const MemoDataTableHeadCell = memo(DataTableHeadCell) as typeof DataTableHeadCell

function DataTableHeadRow<T extends DataItem>(props: DataTableHeadRowProps<T>) {
  const {
    columns, selectable, onSelectAllClick, selectAllStatus, onHeaderCellClick,
    currentSorting, sortable, commonFilterComponent, allFilterData, onFilterReset, onFilterSubmit,
    filterable, filterMode, sortingMode
  } = props;

  const onHeadCellClickHandler = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>, column: Column<T>) => {
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

        return <MemoDataTableHeadCell<T>
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