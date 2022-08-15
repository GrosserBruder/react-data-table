import { createContext, ReactNode, useCallback } from "react";
import { ColumnFilter, DataTableColumn } from "../../types";

export type FilterContextType = {
  column: DataTableColumn
  onAccepte: (fieldKey: string, filter: ColumnFilter) => void
  onReset: (fieldKey: string) => void
}

export type FilterProviderProps = {
  children?: ReactNode,
  column: DataTableColumn,
  onAccepte: (fieldKey: string, filter: ColumnFilter) => void,
  onReset: (fieldKey: string) => void,
  filters: ColumnFilter
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export default function FilterProvider(props: FilterProviderProps) {
  const { column, children, onAccepte, onReset, filters } = props;

  const value = {
    column,
    onAccepte,
    onReset,
    filters,
  }

  return <FilterContext.Provider value={value}>
    {children}
  </FilterContext.Provider>
}