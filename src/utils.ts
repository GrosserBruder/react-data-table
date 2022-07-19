import { NumberRange } from './Components/NumberRange/NumberRange';
import { DateRange } from './Components/DateRange/DateRange';
import { FilterValue } from "./Filter/Filter";
import { FILTER_TYPES } from "./const";

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

export const compareByAlphabetically = (a: any, b: any) => {
  if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) return -1;
  if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) return 1;
  return 0;
}

export const compareNumberOrBoolean = (a: any, b: any) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export const compareDate = (a: any, b: any) => {
  const aDate = new Date(a)
  const bDate = new Date(b)

  if (aDate < bDate) return -1;
  if (aDate > bDate) return 1;
  return 0;
}

export const isDateInDataRange = (date: string, dateRange: DateRange) => {
  if (!dateRange.from || !dateRange.to) return;

  const checkFrom = new Date(date) >= new Date(dateRange.from)
  const checkTo = new Date(date) <= new Date(dateRange.to)

  return checkFrom && checkTo;
}

export const isNumberInNumberRange = (number: number, numberRange: NumberRange) => {
  if (!numberRange.from || !numberRange.to) return;

  const checkFrom = number >= numberRange.from
  const checkTo = number <= numberRange.to

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


export const isFilterSetted = (filterValue: FilterValue) => {
  return isEmptyDeep(filterValue)
}

export const getFilterType = (value: any) => {
  switch (true) {
    case (typeof value === "string") && !isNaN(Date.parse(value)):
      return FILTER_TYPES.DATE
    case typeof value === "boolean":
      return FILTER_TYPES.BOOLEAN
    case typeof value === "number":
      return FILTER_TYPES.NUMBER
    case typeof value === "string":
      return FILTER_TYPES.STRING
    default:
      return null
  }
}