import { useCallback, useEffect, useState } from "react"
import { SORTING_MODE, SORT_STRATEGY } from "../../const"
import { DataRow, DataTableColumn } from "../types"

export type useSortingProps = {
  columns: Array<DataTableColumn>
  sortingMode?: SORTING_MODE
  onSortingChange?: (sortFields: Map<string, SORT_STRATEGY>) => void
}

export type useSortingValue = {
  sortDataRows: (data: Array<DataRow>) => DataRow[];
  sortFields: Map<string, SORT_STRATEGY>;
  setSort: (fieldKey: string, sortStrategy: SORT_STRATEGY) => void;
  removeSort: (fieldKey: string) => void;
  removeAllSort: () => void;
}

const getNewSortMap = (sortingMode: SORTING_MODE, sortFields: Map<string, SORT_STRATEGY>, fieldKey: string, sortStrategy: SORT_STRATEGY) => {
  switch (true) {
    case sortingMode === SORTING_MODE.SINGLE:
      return new Map<string, SORT_STRATEGY>().set(fieldKey, sortStrategy)
    case sortingMode === SORTING_MODE.MULTIPLE:
      return new Map<string, SORT_STRATEGY>(sortFields.set(fieldKey, sortStrategy))
    default:
      return new Map<string, SORT_STRATEGY>(sortFields)
  }
}

export default function useSorting(props: useSortingProps) {
  const { columns, sortingMode = SORTING_MODE.MULTIPLE, onSortingChange } = props
  const [sortFields, setSortFields] = useState<Map<string, SORT_STRATEGY>>(new Map<string, SORT_STRATEGY>())

  useEffect(() => {
    onSortingChange?.(sortFields)
  }, [sortFields, onSortingChange])

  const setSort = useCallback((fieldKey: string, sortStrategy: SORT_STRATEGY) => {
    if (sortingMode === SORTING_MODE.OFF) return;

    const map = getNewSortMap(sortingMode, sortFields, fieldKey, sortStrategy)

    setSortFields(map)
  }, [setSortFields, sortingMode])

  const removeSort = useCallback((fieldKey: string) => {
    sortFields.delete(fieldKey)
    const map = new Map(sortFields)
    setSortFields(map)
  }, [setSortFields])

  const removeAllSort = useCallback(() => {
    const map = new Map()
    setSortFields(map)
  }, [setSortFields])

  const comparer = useCallback((first: DataRow, second: DataRow, columns: Array<DataTableColumn>) => {
    for (let index = 0; index < columns.length; index++) {
      const column = columns[index];

      if (column.id ?? column.dataField === undefined) {
        continue;
      };

      const comparerResult = column.rowComparer?.(first, second)

      if (comparerResult !== undefined && comparerResult !== 0) {

        const isDescSortStrategy = sortFields.get(column.id ?? column.dataField) === SORT_STRATEGY.DESC

        return isDescSortStrategy
          ? comparerResult * -1
          : comparerResult
      }
    }

    return 0;
  }, [sortFields])

  const sortDataRows = useCallback((data: Array<DataRow>) => {
    if (sortingMode === SORTING_MODE.OFF) return data;

    const filteredColumns = columns.filter((x) => {
      if (x.id ?? x.dataField === undefined) return false;

      return sortFields.has(x.id ?? x.dataField)
    })

    return data.sort((first, second) => comparer(first, second, filteredColumns))
  }, [sortFields, comparer, columns, sortingMode])

  return {
    sortDataRows,
    sortFields,
    setSort,
    removeSort,
    removeAllSort,
  }
}