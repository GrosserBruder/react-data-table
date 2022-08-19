import { useCallback } from "react";
import { SORT_STRATEGY } from "../../const";
import { HeadCellV2, SortStrategyIcon } from "../../Components";
import { getColumnKey } from "../../utils";
import { FilterContainer } from "../FilterContainer/FilterContainer";
import { DataTableColumn } from "../types";
import { HeadCellProps } from "../../Components/HeadCell/HeadCell";

export type DataTableHeadCellProps = HeadCellProps & {
  column: DataTableColumn
  sortable?: boolean
  filterable?: boolean
  sortStrategy?: SORT_STRATEGY
  onHeadCellClick?: (event: any, column: DataTableColumn) => void
}

function DataTableHeadCell(props: DataTableHeadCellProps) {
  const { column, sortable, filterable, onHeadCellClick, sortStrategy, ...restProps } = props;

  const onHeadCellClickHandler = useCallback((event: any) => {
    if (!sortable) return;

    onHeadCellClick?.(event, column)
  }, [sortable, onHeadCellClick])

  return <HeadCellV2
    key={getColumnKey(column)}
    onClick={onHeadCellClickHandler}
  >
    <div className="head-cell__title">{column.header}</div>
    {(sortable || column.sortable) && <SortStrategyIcon sortStrategy={sortStrategy} />}
    {
      (filterable || column.filterable) && <FilterContainer column={column}>
        {column.filterComponent}
      </FilterContainer>
    }
  </HeadCellV2>
}

export default DataTableHeadCell;