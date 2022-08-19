import { useCallback, useLayoutEffect, useState } from "react"
import { SELECT_ALL_STATUSES } from "../../const"
import { DataRow } from "../types"

export type useSelectingRowsProviderProps = {
  defaultSelectedRows?: Array<DataRow>
  defaultIsSelectAll?: SELECT_ALL_STATUSES,
  dataRowsLength?: number
}

export type useSelectingRowsValue = {
  selectedRows: DataRow[];
  selectAllStatus: SELECT_ALL_STATUSES;
  addSelectedRows: (rows: DataRow | Array<DataRow>) => void;
  removeSelectedRows: (rows: DataRow | Array<DataRow>) => void;
  resetSelectedBox: () => void;
  getSelectStatus: (row: DataRow) => SELECT_ALL_STATUSES.NOT_SELECTED | SELECT_ALL_STATUSES.SELECTED
}

export default function useSelectingRows(props: useSelectingRowsProviderProps) {
  const {
    defaultSelectedRows = [],
    defaultIsSelectAll = SELECT_ALL_STATUSES.NOT_SELECTED,
    dataRowsLength
  } = props;

  const [selectedRows, setSelectedRowsState] = useState(defaultSelectedRows)
  const [selectAllStatus, setSelectAllStatus] = useState<SELECT_ALL_STATUSES>(defaultIsSelectAll)


  useLayoutEffect(() => {
    checkSelectAllStatus(selectedRows)
  }, [selectedRows])

  const checkSelectAllStatus = useCallback(async (selectedRows: Array<DataRow>) => {
    if (dataRowsLength === undefined) {
      return setSelectAllStatus(SELECT_ALL_STATUSES.NOT_SELECTED)
    }

    switch (true) {
      case dataRowsLength === selectedRows.length:
        return setSelectAllStatus(SELECT_ALL_STATUSES.SELECTED)
      case selectedRows.length > 0 && selectedRows.length < dataRowsLength:
        return setSelectAllStatus(SELECT_ALL_STATUSES.INDETERMINATE)
      default:
        return setSelectAllStatus(SELECT_ALL_STATUSES.NOT_SELECTED)
    }
  }, [dataRowsLength])

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

  const resetSelectedBox = () => {
    setSelectedRowsState([])
    checkSelectAllStatus([])
  }

  const getSelectStatus = useCallback((row: DataRow) => {
    const selectRow = selectedRows.find((x) => x.id === row.id)

    if (selectRow === undefined) return SELECT_ALL_STATUSES.NOT_SELECTED

    return SELECT_ALL_STATUSES.SELECTED
  }, [selectedRows])

  return {
    selectedRows,
    selectAllStatus,
    addSelectedRows,
    removeSelectedRows,
    resetSelectedBox,
    getSelectStatus,
  }
}