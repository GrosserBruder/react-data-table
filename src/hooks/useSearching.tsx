import { useState } from "react";
import { TableRowProps, BodyLineCell } from "../DataTable";

export function useSearching() {
  const [searchValues, setSearchValues] = useState(new Map<string, string>())

  const setSearch = (filterKey: string, value: any) => {
    setSearchValues((x) => new Map<string, string>(x.set(filterKey, value)))
  }

  const getSearchValueByFilterKey = (filterKey: string) => {
    return searchValues.get(filterKey)
  }

  const filtering = (bodyLines: Array<TableRowProps<BodyLineCell>>) => {
    return bodyLines.filter((line) => {
      return line.cells
        .filter((x) => Boolean(x.filterKey))
        .filter((cell) => searchValues.has(cell.filterKey!))
        .every((cell) => {
          return (cell.value as string || '').toLowerCase().includes(searchValues.get(cell.filterKey!)!)
        })

    })
  }

  return {
    searchValues,
    setSearch,
    getSearchValueByFilterKey,
    filtering
  };
}

export default useSearching