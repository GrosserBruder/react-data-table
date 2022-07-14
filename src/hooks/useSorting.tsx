import { useState, useCallback } from "react";
import { compareNumberOrBoolean, compareByAlphabetically, descSorting } from "../utils";
import { SORT_VALUES } from "../const";
import { TableRowProps, BodyLineCell } from "../DataTable";

const sortCell = (a: BodyLineCell, b: BodyLineCell) => {
  const typeValue = typeof a.value

  if (typeValue === "string") {
    return compareByAlphabetically(a.value, b.value)
  }

  if (typeValue === "number" || typeValue === "boolean") {
    return compareNumberOrBoolean(a.value, b.value)
  }

  return 0;
}

export function useSorting(initialSortValues?: Map<string, string>) {
  const [sortValues, setSortValues] = useState(new Map<string, string>(initialSortValues))

  const setSort = useCallback((filterKey: string, value: any) => {
    setSortValues((x) => new Map<string, string>(x.set(filterKey, value)))
  }, [setSortValues])

  const getSortValueByFilterKey = useCallback((filterKey: string) => {
    return sortValues.get(filterKey)
  }, [sortValues])

  const compare = useCallback((
    first: TableRowProps<BodyLineCell>,
    second: TableRowProps<BodyLineCell>
  ) => {
    const firstFilteredCells = first.cells
      .filter((x) => Boolean(x.filterKey))
      .filter((cell) => sortValues.has(cell.filterKey!))

    for (let i = 0; i < firstFilteredCells.length; i++) {
      const firstCell = firstFilteredCells[i]
      const sortValue: SORT_VALUES = getSortValueByFilterKey(firstCell.filterKey!) as SORT_VALUES

      const secondCell = second.cells.find((x) => x.id === firstCell.id)!

      const sortedCell = sortCell(firstCell, secondCell)

      if (sortedCell !== 0) {
        if (sortValue === SORT_VALUES.ASC) {
          return sortedCell
        }

        if (sortValue === SORT_VALUES.DESC) {
          return descSorting(sortedCell)
        }
      }
    }

    return 0
  }, [getSortValueByFilterKey, sortValues])

  return {
    sortValues,
    setSort,
    getSortValueByFilterKey,
    compare
  };
}

export default useSorting