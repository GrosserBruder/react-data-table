import { createContext, useState, useMemo } from "react";
import { DataTableBodyRow } from "../../NewDataTable/types";

export type DataTableBodyRowsContextType = {
  bodyRows: DataTableBodyRow[],
  setBodyRows: (value: Array<DataTableBodyRow> | ((prevValue: Array<DataTableBodyRow>) => Array<DataTableBodyRow>)) => void,
}

export type DataTableContextProviderProps = {
  children?: any,
  bodyRows?: Array<DataTableBodyRow>
}

export const DataTableBodyRowsContext = createContext<DataTableBodyRowsContextType | undefined>(undefined);

export default function DataTableBodyRowsContextProvider(props: DataTableContextProviderProps) {
  const [bodyRows, setBodyRows] = useState<Array<DataTableBodyRow>>(props.bodyRows ?? [])

  const value = useMemo(() => ({
    bodyRows,
    setBodyRows,
  }), [bodyRows, setBodyRows])

  return <DataTableBodyRowsContext.Provider value={value}>
    {props.children}
  </DataTableBodyRowsContext.Provider>
}