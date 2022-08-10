import { useContext } from "react";
import { DataTableApiContext } from "./DataTableApiContextProvider";

export default function useDataTableApiContext() {
  const context = useContext(DataTableApiContext)

  if (!context) {
    throw new Error("useDataTableContext was used outside of its Provider")
  }

  return context
}