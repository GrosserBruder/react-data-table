import { useCallback, useLayoutEffect, useMemo, useState } from "react"
import { SELECT_STATUSES } from "../constants/const"
import { DataItem } from "../DataTable"

export function useSelectable<T extends DataItem>(allDataLength: number) {
  const [selected, setSelected] = useState<Array<T>>([])
  const [selectAllStatus, setSelectAllStatus] = useState<SELECT_STATUSES>(SELECT_STATUSES.NOT_SELECTED)

  const checkSelectAllStatus = useCallback(() => {
    if (allDataLength === undefined) {
      return setSelectAllStatus(SELECT_STATUSES.NOT_SELECTED)
    }

    switch (true) {
      case allDataLength === selected.length && allDataLength !== 0:
        return setSelectAllStatus(SELECT_STATUSES.SELECTED)
      case selected.length > 0 && selected.length < allDataLength:
        return setSelectAllStatus(SELECT_STATUSES.INDETERMINATE)
      default:
        return setSelectAllStatus(SELECT_STATUSES.NOT_SELECTED)
    }
  }, [selected, allDataLength])

  useLayoutEffect(() => {
    checkSelectAllStatus()
  }, [checkSelectAllStatus])

  const addSelected = useCallback((items: T | Array<T>) => {
    const arrayItems = Array.isArray(items) ? items : [items]

    setSelected((prevSelected) => [...prevSelected, ...arrayItems])
  }, [])

  const removeSelected = useCallback((items: T | Array<T>) => {
    const removeItems = Array.isArray(items) ? items : [items]

    const newSelected = (prevSelected: Array<T>) => prevSelected.filter((selectedItem) => {
      return removeItems.find((removeItem) => removeItem.id === selectedItem.id) === undefined
    })

    setSelected(newSelected)
  }, [])

  const isSelected = useCallback((item: T) => {
    const selectItem = selected.find((x) => x.id === item.id)

    if (selectItem === undefined) return false

    return true
  }, [selected])

  const resetSelected = useCallback(() => {
    setSelected([])
    // checkSelectAllStatus([])
  }, [setSelected])

  return useMemo(() => ({
    selected,
    selectAllStatus,
    addSelected,
    removeSelected,
    isSelected,
    resetSelected,
  }), [selected,
    selectAllStatus,
    addSelected,
    removeSelected,
    isSelected,
    resetSelected])
}

export default useSelectable