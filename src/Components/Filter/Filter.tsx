import { useCallback, useRef } from "react";
import DateRange from "../DateRange/DateRange";
import NumberRange from "../NumberRange/NumberRange";
import SearchField from "../SearchField/SearchField";
import BooleanFilter from "./BooleanFilter";
import {
  FILTER_TYPES,
  useBooleanFilterProps,
  useDateRangeFilterProps,
  useFilterType,
  useNumberRangeFilterProps,
  useSearchFieldFilterProps
} from "./hooks";

export type FilterProps = {
  columnValue: any
  searchFieldProps?: any
  onFilterChange?: (value: any) => void
}

const enum FILTER_KEY {
  SEARCH = "search",
  NUMBER_RANGE = "numberRange",
  DATE_RANGE = "dateRange",
  BOOLEAN = "boolean"
}

export function Filter(props: FilterProps) {
  const { columnValue } = props;
  const filterType = useFilterType(columnValue)
  const filterValues = useRef({})

  const searchFieldFilterProps = useSearchFieldFilterProps(filterType);
  const booleanFilterProps = useBooleanFilterProps(filterType);
  const dateRangeFilterProps = useDateRangeFilterProps(filterType);
  const numberRangeFilterProps = useNumberRangeFilterProps(filterType);

  const showSearchField = filterType === FILTER_TYPES.STRING || filterType === FILTER_TYPES.NUMBER
  const showNumberRangeFilter = filterType === FILTER_TYPES.NUMBER
  const showDateRangeFilter = filterType === FILTER_TYPES.DATE
  const showBooleanFilter = filterType === FILTER_TYPES.BOOLEAN

  const setFilter = useCallback((key: string, value: any) => {
    filterValues.current = Object.assign({}, filterValues, { [key]: value })
  }, [filterValues])

  const onSearchHandler = useCallback((value: any) => {
    setFilter(FILTER_KEY.SEARCH, value)
  }, [filterValues])

  const onSearchChange = useCallback((event: any) => {
    setFilter(FILTER_KEY.SEARCH, event.target.value);
  }, [filterValues])


  return <div>
    {showSearchField && <SearchField
      autoFocus
      withoutButton
      onSearch={onSearchHandler}
      onChange={onSearchChange}
      // value={searchValue}
      // initialValue={initialSearchValue}
      fullWidth
    />
    }
    {
      showNumberRangeFilter && <NumberRange />
    }
    {
      showDateRangeFilter && <DateRange />
    }
    {
      showBooleanFilter && <BooleanFilter />
    }
  </div>
}

export default Filter