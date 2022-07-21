import { FC, useCallback, useRef } from "react";
import { FILTER_FIELD_KEY, VALUE_TYPES, SORT_VALUES, VALUE_TYPE } from "../const";
import DateRange from "../Components/DateRange/DateRange";
import NumberRange from "../Components/NumberRange/NumberRange";
import SearchField from "../Components/SearchField/SearchField";
import BooleanFilter from "./BooleanFilter";
import { useValueType } from "./hooks";
import SelectList, { SelectListItem } from "../Components/SelectList/SelectList";
import Button from "../Components/Button";
import Stack from "@mui/material/Stack/Stack";
import "../styles/Filter.scss"

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

const SORT_LIST_VALUES: Array<SelectListItem> = [
  { id: SORT_VALUES.NOT_SELECTED, value: "Не выбрано" },
  { id: SORT_VALUES.ASC, value: "По возрастанию" },
  { id: SORT_VALUES.DESC, value: "По убыванию" },
]

export function Filter(props: FilterProps) {
  const { columnValue, onFilterChange, initialFilters = {}, additionalFilter, show } = props;
  const valueType = useValueType(columnValue)
  const filterValues = useRef(initialFilters)

  const showSearchField = valueType === VALUE_TYPES.STRING || valueType === VALUE_TYPES.NUMBER
  const showNumberRangeFilter = valueType === VALUE_TYPES.NUMBER
  const showDateRangeFilter = valueType === VALUE_TYPES.DATE
  const showBooleanFilter = valueType === VALUE_TYPES.BOOLEAN

  const setFilter = useCallback((key: string, value: any) => {
    filterValues.current = Object.assign({}, filterValues.current, { [key]: value })
  }, [filterValues])

  const onSearchHandler = useCallback((value: string) => {
    setFilter(FILTER_FIELD_KEY.SEARCH, value)
  }, [filterValues])

  const onNumberRangeChange = useCallback((value: NumberRange) => {
    setFilter(FILTER_FIELD_KEY.NUMBER_RANGE, value)
  }, [filterValues])

  const onDateRangeChange = useCallback((value: DateRange) => {
    setFilter(FILTER_FIELD_KEY.DATE_RANGE, value)
  }, [filterValues])

  const onBooleanFilterChange = useCallback((value: boolean | undefined) => {
    setFilter(FILTER_FIELD_KEY.BOOLEAN_FILTER, value)
  }, [filterValues])

  const onSortChange = useCallback((value: SelectListItem) => {
    setFilter(FILTER_FIELD_KEY.SORT, value.id)
  }, [filterValues])

  const onAccepteButtonClick = useCallback(() => {
    onFilterChange?.(filterValues.current)
  }, [filterValues])

  const onResetButtonClick = useCallback(() => {
    filterValues.current = {}
    onFilterChange?.(filterValues.current)
  }, [filterValues])

  return <div className="data-table__filter">
    {
      (show?.search ?? showSearchField) && <SearchField
        autoFocus
        withoutButton
        onChange={onSearchHandler}
        defaultValue={filterValues?.current[FILTER_FIELD_KEY.SEARCH]}
        fullWidth
      />
    }
    {
      (show?.numberRange ?? showNumberRangeFilter) && <NumberRange
        onChange={onNumberRangeChange}
        defaultValue={filterValues?.current[FILTER_FIELD_KEY.NUMBER_RANGE]}
      />
    }
    {
      (show?.dateRange ?? showDateRangeFilter) && <DateRange
        onChange={onDateRangeChange}
        defaultValue={filterValues?.current[FILTER_FIELD_KEY.DATE_RANGE]}
      />
    }
    {
      (show?.boolean_filter ?? showBooleanFilter) && <BooleanFilter
        onChange={onBooleanFilterChange}
        defaultValue={filterValues?.current[FILTER_FIELD_KEY.BOOLEAN_FILTER]}
      />
    }
    {
      additionalFilter?.({
        valueType,
        filterValues,
        show,
        columnValue,
        setFilter,
      })
    }
    {
      (show?.boolean_filter ?? true) && <SelectList
        list={SORT_LIST_VALUES}
        label="Сортировать"
        defaultValue={SORT_LIST_VALUES.find((x) => x.id === filterValues?.current[FILTER_FIELD_KEY.SORT]) || SORT_LIST_VALUES[0]}
        onChange={onSortChange}
      />
    }

    <Stack direction="row" spacing={1} justifyContent="center">
      <Button onClick={onAccepteButtonClick} size="small">Применить</Button>
      <Button color="error" onClick={onResetButtonClick} size="small">Сбросить</Button>
    </Stack>
  </div>
}

export default Filter