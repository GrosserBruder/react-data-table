import { useContext } from "react";
import { DataTableContext } from "./DataTableProvider";

export default function useDataTableContext() {
  const context = useContext(DataTableContext)

  if (!context) {
    throw new Error("useDataTableContext was used outside of its Provider")
  }

  return context
}