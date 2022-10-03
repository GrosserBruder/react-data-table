import { useCallback, useMemo, useState } from "react"
import { SORTING_ORDER } from "../constants/const"
import { Column, ColumnId, DataItem } from "../DataTable"
import { getColumnId } from "../helpers"

export type SortingColumnIdOrder = {
  columnId: ColumnId,
  sortingOrder: SORTING_ORDER
}

export type useSortingProps = {
  data: Array<DataItem>
  defaultSortingColumnIdOrder?: SortingColumnIdOrder
  columns: Array<Column>
}

export function useSorting(props: useSortingProps) {
  const { columns, defaultSortingColumnIdOrder } = props
  const [currentSorting, setSortingColumnOrder] = useState<SortingColumnIdOrder | undefined>(defaultSortingColumnIdOrder)

  const setSortColumn = useCallback((columnId: ColumnId, sortingOrder: SORTING_ORDER) => {

    setSortingColumnOrder({ columnId, sortingOrder })
  }, [setSortingColumnOrder])

  const removeSort = useCallback(() => {
    setSortingColumnOrder(undefined)
  }, [setSortingColumnOrder])

  const sortData = useCallback((data: Array<DataItem>) => {
    if (!currentSorting) return data

    const column = columns.find((x) => getColumnId(x) === currentSorting.columnId)

    if (!column || !column.sortComparator) return data;

    const comparator = column.sortComparator

    return Array.from(data).sort((a, b) => comparator(a, b, currentSorting.sortingOrder))
  }, [columns, currentSorting])

  return useMemo(() => ({
    currentSorting,
    setSortColumn,
    removeSort,
    sortData
  }), [currentSorting, setSortColumn, removeSort, sortData])
}

export default useSorting