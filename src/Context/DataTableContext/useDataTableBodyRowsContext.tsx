import { useContext } from "react";
import { DataTableBodyRowsContext } from "./DataTableBodyRowsContextProvider";

export default function useDataTableBodyRowsContext() {
  const context = useContext(DataTableBodyRowsContext)

  if (!context) {
    throw new Error("useDataTableContext was used outside of its Provider")
  }

  return context
}