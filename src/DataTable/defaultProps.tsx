import { FilterValue } from "../Filter/Filter"
import { compareByAlphabetically, compareNumberOrBoolean, descSorting, isDateInDataRange, isNumberInNumberRange } from "../utils"
import { FILTER_FIELD_KEY, SORT_VALUES } from "../const"
import { BodyLineCell } from "./DataTable"

export const filterCheckers = {
  [FILTER_FIELD_KEY.BOOLEAN_FILTER]: (cell: BodyLineCell, filterValue?: FilterValue) => filterValue?.boolean ? cell.value === filterValue.boolean : true,
  [FILTER_FIELD_KEY.DATE_RANGE]: (cell: BodyLineCell, filterValue?: FilterValue) => filterValue?.dateRange ? isDateInDataRange(cell.value, filterValue.dateRange) : true,
  [FILTER_FIELD_KEY.NUMBER_RANGE]: (cell: BodyLineCell, filterValue?: FilterValue) => filterValue?.numberRange ? isNumberInNumberRange(cell.value, filterValue.numberRange) : true,
  [FILTER_FIELD_KEY.SEARCH]: (cell: BodyLineCell, filterValue?: FilterValue) => Boolean(filterValue?.search) ? (cell.value?.toString() || '').toLowerCase().includes(filterValue?.search) : true,
}

const sortCell = (a: BodyLineCell, b: BodyLineCell) => {
  const typeValue = typeof a.value

  if (typeValue === "string") {
    return compareByAlphabetically(a.value, b.value)
  }

  if (typeValue === "number" || typeValue === "boolean") {
    return compareNumberOrBoolean(a.value, b.value)
  }

  return 0;
}

export const filterComparers = {
  [FILTER_FIELD_KEY.SORT]: (first: BodyLineCell, second: BodyLineCell, filterValue?: FilterValue) => {
    const sortedCell = sortCell(first, second)

    if (sortedCell === 0) {
      return 0;
    }

    if (filterValue?.sort === SORT_VALUES.DESC) {
      return descSorting(sortedCell)
    }

    return sortedCell
  }
}