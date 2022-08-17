import { useCallback, useState } from "react"
import { SELECT_ALL_STATUSES } from "../../const"
import { DataRow } from "../types"

export type SelectedRowsProviderProps = {
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
}

export default function useSelectingRows(props: SelectedRowsProviderProps) {
  const {
    defaultSelectedRows = [],
    defaultIsSelectAll = SELECT_ALL_STATUSES.NOT_SELECTED,
    dataRowsLength
  } = props;

  const [selectedRows, setSelectedRowsState] = useState(defaultSelectedRows)
  const [selectAllStatus, setSelectAllStatus] = useState<SELECT_ALL_STATUSES>(defaultIsSelectAll)

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
    const newSelectedRows = [...selectedRows, ...arrayRows]

    setSelectedRowsState(newSelectedRows)
    checkSelectAllStatus(newSelectedRows)
  }, [selectedRows, setSelectedRowsState])

  const removeSelectedRows = useCallback((rows: DataRow | Array<DataRow>) => {
    const isArray = Array.isArray(rows)

    const removeRows = isArray ? rows : [rows]

    const newSelectedRows = selectedRows.filter((selectedRow) => {
      return removeRows.find((removeRow) => removeRow.id === selectedRow.id) === undefined
    })

    setSelectedRowsState(newSelectedRows)
    checkSelectAllStatus(newSelectedRows)
  }, [selectedRows, setSelectedRowsState])

  const resetSelectedBox = () => {
    setSelectedRowsState([])
    checkSelectAllStatus([])
  }

  return {
    selectedRows,
    selectAllStatus,
    addSelectedRows,
    removeSelectedRows,
    resetSelectedBox,
  }
}