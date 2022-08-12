import { createContext, ReactNode, useCallback } from "react";
import { DataRow, DataTableColumn } from "../types";
import useSort, { UseSortResult } from "./useSort";

export type DataTableContextType = UseSortResult

export type DataTableProviderProps = {
  children?: ReactNode,
  columns: Array<DataTableColumn>
}

export const DataTableContext = createContext<DataTableContextType | undefined>(undefined);

export default function DataTableProvider(props: DataTableProviderProps) {
  const { columns, children } = props;

  const sortHook = useSort();

  const comparer = useCallback((first: DataRow, second: DataRow, columns: Array<DataTableColumn>) => {
    for (let index = 0; index < columns.length; index++) {
      const column = columns[index];

      const comparerResult = column.comparer?.(first, second)

      if (comparerResult !== undefined && comparerResult !== 0) {
        // добавить стратегию сортировки
        return comparerResult
      }
    }

    return 0;
  }, [])

  const sortDataRows = useCallback((data: Array<DataRow>) => {
    const filteredColumns = columns.filter((x) => {
      if (x.id === undefined) return false;

      return sortHook.sortFields.includes(x.id)
    })

    data.sort((first, second) => comparer(first, second, filteredColumns))
  }, [sortHook.sortFields, columns])

  const value = {
    ...sortHook,
    sortDataRows,
  }

  return <DataTableContext.Provider value={value}>
    {children}
  </DataTableContext.Provider>
}