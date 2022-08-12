import { useContext } from "react";
import { DataTableContext } from "./DataTableProvider";

export default function useDataTableBodyRowsContext() {
  const context = useContext(DataTableContext)

  if (!context) {
    throw new Error("useDataTableContext was used outside of its Provider")
  }

  return context
}