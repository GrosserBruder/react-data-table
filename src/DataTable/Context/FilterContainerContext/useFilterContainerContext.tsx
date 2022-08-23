import { useContext } from "react";
import { FilterContainerContext } from "./FilterContainerProvider";

export default function useFilterContainerContext() {
  const context = useContext(FilterContainerContext)

  if (!context) {
    throw new Error("useFilterContainerContext was used outside of its Provider")
  }

  return context
}