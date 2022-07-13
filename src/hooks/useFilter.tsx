import { useEffect, useState } from "react"
import { TableRowProps, BodyLineCell } from "../DataTable"
import useSearching from "./useSearching"
import useSorting from "./useSorting"

export function useFilter(bodyLines: Array<TableRowProps<BodyLineCell>>) {
  const [filteredRows, setFilteredRows] = useState<Array<TableRowProps<BodyLineCell>>>([])

  const searchHook = useSearching()
  const sortingHook = useSorting()

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