import { FILTER_TYPE, FILTER_TYPES } from "./useFilterType"

type useNumberRangeFilterPropsResult = {
  show?: boolean
}

export function useNumberRangeFilterProps(filterType: FILTER_TYPE, props?: any): useNumberRangeFilterPropsResult {
  if (filterType && filterType !== FILTER_TYPES.NUMBER) {
    return {}
  }
  return {}
}

export default useNumberRangeFilterProps