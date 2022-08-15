import { createContext, ReactNode, useCallback } from "react";
import { DataTableColumn } from "../types";

export type FilterContextType = {
  column?: DataTableColumn
  onAccepte?: () => void
  onReset?: () => void
}

export type FilterProviderProps = {
  children?: ReactNode,
  column: DataTableColumn
  onAccepte: () => void
  onReset: () => void
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export default function FilterProvider(props: FilterProviderProps) {
  const { column, children } = props;

  const onAccepte = () => void 0
  const onReset = () => void 0

  const value = {
    column,
    onAccepte,
    onReset,
  }

  return <FilterContext.Provider value={value}>
    {children}
  </FilterContext.Provider>
}