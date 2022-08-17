import { useCallback, useState } from "react"
import { SORT_STRATEGY } from "../../const"
import { DataRow, DataTableColumn } from "../types"

export type useSortingProps = {
  columns: Array<DataTableColumn>
}

export type useSortingValue = {
  sortDataRows: (data: Array<DataRow>) => DataRow[];
  sortFields: Map<string, SORT_STRATEGY>;
  setSort: (fieldKey: string, sortStrategy: SORT_STRATEGY) => void;
  removeSort: (fieldKey: string) => void;
  removeAllSort: () => void;
}

export default function useSorting(props: useSortingProps) {
  const { columns } = props
  const [sortFields, setSortFields] = useState<Map<string, SORT_STRATEGY>>(new Map<string, SORT_STRATEGY>())

  const setSort = useCallback((fieldKey: string, sortStrategy: SORT_STRATEGY) => {
    const map = new Map(sortFields.set(fieldKey, sortStrategy))
    setSortFields(map)
  }, [setSortFields])

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
    const filteredColumns = columns.filter((x) => {
      if (x.id ?? x.dataField === undefined) return false;

      return sortFields.has(x.id ?? x.dataField)
    })

    return data.sort((first, second) => comparer(first, second, filteredColumns))
  }, [sortFields, comparer, columns])

  return {
    sortDataRows,
    sortFields,
    setSort,
    removeSort,
    removeAllSort,
  }
}