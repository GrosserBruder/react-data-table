import { useCallback, useRef } from "react";
import { FILTER_FIELD_KEY, FILTER_TYPES, SORT_VALUES } from "../const";
import DateRange from "../Components/DateRange/DateRange";
import NumberRange from "../Components/NumberRange/NumberRange";
import SearchField from "../Components/SearchField/SearchField";
import BooleanFilter from "./BooleanFilter";
import { useFilterType } from "./hooks";
import SelectList, { SelectListItem } from "../Components/SelectList/SelectList";
import Button from "../Components/Button";
import Stack from "@mui/material/Stack/Stack";

export type FilterValue = {
  search?: string,
  dateRange?: DateRange
  numberRange?: NumberRange
  boolean?: boolean
  sort?: SORT_VALUES
  [key: string]: any
}

export type FilterProps = {
  columnValue: any
  onFilterChange?: (value: FilterValue) => void,
  initialFilters?: FilterValue
}

const SORT_LIST_VALUES: Array<SelectListItem> = [
  { id: SORT_VALUES.NOT_SELECTED, value: "Не выбрано" },
  { id: SORT_VALUES.ASC, value: "По возрастанию" },
  { id: SORT_VALUES.DESC, value: "По убыванию" },
]

export function Filter(props: FilterProps) {
  const { columnValue, onFilterChange, initialFilters = {} } = props;
  const filterType = useFilterType(columnValue)
  const filterValues = useRef(initialFilters)

  const showSearchField = filterType === FILTER_TYPES.STRING || filterType === FILTER_TYPES.NUMBER
  const showNumberRangeFilter = filterType === FILTER_TYPES.NUMBER
  const showDateRangeFilter = filterType === FILTER_TYPES.DATE
  const showBooleanFilter = filterType === FILTER_TYPES.BOOLEAN

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

  return <div>
    {
      showSearchField && <SearchField
        autoFocus
        withoutButton
        onChange={onSearchHandler}
        defaultValue={filterValues?.current.search}
        fullWidth
      />
    }
    {
      showNumberRangeFilter && <NumberRange
        onChange={onNumberRangeChange}
        defaultValue={filterValues?.current.numberRange}
      />
    }
    {
      showDateRangeFilter && <DateRange
        onChange={onDateRangeChange}
        defaultValue={filterValues?.current.dateRange}
      />
    }
    {
      showBooleanFilter && <BooleanFilter
        defaultValue={filterValues?.current.boolean}
        onChange={onBooleanFilterChange}
      />
    }

    <SelectList
      list={SORT_LIST_VALUES}
      label="Сортировать"
      defaultValue={SORT_LIST_VALUES.find((x) => x.id === initialFilters.sort) || SORT_LIST_VALUES[0]}
      onChange={onSortChange}
    />

    <Stack direction="row" spacing={1} justifyContent="center">
      <Button onClick={onAccepteButtonClick} size="small">Применить</Button>
      <Button color="error" onClick={onResetButtonClick} size="small">Сбросить</Button>
    </Stack>
  </div>
}

export default Filter