import { useState, useCallback } from "react"
import { DataRow, DataTableColumn } from "../types";

export type UseFilterResult = {
  filters: Map<string, any>
  setFilter: (fieldKey: string, filter: ColumnFilter) => void
  removeFilter: (fieldKey: string) => void
  filterDataRows: (data: Array<DataRow>, columns: Array<DataTableColumn>) => DataRow[]
  getFilterByFieldKey: (fieldKey: string) => any
}

export type ColumnFilter = {
  search?: string,
  [key: string]: any,
}

export default function useFilter(): UseFilterResult {
  const [filters, setFilters] = useState<Map<string, any>>(new Map<string, ColumnFilter>())

  const setFilter = useCallback((fieldKey: string, filter: ColumnFilter) => {
    setFilters(filters.set(fieldKey, filter))
  }, [setFilters])

  const removeFilter = useCallback((fieldKey: string) => {
    filters.delete(fieldKey)
    const map = new Map(filters)
    setFilters(map)
  }, [setFilters])

  const filterer = useCallback((row: DataRow, columns: Array<DataTableColumn>) => {
    return columns.every((column) => {
      if (column.rowFilter === undefined) return true;
      if (column.id ?? column.dataField === undefined) return true;

      const filterColumm = filters.get(column.id ?? column.dataField)

      return column.rowFilter?.(row, filterColumm)
    })
  }, [filters])

  const getFilterByFieldKey = (fieldKey: string) => {
    return filters.get(fieldKey)
  }

  const filterDataRows = useCallback((data: Array<DataRow>, columns: Array<DataTableColumn>) => {
    const filteredColumns = columns.filter((x) => {
      if (x.id ?? x.dataField === undefined) return false;

      return filters.has(x.id ?? x.dataField)
    })

    return data.filter((row) => filterer(row, filteredColumns))
  }, [filters])

  return { filters, setFilter, removeFilter, filterDataRows, getFilterByFieldKey }
}