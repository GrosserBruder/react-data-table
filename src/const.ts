export enum SORT_VALUES {
  NOT_SELECTED = 'not_selected',
  ASC = 'asc',
  DESC = 'desc'
}

export const enum VALUE_TYPES {
  DATE = "date",
  NUMBER = "number",
  BOOLEAN = "boolean",
  STRING = "string",
}

export type VALUE_TYPE = VALUE_TYPES | null

export const enum FILTER_FIELD_KEY {
  SEARCH = "search",
  NUMBER_RANGE = "numberRange",
  DATE_RANGE = "dateRange",
  BOOLEAN_FILTER = "boolean_filter",
  SORT = "sort"
}