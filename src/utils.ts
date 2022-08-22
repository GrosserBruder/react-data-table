import { DataTableColumn } from './DataTable/types';

export type ResultCompare = -1 | 0 | 1

export function primitiveOrFunction(primitiveOrFunction: Function | boolean | string | number | undefined | null, dataToFunction: { [key: string]: any }) {
  if (typeof primitiveOrFunction === "function") return primitiveOrFunction(dataToFunction)
  return primitiveOrFunction;
}

export const getColumnKey = (column: DataTableColumn) => {
  return column.id ?? column.dataField
}