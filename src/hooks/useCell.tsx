import { memo, useMemo } from "react"
import { Column, DataItem } from "../DataTable"
import { Cell } from "@grossb/react-table"
import { getColumnId, primitiveOrFunction } from "../helpers"

const MemoCell = memo(Cell)

function getValue<T extends DataItem = DataItem>(column: Column<T>, dataItem: T) {
  if (column.valueGetter !== undefined) {
    return column.valueGetter(dataItem)
  }

  if (column.dataField === undefined) {
    return undefined
  }

  return dataItem[column.dataField]
}

function createBodyCells<T extends DataItem = DataItem>(columns: Array<Column<T>>, dataItem: T) {
  return columns.map((column) => {
    return <MemoCell key={getColumnId(column)} {...primitiveOrFunction(column.bodyCellProps, dataItem)}>
      {getValue(column, dataItem)}
    </MemoCell>
  })
}

function createHeadCells(columns: Array<Column>) {
  return columns.map((column) => {
    return <MemoCell key={getColumnId(column)} component="th" {...column.headCellProps}>
      {column.header}
    </MemoCell>
  })
}

export function useCell() {
  return useMemo(() => ({
    getValue,
    createBodyCells,
    createHeadCells,
  }), [])
}

export default useCell