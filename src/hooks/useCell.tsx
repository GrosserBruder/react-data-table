import { memo, useMemo } from "react"
import { Column, DataItem } from "../DataTable"
import { Cell } from "@grossb/react-table"
import { getColumnId, primitiveOrFunction } from "../helpers"

const MemoCell = memo(Cell)

function getValue(column: Column, dataItem: DataItem) {
  if (column.valueGetter !== undefined) {
    return column.valueGetter(dataItem)
  }

  if (column.dataField === undefined) {
    return undefined
  }

  return dataItem[column.dataField]
}

function createBodyCells(columns: Array<Column>, dataItem: DataItem) {
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