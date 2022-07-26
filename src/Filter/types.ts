import { FILTER_FIELD_KEY, SORT_VALUES, VALUE_TYPE } from "../const"
import { CheckBoxProps } from "../Components/Checkbox/Checkbox"
import DateRange from "../Components/DateRange/DateRange"
import NumberRange from "../Components/NumberRange/NumberRange"
import { FC } from "react"

export type BooleanFilterProps = {
  trueOptionProps?: Omit<CheckBoxProps, "onClick" | "defaultValue" | "value" | "checked">,
  falseOptionToProps?: Omit<CheckBoxProps, "onClick" | "defaultValue" | "value" | "checked">,
  onChange?: (value: boolean | undefined) => void,
  defaultValue?: boolean
}

export type FilterValue = {
  [FILTER_FIELD_KEY.SEARCH]?: string,
  [FILTER_FIELD_KEY.DATE_RANGE]?: DateRange
  [FILTER_FIELD_KEY.NUMBER_RANGE]?: NumberRange
  [FILTER_FIELD_KEY.BOOLEAN_FILTER]?: boolean
  [FILTER_FIELD_KEY.SORT]?: SORT_VALUES
  [key: string]: any
}

export type FILTER_SHOW = {
  [FILTER_FIELD_KEY.SEARCH]?: boolean,
  [FILTER_FIELD_KEY.DATE_RANGE]?: boolean
  [FILTER_FIELD_KEY.NUMBER_RANGE]?: boolean
  [FILTER_FIELD_KEY.BOOLEAN_FILTER]?: boolean
  [FILTER_FIELD_KEY.SORT]?: boolean
  [key: string]: boolean | undefined
}

export type FilterProps = {
  columnValue: any
  onFilterChange?: (value: FilterValue) => void,
  initialFilters?: FilterValue,
  additionalFilter?: FC<AdditionalFilterProps>
  show?: FILTER_SHOW
}

export type AdditionalFilterProps = {
  columnValue: any,
  valueType: VALUE_TYPE,
  filterValues: FilterValue,
  show?: FILTER_SHOW | undefined,
  setFilter: (key: string, value: any) => void
}