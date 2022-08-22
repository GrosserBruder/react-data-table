import { useEffect } from "react"
import { SORT_STRATEGY } from "../../const"
import { useDataTableContext } from "../Context"
import { ColumnFilter } from "../types"

export type onFilterChangeListener = (filters: Map<string, ColumnFilter>) => void
export type onSortChangeListener = (sortFields: Map<string, SORT_STRATEGY>) => void


export default function useListeners(onFilterChange?: onFilterChangeListener, onSortChange?: onSortChangeListener) {

  const dataTableContext = useDataTableContext()

  useEffect(() => {
    onFilterChange?.(dataTableContext.filters)
  }, [onFilterChange, dataTableContext.filters])

  useEffect(() => {
    onSortChange?.(dataTableContext.sortFields)
  }, [onSortChange, dataTableContext.sortFields])
}