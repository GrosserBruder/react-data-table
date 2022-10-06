import { Column, DataItem } from "../DataTable"

export function getColumnId<T extends DataItem = DataItem>(column: Column<T>) {
  return column.id ?? column.dataField
}
export default getColumnId