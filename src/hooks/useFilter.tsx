import { useEffect, useState } from "react"
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

  const searchHook = useSearching(props?.initialSearchValues)
  const sortingHook = useSorting(props?.initialSortValues)

  useEffect(() => {
    const result = searchHook.filtering(bodyLines)
      .sort(sortingHook.compare)

    setFilteredRows(result)
  }, [bodyLines, searchHook.searchValues, sortingHook.sortValues])

  return {
    ...searchHook,
    ...sortingHook,
    filteredRows,
  }
}

export default useFilter