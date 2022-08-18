import { useContext } from "react";
import { SelectedRowsContext } from "./SelectedRowsProvider";

export default function useSelectedRowsContext() {
  const context = useContext(SelectedRowsContext)

  if (!context) {
    throw new Error("useSelectedRowsContext was used outside of its Provider")
  }

  return context
}