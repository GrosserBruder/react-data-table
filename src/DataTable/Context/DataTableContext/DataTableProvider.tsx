import { createContext, ReactNode } from "react";
import { useSortingValue, useFilteringValue, useSelectingRowsValue, useSorting, useFiltering, useSelectingRows } from "../../hooks";
import { DataRow, DataTableColumn } from "../../types";

export type DataTableContextType = useSortingValue & useFilteringValue & useSelectingRowsValue

export type DataTableProviderProps = {
  children?: ReactNode,
  columns: Array<DataTableColumn>
  data: Array<DataRow>
}

export const DataTableContext = createContext<DataTableContextType | undefined>(undefined);

export default function DataTableProvider(props: DataTableProviderProps) {
  const { columns, children, data } = props
  const sorting = useSorting({ columns })
  const filtering = useFiltering({ columns })
  const selecting = useSelectingRows({ dataRowsLength: data.length })

  const value = {
    ...sorting,
    ...filtering,
    ...selecting,
  }

  return <DataTableContext.Provider value={value}>
    {children}
  </DataTableContext.Provider>
}