import { useContext } from "react";
import { FilterContext } from "./FilterProvider";

export default function useFilterContext() {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error("useFilterContext was used outside of its Provider")
  }

  return context
}