import { useState, useCallback } from "react";
import { TableRowProps, BodyLineCell } from "../DataTable";

export function useSearching(initialSearchValues?: Map<string, string>) {
  const [searchValues, setSearchValues] = useState(new Map<string, string>(initialSearchValues))

  const setSearch = useCallback((filterKey: string, value: any) => {
    setSearchValues((x) => new Map<string, string>(x.set(filterKey, value)))
  }, [setSearchValues])

  const getSearchValueByFilterKey = (filterKey: string) => {
    return searchValues.get(filterKey)
  }

  const filtering = useCallback((bodyLines: Array<TableRowProps<BodyLineCell>>) => {
    return bodyLines.filter((line) => {
      return line.cells
        .filter((x) => Boolean(x.filterKey))
        .filter((cell) => searchValues.has(cell.filterKey!))
        .every((cell) => {
          return (cell.value?.toString() || '').toLowerCase().includes(searchValues.get(cell.filterKey!)!)
        })

    })
  }, [searchValues])

  return {
    searchValues,
    setSearch,
    getSearchValueByFilterKey,
    filtering
  };
}

export default useSearching