import { createContext, ReactNode } from "react";
import { ColumnFilter, DataTableColumn } from "../../types";

export type FilterContainerContextType = {
  column: DataTableColumn
  onAccepte: (fieldKey: string, filter: ColumnFilter) => void
  onReset: (fieldKey: string) => void
  filters: ColumnFilter
}

export type FilterContainerProviderProps = {
  children?: ReactNode,
  column: DataTableColumn,
  onAccepte: (fieldKey: string, filter: ColumnFilter) => void,
  onReset: (fieldKey: string) => void,
  filters: ColumnFilter
}

export const FilterContainerContext = createContext<FilterContainerContextType | undefined>(undefined);

export default function FilterContainerProvider(props: FilterContainerProviderProps) {
  const { column, children, onAccepte, onReset, filters } = props;

  const value = {
    column,
    onAccepte,
    onReset,
    filters,
  }

  return <FilterContainerContext.Provider value={value}>
    {children}
  </FilterContainerContext.Provider>
}