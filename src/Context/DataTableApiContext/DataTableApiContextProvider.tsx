import { createContext, useRef } from "react";
import { DataTableApi, ProcessedDataTableProps } from "../../NewDataTable/types";
import { useBodyApiHook } from "../ApiHooks/useBodyApiHook";

export type DataTableApiContextProviderProps = ProcessedDataTableProps & {
  children?: any,
  props: ProcessedDataTableProps,
}

export const DataTableApiContext = createContext<DataTableApi | undefined>(undefined);

export default function DataTableApiContextProvider(props: DataTableApiContextProviderProps) {
  const apiRef = useRef<DataTableApi>({})

  const bodyApi = useBodyApiHook(apiRef, props)

  return <DataTableApiContext.Provider value={apiRef.current}>
    {props.children}
  </DataTableApiContext.Provider>
}