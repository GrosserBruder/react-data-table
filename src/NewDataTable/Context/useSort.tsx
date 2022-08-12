import { useState, useCallback } from "react"

export type UseSortResult = {
  sortFields: string[];
  addFieldToSort: (fieldName: string) => void;
  removeFieldFromSort: (fieldName: string) => void;
}

export default function useSort(): UseSortResult {
  const [sortFields, setSortFields] = useState<Array<string>>([])

  const addFieldToSort = useCallback((fieldName: string) => {
    setSortFields((x) => [...x, fieldName])
  }, [setSortFields])

  const removeFieldFromSort = useCallback((fieldName: string) => {
    setSortFields((x) => x.filter((x) => x !== fieldName))
  }, [setSortFields])

  return { sortFields, addFieldToSort, removeFieldFromSort }
}