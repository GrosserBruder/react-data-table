import { FILTER_TYPES } from "../../../const"
import { getFilterType } from "../../../utils"

export type FILTER_TYPE = FILTER_TYPES | null

export function useFilterType(value: any): FILTER_TYPE {
  return getFilterType(value)
}

export default useFilterType