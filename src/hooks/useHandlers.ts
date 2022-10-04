import { useCallback, useMemo } from "react"
import { SELECT_STATUSES, SORTING_ORDER } from "../constants/const"
import { Column, DataItem, DataTableProps } from "../DataTable"
import { getColumnId } from "../helpers"
import { useFiltering } from "./useFiltering"
import useSelectable from "./useSelectable"
import useSorting from "./useSorting"

export function useHandlers(
  props: DataTableProps,
  selectableHook: ReturnType<typeof useSelectable<DataItem>>,
  sortingHook: ReturnType<typeof useSorting>,
  filteringHook: ReturnType<typeof useFiltering>,
) {
  const { data, sortable } = props

  const onSelectClick = useCallback((dataItem: DataItem, currentStatus?: SELECT_STATUSES) => {
    if (currentStatus === SELECT_STATUSES.SELECTED) {
      selectableHook.removeSelected?.(dataItem)
    } else {
      selectableHook.addSelected?.(dataItem)
    }
  }, [selectableHook.removeSelected, selectableHook.addSelected])

  const onSelectAllClick = useCallback(() => {
    if (selectableHook.selectAllStatus === SELECT_STATUSES.NOT_SELECTED) {
      selectableHook.addSelected(data)
    } else {
      selectableHook.resetSelected()
    }
  }, [
    selectableHook.addSelected,
    selectableHook.selectAllStatus,
    selectableHook.resetSelected,
    data
  ])

  const onHeadCellClick = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>, column: Column) => {
    if (!sortable) return;

    const columnId = getColumnId(column)

    if (!columnId || !column.sortComparator) return;

    if (sortingHook.currentSorting?.columnId !== getColumnId(column)) {
      return sortingHook.setSortColumn(columnId, SORTING_ORDER.ASC)
    }

    switch (true) {
      case sortingHook.currentSorting?.sortingOrder === SORTING_ORDER.ASC:
        sortingHook.setSortColumn(columnId, SORTING_ORDER.DESC)
        break;
      case sortingHook.currentSorting?.sortingOrder === SORTING_ORDER.DESC:
        sortingHook.setSortColumn(columnId, SORTING_ORDER.ASC)
        break;
      default:
        sortingHook.removeSort()
    }
  }, [sortable, sortingHook.currentSorting, sortingHook.setSortColumn, sortingHook.removeSort])

  return useMemo(() => ({
    onSelectClick,
    onSelectAllClick,
    onHeadCellClick,
  }), [
    onSelectClick,
    onSelectAllClick,
    onHeadCellClick,
  ])
}
