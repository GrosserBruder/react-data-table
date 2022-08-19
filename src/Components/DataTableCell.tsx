import { Cell } from "@grossb/react-table"
import { CellPropsCommunity, DataRow, DataTableColumn } from "../DataTable/types";

export type DataTableCellProps = CellPropsCommunity & {
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

  return <Cell {...restProps}>
    {getValue(column, dataRow)}
  </Cell>
}

export default DataTableCell;