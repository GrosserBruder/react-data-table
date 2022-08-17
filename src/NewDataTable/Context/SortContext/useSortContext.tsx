import { useContext } from "react";
import { SortContext } from "./SortProvider";

export default function useSortContext() {
  const context = useContext(SortContext)

  if (!context) {
    throw new Error("useSortContext was used outside of its Provider")
  }

  return context
}