import { Cell, CellProps } from "@grossb/react-table"
import { getColumnKey } from "../../utils";
import { DataRow, DataTableColumn } from "../types";

export type DataTableCellProps = CellProps & {
  column: DataTableColumn
  dataRow: DataRow
}

const getValue = (column: DataTableColumn, dataRow: DataRow) => {
  if (column.valueGetter !== undefined) {
    return column.valueGetter(dataRow)
  }

  if (column.dataField === undefined) {
    return undefined
  }

  return dataRow[column.dataField]
}

function DataTableCell(props: DataTableCellProps) {
  const { column, dataRow, ...restProps } = props;

  return <Cell key={getColumnKey(column)} {...restProps}>
    {getValue(column, dataRow)}
  </Cell>
}

export default DataTableCell;