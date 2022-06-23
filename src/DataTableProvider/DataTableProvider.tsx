import { createContext, useState, ReactNode, useEffect } from 'react';
import { BodyLineCell, TableRowProps } from '..';

export interface TableContextType {
  resultBodyLines: Array<TableRowProps<BodyLineCell>>
  onSearch: (columnId: string | number, value: string) => void
  getSearchValueByColumnId: (columnId: string | number) => any
}

type InitialValues = {
  bodyLines: Array<TableRowProps<BodyLineCell>>
}

export type TableProviderProps = {
  children?: ReactNode,
  initialValues?: InitialValues
}

export const DataTableContext = createContext<TableContextType>(undefined!);

export function DataTableProvider(props: TableProviderProps) {
  const { children } = props
  const [initialValues, setInitialValues] = useState<InitialValues | undefined>(props.initialValues);
  const [resultBodyLines, setResultBodyLines] = useState(initialValues?.bodyLines ?? [])
  const [filters, setFilters] = useState(new Map())

  useEffect(() => {
    setInitialValues(props.initialValues)
  }, [props.initialValues?.bodyLines])

  useEffect(() => {
    filterBodyLines()
  }, [initialValues?.bodyLines])

  const filterBodyLines = async () => {
    const filteredBodyLines = (initialValues?.bodyLines ?? []).filter((line) => {
      return line.cells
        .filter((cell) => filters.has(cell.id))
        .every((cell) => {
          return (cell.value as string || '').toLowerCase().includes(filters.get(cell.id))
        })
    })
    setResultBodyLines(filteredBodyLines);
  }

  const onSearch = async (columnId: string | number, value: string) => {
    if (value === '') {
      filters.delete(columnId)
    } else {
      filters.set(columnId, value.toLowerCase())
    }

    filterBodyLines()
  }

  const getSearchValueByColumnId = (columnId: string | number) => {
    return filters.get(columnId)
  }

  const value = {
    resultBodyLines,
    onSearch,
    getSearchValueByColumnId,
  }

  return <DataTableContext.Provider value={value}>
    {children}
  </DataTableContext.Provider>;
}
