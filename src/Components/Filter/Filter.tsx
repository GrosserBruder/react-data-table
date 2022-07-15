import SearchField from "../SearchField/SearchField";
import useFilterType, { FILTER_TYPES } from "./hooks/useFilterType"
import useSearchFieldFilterProps from "./hooks/useSearchFieldFilterProps";

export type FilterProps = {
  columnValue: any
  searchFieldProps?: any
}

export function Filter(props: FilterProps) {
  const { columnValue } = props;
  const filterType = useFilterType(columnValue)
  const searchFieldFilterProps = useSearchFieldFilterProps(filterType);


  return <div>
    {searchFieldFilterProps.show && <SearchField
      autoFocus
      withoutButton
      // onSearch={onSearchHandler}
      // onChange={(event) => setSearchValue(event.target.value)}
      // value={searchValue}
      // initialValue={initialSearchValue}
      fullWidth
    />
    }
  </div>
}

export default Filter