import { Cell } from "@grossb/react-table";
import { Column, DataItem } from "./DataTable";
import { getColumnId, primitiveOrFunction } from "./helpers";

export type DataTableBodyCellProps<T extends DataItem> = {
  column: Column<T>
  dataItem: T
}

function getValue<T extends DataItem = DataItem>(column: Column<T>, dataItem: T) {
  if (column.valueGetter !== undefined) {
    return column.valueGetter(dataItem)
  }

  if (column.dataField === undefined) {
    return undefined
  }

  return dataItem[column.dataField]
}

function DataTableBodyCell<T extends DataItem>(props: DataTableBodyCellProps<T>) {
  const { column, dataItem } = props;

  return <Cell key={getColumnId(column)} {...primitiveOrFunction(column.bodyCellProps, dataItem)}>
    {getValue(column, dataItem)}
  </Cell>
}

export default DataTableBodyCell;