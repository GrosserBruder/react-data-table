import { useCallback, useMemo, useState } from "react";
import { Column, ColumnId, DataItem } from "../DataTable";
import { getColumnId } from "../helpers";

export type FilterData = any // object from form

export type AllFilterData = {
  [key: ColumnId]: FilterData
}

export type useFilteringProps = {
  columns: Array<Column>
}

export function useFiltering(props: useFilteringProps) {
  const { columns } = props;
  const [allFilterData, setAllFilterData] = useState<AllFilterData | undefined>(undefined)

  const setFilter = useCallback((column: Column, data: FilterData) => {
    const columnId = getColumnId(column)

    if (!columnId) return;

    setAllFilterData((prev) => ({ ...prev, [columnId]: data }))
  }, [])

  const removeFilter = useCallback((column: Column) => {
    const columnId = getColumnId(column)

    if (!columnId) return;

    const newData = { ...allFilterData }

    delete newData[columnId]

    setAllFilterData(newData)
  }, [allFilterData])

  const resetFilters = useCallback(() => {
    setAllFilterData(undefined)
  }, [])

  const filterData = useCallback((data: Array<DataItem>) => data.filter((dataItem) => {
    return columns.every((column) => {
      const columnId = getColumnId(column)

      if (!columnId || !allFilterData || !column.filterComparator) return true;

      if (!(columnId in allFilterData)) return true;

      const columnDataFilter = allFilterData[columnId]

      return column.filterComparator(dataItem, columnDataFilter, allFilterData)
    })
  })
    , [columns, allFilterData])

  return useMemo(() => ({
    allFilterData,
    setFilter,
    removeFilter,
    resetFilters,
    filterData,
  }), [
    allFilterData,
    setFilter,
    removeFilter,
    resetFilters,
    filterData,
  ])
}