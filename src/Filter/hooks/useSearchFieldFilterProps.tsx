import { SearchFieldProps } from "../../Components/SearchField/SearchField"
import { FILTER_TYPE } from "./useFilterType"

type useSearchFieldProps = {

}

type useSearchFieldPropsResult = SearchFieldProps

export function useSearchFieldFilterProps(filterType: FILTER_TYPE, props?: useSearchFieldProps): useSearchFieldPropsResult {
  return {}
}

export default useSearchFieldFilterProps