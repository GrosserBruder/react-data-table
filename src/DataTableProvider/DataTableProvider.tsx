import { createContext, useState, ReactNode, useEffect, useRef, useCallback } from 'react';
import { BodyLineCell, TableRowProps } from '..';

export interface TableContextType {
  resultBodyLines: Array<TableRowProps<BodyLineCell>>
  onSearch: (columnId: string | number, value: string) => void
  getSearchValueByColumnId: (columnId: string | number) => any
}

type Filter = {
  [key: string]: any
}

type InitialValues = {
  bodyLines: Array<TableRowProps<BodyLineCell>>
  filters?: Filter
}

export type TableProviderProps = {
  children?: ReactNode,
  initialValues?: InitialValues
}

export const DataTableContext = createContext<TableContextType>(undefined!);

export function DataTableProvider(props: TableProviderProps) {
  const { children, initialValues } = props
  const [resultBodyLines, setResultBodyLines] = useState(initialValues?.bodyLines ?? [])
  const filters = useRef(new Map(Object.entries(initialValues?.filters ?? {})))

  const filterBodyLines = useCallback(async () => {
    const filteredBodyLines = (initialValues?.bodyLines ?? []).filter((line) => {
      return line.cells
        .filter((cell) => filters.current.has(cell.id.toString()))
        .every((cell) => {
          return (cell.value as string || '').toLowerCase().includes(filters.current.get(cell.id.toString()))
        })
    })

    setResultBodyLines(filteredBodyLines);
  }, [initialValues?.bodyLines, filters.current])

  const onSearch = useCallback(async (columnId: string | number, value: string) => {
    if (value === '') {
      filters.current.delete(columnId.toString())
    } else {
      filters.current.set(columnId.toString(), value.toLowerCase())
    }

    filterBodyLines()
  }, [filters.current])

  const getSearchValueByColumnId = useCallback((columnId: string | number) => {
    return filters.current.get(columnId.toString())
  }, [filters.current])

  const value = {
    resultBodyLines,
    onSearch,
    getSearchValueByColumnId,
  }

  return <DataTableContext.Provider value={value}>
    {children}
  </DataTableContext.Provider>;
}
