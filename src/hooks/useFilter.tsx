import { useCallback, useEffect, useRef, useState } from "react"
import { FilterValue } from "../Components/Filter/Filter"
import { TableRowProps, BodyLineCell } from "../DataTable"
import useSearching from "./useSearching"
import useSorting from "./useSorting"

export type FilterProps = {
  initialSearchValues?: Map<string, string>
  initialSortValues?: Map<string, string>,
  initialFilteredRows?: Array<TableRowProps<BodyLineCell>>
}

export function useFilter(bodyLines: Array<TableRowProps<BodyLineCell>>, props?: FilterProps) {
  const [filteredRows, setFilteredRows] = useState<Array<TableRowProps<BodyLineCell>>>(props?.initialFilteredRows ?? [])
  const filter = useRef<FilterValue>({})

  const searchHook = useSearching(props?.initialSearchValues)
  const sortingHook = useSorting(props?.initialSortValues)

  useEffect(() => {
    const result = searchHook.filtering(bodyLines)
      .sort(sortingHook.compare)

    setFilteredRows(result)
  }, [bodyLines, searchHook.searchValues, sortingHook.sortValues])

  const setFilter = useCallback((filterKey: string, value: FilterValue) => {
    filter.current = value
    searchHook.setSearch(filterKey, value.search)
    sortingHook.setSort(filterKey, value.sort)
  }, [filter, searchHook.setSearch, sortingHook.setSort])

  return {
    ...searchHook,
    ...sortingHook,
    filteredRows,
    setFilter
  }
}

export default useFilter