import { createContext, useState, ReactNode, useEffect, useRef, useCallback } from 'react';
import { SORT_VALUES } from '../const';
import { HeadLineCell, BodyLineCell, TableRowProps } from '..';
import { compareByAlphabetically, compareNumberOrBoolean, ascSorting, descSorting } from "../utils"

export interface TableContextType {
  resultBodyLines: Array<TableRowProps<BodyLineCell>>
  onSearch: (columnId: string | number, value: string) => void
  onSort: (columnId: string | number, sortValue: SORT_VALUES) => void
  getSearchValueByColumnId: (columnId: string | number) => any
  getSortingValueByColumnId: (columnId: string | number) => any
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

const sortCell = (a: BodyLineCell, b: BodyLineCell) => {
  const typeValue = typeof a.value

  if (typeValue === "string") {
    return compareByAlphabetically(a.value, b.value)
  }

  if (typeValue === "number" || typeValue === "boolean") {
    return compareNumberOrBoolean(a.value, b.value)
  }

  return 0;
}

export function DataTableProvider(props: TableProviderProps) {
  const { children, initialValues } = props
  const [resultBodyLines, setResultBodyLines] = useState(initialValues?.bodyLines ?? [])
  const filters = useRef(new Map<string, string>(Object.entries(initialValues?.filters ?? {})))
  const sorting = useRef(new Map<string, string>())

  const sortLines = useCallback((a: TableRowProps<BodyLineCell>, b: TableRowProps<BodyLineCell>) => {
    const cells = a.cells
      .filter((cell) => sorting.current.has(cell.id.toString()))

    for (let i = 0; i < cells.length; i++) {
      const aCell = cells[i]
      const sortValue: SORT_VALUES = sorting.current.get(aCell.id.toString()) as SORT_VALUES

      const bCell = b.cells.find((x) => x.id === aCell.id)!

      const sortedCell = sortCell(aCell, bCell)

      if (sortedCell !== 0) {
        if (sortValue === SORT_VALUES.ASC) {
          return ascSorting(sortedCell)
        }

        if (sortValue === SORT_VALUES.DESC) {
          return descSorting(sortedCell)
        }
      }
    }

    return 0;
  }, [sorting.current])

  const filterBodyLines = useCallback(async () => {
    const filteredBodyLines = (initialValues?.bodyLines ?? [])
      .filter((line) => {
        return line.cells
          .filter((cell) => filters.current.has(cell.id.toString()))
          .every((cell) => {
            return (cell.value as string || '').toLowerCase().includes(filters.current.get(cell.id.toString())!)
          })

      })
      .sort(sortLines)

    setResultBodyLines(filteredBodyLines);
  }, [initialValues?.bodyLines, filters.current, sorting.current])

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

  const getSortingValueByColumnId = useCallback((columnId: string | number) => {
    return sorting.current.get(columnId.toString())
  }, [sorting.current])

  const onSort = useCallback((columnId: string | number, sortValue: SORT_VALUES) => {
    sorting.current.set(columnId.toString(), sortValue)

    filterBodyLines();
  }, [sorting.current])

  const value = {
    resultBodyLines,
    onSearch,
    onSort,
    getSearchValueByColumnId,
    getSortingValueByColumnId,
  }

  return <DataTableContext.Provider value={value}>
    {children}
  </DataTableContext.Provider>;
}
