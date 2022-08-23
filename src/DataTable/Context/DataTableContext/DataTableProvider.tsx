import { createContext, ReactNode } from "react";
import {
  useSortingValue,
  useFilteringValue,
  useSelectingRowsValue,
  useSorting,
  useFiltering,
  useSelectingRows,
  useSortingProps,
  useFilteringProps,
  useSelectingRowsProps
} from "../../hooks";
import { DataRow, DataTableColumn } from "../../types";

export type DataTableContextType = useSortingValue
  & useFilteringValue
  & useSelectingRowsValue
  & {
    props: DataTableProviderProps
  }

export type DataTableProviderProps = Omit<useSortingProps, "columns" | "onSortingChange">
  & Omit<useFilteringProps, "columns" | "onFilterChange">
  & Omit<useSelectingRowsProps, "dataRowsLength" | "onSelectedRowsChange">
  & {
    children?: ReactNode,
    columns: Array<DataTableColumn>
    data: Array<DataRow>
  }

export const DataTableContext = createContext<DataTableContextType | undefined>(undefined);

export default function DataTableProvider(props: DataTableProviderProps) {
  const { children, data } = props

  const sorting = useSorting(props)
  const filtering = useFiltering(props)
  const selecting = useSelectingRows({ ...props, dataRowsLength: data.length })

  const value = {
    ...sorting,
    ...filtering,
    ...selecting,
    props,
  }

  return <DataTableContext.Provider value={value}>
    {children}
  </DataTableContext.Provider>
}