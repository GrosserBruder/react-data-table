import { useEffect } from "react"
import { DataItem, DataTableProps } from "../DataTable"
import { getColumnId } from "../helpers"
import { useFiltering } from "./useFiltering"
import { usePrevious } from "./usePrevious"
import useSelectable from "./useSelectable"
import useSorting from "./useSorting"

export function useEffects(
  data: Array<DataItem>,
  props: DataTableProps,
  selectableHook: ReturnType<typeof useSelectable<DataItem>>,
  sortingHook: ReturnType<typeof useSorting>,
  filteringHook: ReturnType<typeof useFiltering>,
) {
  const { columns, onSelectChange, onSortChange, onFilterChange } = props

  useEffect(() => {
    onSelectChange?.(selectableHook.selected)
  }, [onSelectChange, selectableHook.selected])

  useEffect(() => {
    onSelectChange?.(selectableHook.selected)
  }, [onSelectChange, selectableHook.selected])

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

  const prevFiltedData = usePrevious(filteringHook.allFilterData)

  useEffect(() => {
    if (filteringHook.allFilterData === prevFiltedData) return;

    const existSelecteds = selectableHook.selected.filter((selected) => data.find((dataItem) => dataItem.id === selected.id))

    selectableHook.resetSelected()
    selectableHook.addSelected(existSelecteds)
  }, [data, prevFiltedData, filteringHook.allFilterData, selectableHook.selected, selectableHook.addSelected, selectableHook.resetSelected])
}
