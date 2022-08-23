import { useEffect } from "react"
import { SORT_STRATEGY } from "../../const"
import { useDataTableContext } from "../Context"
import { ColumnFilter, DataRow } from "../types"

export type onFilterChangeListener = (filters: Map<string, ColumnFilter>) => void
export type onSortChangeListener = (sortFields: Map<string, SORT_STRATEGY>) => void
export type onSelectedRowsChangeListener = (selectedRows: Array<DataRow>) => void


export default function useListeners(onFilterChange?: onFilterChangeListener, onSortChange?: onSortChangeListener, onSelectedRowsChange?: onSelectedRowsChangeListener) {

  const dataTableContext = useDataTableContext()

  useEffect(() => {
    onFilterChange?.(dataTableContext.filters)
  }, [onFilterChange, dataTableContext.filters])

  useEffect(() => {
    onSortChange?.(dataTableContext.sortFields)
  }, [onSortChange, dataTableContext.sortFields])

  useEffect(() => {
    onSelectedRowsChange?.(dataTableContext.selectedRows)
  }, [onSelectedRowsChange, dataTableContext.selectedRows])
}