import { Column } from "../DataTable"

export function getColumnId(column: Column) {
  return column.id ?? column.dataField
}
export default getColumnId