import { createContext, ReactNode, useCallback, useState } from "react";
import { ColumnFilter, DataRow, DataTableColumn } from "../../types";

export type FilterContextType = {
  filters: Map<string, any>
  setFilter: (fieldKey: string, filter: ColumnFilter) => void
  removeFilter: (fieldKey: string) => void
  resetAllFilters: () => void
  filterDataRows: (data: Array<DataRow>) => DataRow[]
  getFilterByFieldKey: (fieldKey?: string) => any
}

export type FilterProviderProps = {
  children?: ReactNode,
  columns: Array<DataTableColumn>
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export default function FilterProvider(props: FilterProviderProps) {
  const { columns, children } = props;

  const [filters, setFilters] = useState<Map<string, ColumnFilter>>(new Map<string, ColumnFilter>())

  const setFilter = useCallback((fieldKey: string, filter: ColumnFilter) => {
    const map = new Map(filters.set(fieldKey, filter))
    setFilters(map)
  }, [setFilters])

  const removeFilter = useCallback((fieldKey: string) => {
    filters.delete(fieldKey)
    const map = new Map(filters)
    setFilters(map)
  }, [setFilters])

  const resetAllFilters = useCallback(() => {
    const map = new Map<string, ColumnFilter>()
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

  const getFilterByFieldKey = (fieldKey?: string) => {
    if (fieldKey === undefined) return undefined

    return filters.get(fieldKey)
  }

  const filterDataRows = useCallback((data: Array<DataRow>) => {
    const filteredColumns = columns.filter((x) => {
      if (x.id ?? x.dataField === undefined) return false;

      return filters.has(x.id ?? x.dataField)
    })

    return data.filter((row) => filterer(row, filteredColumns))
  }, [filters, filterer, columns])

  const value = {
    filters,
    setFilter,
    removeFilter,
    resetAllFilters,
    filterDataRows,
    getFilterByFieldKey
  }

  return <FilterContext.Provider value={value}>
    {children}
  </FilterContext.Provider>
}