import { SearchFieldProps } from "../../SearchField/SearchField"
import { FILTER_TYPE, FILTER_TYPES } from "./useFilterType"

type useSearchFieldProps = {

}

type useSearchFieldPropsResult = SearchFieldProps & {
  show: boolean
}

export function useSearchFieldFilterProps(filterType: FILTER_TYPE, props?: useSearchFieldProps): useSearchFieldPropsResult {
  if (!filterType || (filterType !== FILTER_TYPES.STRING && filterType !== FILTER_TYPES.NUMBER)) {
    return {
      show: false
    }
  }

  return {
    show: true
  }
}

export default useSearchFieldFilterProps