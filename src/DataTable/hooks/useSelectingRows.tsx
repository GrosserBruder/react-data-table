import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { SELECT_STATUSES } from "../../const"
import { DataRow } from "../types"

export type useSelectingRowsProps = {
  defaultSelectedRows?: Array<DataRow>
  dataRowsLength?: number
  onSelectedRowsChange?: (sselectedRows: Array<DataRow>) => void
}

export type useSelectingRowsValue = {
  selectedRows: DataRow[];
  selectAllStatus: SELECT_STATUSES;
  addSelectedRows: (rows: DataRow | Array<DataRow>) => void;
  removeSelectedRows: (rows: DataRow | Array<DataRow>) => void;
  resetSelectedRows: () => void;
  getSelectStatus: (row: DataRow) => SELECT_STATUSES.NOT_SELECTED | SELECT_STATUSES.SELECTED
}

export default function useSelectingRows(props: useSelectingRowsProps) {
  const {
    defaultSelectedRows = [],
    dataRowsLength,
    onSelectedRowsChange,
  } = props;

  const [selectedRows, setSelectedRowsState] = useState(defaultSelectedRows)
  const [selectAllStatus, setSelectAllStatus] = useState<SELECT_STATUSES>(SELECT_STATUSES.NOT_SELECTED)

  useEffect(() => {
    onSelectedRowsChange?.(selectedRows)
  }, [onSelectedRowsChange, selectedRows])

  const checkSelectAllStatus = useCallback(async (selectedRows: Array<DataRow>) => {
    if (dataRowsLength === undefined) {
      return setSelectAllStatus(SELECT_STATUSES.NOT_SELECTED)
    }

    switch (true) {
      case dataRowsLength === selectedRows.length && dataRowsLength !== 0:
        return setSelectAllStatus(SELECT_STATUSES.SELECTED)
      case selectedRows.length > 0 && selectedRows.length < dataRowsLength:
        return setSelectAllStatus(SELECT_STATUSES.INDETERMINATE)
      default:
        return setSelectAllStatus(SELECT_STATUSES.NOT_SELECTED)
    }
  }, [dataRowsLength])

  useLayoutEffect(() => {
    checkSelectAllStatus(selectedRows)
  }, [checkSelectAllStatus, selectedRows, dataRowsLength])

  const addSelectedRows = useCallback((rows: DataRow | Array<DataRow>) => {
    const isArray = Array.isArray(rows)

    const arrayRows = isArray ? rows : [rows]

    setSelectedRowsState((prevSelectedRows) => [...prevSelectedRows, ...arrayRows])
  }, [setSelectedRowsState])

  const removeSelectedRows = useCallback((rows: DataRow | Array<DataRow>) => {
    const isArray = Array.isArray(rows)

    const removeRows = isArray ? rows : [rows]

    const newSelectedRows = (prevSelectedRows: Array<DataRow>) => prevSelectedRows.filter((selectedRow) => {
      return removeRows.find((removeRow) => removeRow.id === selectedRow.id) === undefined
    })

    setSelectedRowsState(newSelectedRows)
  }, [setSelectedRowsState])

  const resetSelectedRows = useCallback(() => {
    setSelectedRowsState([])
    checkSelectAllStatus([])
  }, [setSelectedRowsState, checkSelectAllStatus])

  const getSelectStatus = useCallback((row: DataRow) => {
    const selectRow = selectedRows.find((x) => x.id === row.id)

    if (selectRow === undefined) return SELECT_STATUSES.NOT_SELECTED

    return SELECT_STATUSES.SELECTED
  }, [selectedRows])

  return {
    selectedRows,
    selectAllStatus,
    addSelectedRows,
    removeSelectedRows,
    resetSelectedRows,
    getSelectStatus,
  }
}