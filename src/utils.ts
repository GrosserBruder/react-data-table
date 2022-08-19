import { DataTableColumn } from './NewDataTable/types';
import { NumberRange } from './Components/NumberRange/NumberRange';
import { DateRange } from './Components/DateRange/DateRange';
import { VALUE_TYPE, VALUE_TYPES } from "./const";

export type ResultCompare = -1 | 0 | 1

export const descSorting = (resultCompare: ResultCompare) => {
  if (resultCompare === -1) {
    return 1;
  }
  if (resultCompare === 1) {
    return -1
  }
  return 0
}

export const compareByAlphabetically = (a: string, b: string) => {
  if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) return -1;
  if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) return 1;
  return 0;
}

export const compareNumberOrBoolean = (a: number | boolean, b: number | boolean) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export const compareDate = (a: string | Date, b: string | Date) => {
  const aDate = new Date(a)
  const bDate = new Date(b)

  if (aDate < bDate) return -1;
  if (aDate > bDate) return 1;
  return 0;
}

export const isDateInDataRange = (date: string | Date, dateRange: DateRange) => {
  const checkFrom = dateRange.from ? new Date(date) >= new Date(dateRange.from) : true
  const checkTo = dateRange.to ? new Date(date) <= new Date(dateRange.to) : true

  return checkFrom && checkTo;
}

export const isNumberInNumberRange = (number: number, numberRange: NumberRange) => {
  const checkFrom = numberRange.from ? number >= numberRange.from : true
  const checkTo = numberRange.to ? number <= numberRange.to : true

  return checkFrom && checkTo;
}

export function primitiveOrFunction(primitiveOrFunction: Function | boolean | string | number | undefined | null, dataToFunction: { [key: string]: any }) {
  if (typeof primitiveOrFunction === "function") return primitiveOrFunction(dataToFunction)
  return primitiveOrFunction;
}

export const isEmptyDeep = (value: any): boolean => {
  if (typeof value === "object") {
    return Object.keys(value).every((x) => isEmptyDeep(x))
  }

  return !Boolean(value)
}

export const getValueType = (value: any): VALUE_TYPE => {
  switch (true) {
    case (typeof value === "string") && isNaN(+value) && !isNaN(Date.parse(value)):
      return VALUE_TYPES.DATE
    case typeof value === "boolean":
      return VALUE_TYPES.BOOLEAN
    case typeof value === "number":
      return VALUE_TYPES.NUMBER
    case typeof value === "string":
      return VALUE_TYPES.STRING
    default:
      return null
  }
}

export const mergeObjects = (first: { [key: string]: any }, second: { [key: string]: any }) => {
  const firstCopy = { ...first };
  const secondCopy = { ...second };
  return Object.assign({}, firstCopy, secondCopy)
}

export const getColumnKey = (column: DataTableColumn) => {
  return column.id ?? column.dataField
}