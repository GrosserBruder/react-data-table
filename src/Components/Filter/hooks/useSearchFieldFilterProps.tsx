import { SearchFieldProps } from "../../SearchField/SearchField"
import { FILTER_TYPE, FILTER_TYPES } from "./useFilterType"

type useSearchFieldProps = {

}

type useSearchFieldPropsResult = SearchFieldProps

export function useSearchFieldFilterProps(filterType: FILTER_TYPE, props?: useSearchFieldProps): useSearchFieldPropsResult {
  return {}
}

export default useSearchFieldFilterProps