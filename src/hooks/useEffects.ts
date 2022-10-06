import { useEffect } from "react"
import { DataItem, DataTableProps } from "../DataTable"
import { getColumnId } from "../helpers"
import { useFiltering } from "./useFiltering"
import { usePrevious } from "./usePrevious"
import useSelectable from "./useSelectable"
import useSorting from "./useSorting"

export function useEffects<T extends DataItem = DataItem>(
  data: Array<T>,
  props: DataTableProps<T>,
  selectableHook: ReturnType<typeof useSelectable<T>>,
  sortingHook: ReturnType<typeof useSorting<T>>,
  filteringHook: ReturnType<typeof useFiltering<T>>,
) {
  const { columns, onSelectChange, onSortChange, onFilterChange } = props

  useEffect(() => {
    const selectedItems = selectableHook.selectedItemIds
      .map((selectedId) => data.find((dataItem) => selectedId === dataItem.id))
      .filter((x): x is T => x !== undefined)

    onSelectChange?.(selectedItems)
  }, [data, onSelectChange, selectableHook.selectedItemIds])

  useEffect(() => {
    if (!sortingHook.currentSorting) {
      return onSortChange?.(undefined)
    }

    const column = columns.find((x) => getColumnId(x) === sortingHook.currentSorting?.columnId)

    if (!column) {
      return onSortChange?.(undefined)
    }

    return onSortChange?.({ column, sortingOrder: sortingHook.currentSorting.sortingOrder })
  }, [onSortChange, columns, sortingHook.currentSorting])

  useEffect(() => {
    onFilterChange?.(filteringHook.allFilterData)
  }, [onFilterChange, filteringHook.allFilterData])

  const prevData = usePrevious(data)

  useEffect(() => {
    if (prevData === data) return;

    const existSelecteds = selectableHook.selectedItemIds
      .map((selectedId) => data.find((dataItem) => selectedId === dataItem.id))
      .filter((x): x is T => x !== undefined)

    selectableHook.resetSelected()
    selectableHook.addSelected(existSelecteds)
  }, [data, prevData, selectableHook.selectedItemIds, selectableHook.addSelected, selectableHook.resetSelected])
}
