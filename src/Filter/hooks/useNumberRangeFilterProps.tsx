import { FILTER_TYPES } from "../../const"
import { FILTER_TYPE } from "./useFilterType"

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