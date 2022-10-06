import { useCallback, useLayoutEffect, useMemo, useState } from "react"
import { SELECT_STATUSES } from "../constants/const"
import { DataItem } from "../DataTable"

type SeletedItem = DataItem["id"]

export function useSelectable<T extends DataItem>(allDataLength: number) {
  const [selectedItemIds, setSelectedItemIds] = useState<Array<SeletedItem>>([])
  const [selectAllStatus, setSelectAllStatus] = useState<SELECT_STATUSES>(SELECT_STATUSES.NOT_SELECTED)

  const checkSelectAllStatus = useCallback(() => {
    if (allDataLength === undefined) {
      return setSelectAllStatus(SELECT_STATUSES.NOT_SELECTED)
    }

    switch (true) {
      case allDataLength === selectedItemIds.length && allDataLength !== 0:
        return setSelectAllStatus(SELECT_STATUSES.SELECTED)
      case selectedItemIds.length > 0 && selectedItemIds.length < allDataLength:
        return setSelectAllStatus(SELECT_STATUSES.INDETERMINATE)
      default:
        return setSelectAllStatus(SELECT_STATUSES.NOT_SELECTED)
    }
  }, [selectedItemIds, allDataLength])

  useLayoutEffect(() => {
    checkSelectAllStatus()
  }, [checkSelectAllStatus])

  const addSelected = useCallback((items: T | Array<T>) => {
    const arrayItemIds = (Array.isArray(items) ? items : [items]).map((x) => x.id)

    setSelectedItemIds((prevSelected) => [...prevSelected, ...arrayItemIds])
  }, [])

  const removeSelected = useCallback((items: T | Array<T>) => {
    const removeItemIds = (Array.isArray(items) ? items : [items]).map((x) => x.id)

    const newSelected = (prevSelected: Array<SeletedItem>) => prevSelected.filter((prevSelectedItemId) => {
      return removeItemIds.find((removeId) => removeId === prevSelectedItemId) === undefined
    })

    setSelectedItemIds(newSelected)
  }, [])

  const isSelected = useCallback((item: T) => {
    const selectItemId = selectedItemIds.find((x) => x === item.id)

    if (selectItemId === undefined) return false

    return true
  }, [selectedItemIds])

  const resetSelected = useCallback(() => {
    setSelectedItemIds([])
    // checkSelectAllStatus([])
  }, [setSelectedItemIds])

  return useMemo(() => ({
    selectedItemIds,
    selectAllStatus,
    addSelected,
    removeSelected,
    isSelected,
    resetSelected,
  }), [selectedItemIds,
    selectAllStatus,
    addSelected,
    removeSelected,
    isSelected,
    resetSelected])
}

export default useSelectable