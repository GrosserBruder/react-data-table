import { createContext, ReactNode, useCallback } from "react";
import { DataRow, DataTableColumn } from "../types";
import useFilter, { UseFilterResult } from "./useFilter";
import useSort, { UseSortResult } from "./useSort";

export type DataTableContextType = Omit<UseSortResult, "sortDataRows">
  & Omit<UseFilterResult, "filterDataRows">
  & {
    sortDataRows: (data: Array<DataRow>) => Array<DataRow>
    filterDataRows: (data: Array<DataRow>) => Array<DataRow>
    sortAndFilterDataRows: (data: Array<DataRow>) => Array<DataRow>
  }

export type DataTableProviderProps = {
  children?: ReactNode,
  columns: Array<DataTableColumn>
}

export const DataTableContext = createContext<DataTableContextType | undefined>(undefined);

export default function DataTableProvider(props: DataTableProviderProps) {
  const { columns, children } = props;

  const sortHook = useSort();
  const filterHook = useFilter();

  const sortDataRows = useCallback((data: Array<DataRow>) => {
    return sortHook.sortDataRows(data, columns)
  }, [sortHook.sortDataRows, columns])

  const filterDataRows = useCallback((data: Array<DataRow>) => {
    return filterHook.filterDataRows(data, columns)
  }, [sortHook.sortDataRows, columns])

  const sortAndFilterDataRows = useCallback((data: Array<DataRow>) => {
    const filterDataRows = filterHook.filterDataRows(data, columns)
    return sortHook.sortDataRows(filterDataRows, columns)
  }, [])

  const value = {
    ...sortHook,
    ...filterHook,
    sortDataRows,
    filterDataRows,
    sortAndFilterDataRows,
  }

  return <DataTableContext.Provider value={value}>
    {children}
  </DataTableContext.Provider>
}