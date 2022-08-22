import { useCallback } from "react";
import { SORT_STRATEGY } from "../const";
import { HeadCell, SortStrategyIcon } from "../BaseComponents";
import { getColumnKey } from "../utils";
import { FilterContainer } from "../FilterContainer";
import { DataTableColumn } from "../DataTable/types";
import { HeadCellProps } from "../BaseComponents";

export type DataTableHeadCellProps = HeadCellProps & {
  column: DataTableColumn
  sortable?: boolean
  filterable?: boolean
  sortStrategy?: SORT_STRATEGY
  onHeadCellClick?: (event: any, column: DataTableColumn) => void
}

function DataTableHeadCell(props: DataTableHeadCellProps) {
  const {
    column, sortable, filterable, onHeadCellClick, sortStrategy, ...restProps
  } = props;

  const onHeadCellClickHandler = useCallback((event: any) => {
    if (!sortable) return;

    onHeadCellClick?.(event, column)
  }, [sortable, onHeadCellClick])

  return <HeadCell
    key={getColumnKey(column)}
    {...restProps}
    onClick={onHeadCellClickHandler}
  >
    <div className="head-cell__title">{column.header}</div>
    {(sortable) && <SortStrategyIcon sortStrategy={sortStrategy} />}
    {
      (filterable) && <FilterContainer column={column}>
        {column.filterComponent}
      </FilterContainer>
    }
  </HeadCell>
}

export default DataTableHeadCell;