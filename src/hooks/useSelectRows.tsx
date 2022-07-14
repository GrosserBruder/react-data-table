import { useCallback, useMemo, useState } from "react"

export function useSelectRows<T>(fieldNameForCompare: keyof T = "id" as keyof T, initialArray?: Array<T>) {
  const [selectedRows, setSelectedRows] = useState<Array<T>>(initialArray ?? [])

  const addToSelectedRows = useCallback((row: T) => {
    setSelectedRows([...selectedRows, row])
  }, [selectedRows])

  const removeFromSelectedRows = useCallback((row: T) => {
    setSelectedRows(selectedRows.filter((x) => x[fieldNameForCompare] !== row[fieldNameForCompare]))
  }, [selectedRows])


  const isRowSelected = useCallback((row: T) => {
    return selectedRows.findIndex((x) => x[fieldNameForCompare] === row[fieldNameForCompare]) !== -1
  }, [selectedRows])

  const resetSelectedRows = useCallback((rows: Array<T>) => {
    setSelectedRows(rows)
  }, [setSelectedRows])

  return {
    selectedRows,
    addToSelectedRows,
    removeFromSelectedRows,
    isRowSelected,
    resetSelectedRows
  }
}

export default useSelectRows;