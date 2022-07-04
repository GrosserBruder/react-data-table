import { ReactNode, ThHTMLAttributes, useRef, useState, useCallback } from "react";
import classnames from 'classnames';
import Cell from "@grossb/react-table/dist/Cell";
import { IconButton, Popover } from "@mui/material";
import SearchField from "../SearchField/SearchField";
import MoreVert from "@mui/icons-material/MoreVert"
import { SORT_VALUES } from '../../const'
import SelectList, { SelectListItem } from "../SelectList/SelectList";
import Button from "../Button";
import '../styles/HeadCell.scss';

export type HeadCellProps = ThHTMLAttributes<HTMLElement>
  & {
    children?: ReactNode,
    filtration?: boolean,
    onSearch?: (value: string) => void,
    onSort?: (sortValue: SORT_VALUES) => void,
    initialSearchValue?: string,
    initialSortValues?: SORT_VALUES.NOT_SELECTED | SORT_VALUES.ASC | SORT_VALUES.DESC,
    width?: number
  };

const SORT_LIST_VALUES: Array<SelectListItem> = [
  { id: SORT_VALUES.NOT_SELECTED, value: "Не выбрано" },
  { id: SORT_VALUES.ASC, value: "По возрастанию" },
  { id: SORT_VALUES.DESC, value: "По убыванию" },
]

export function HeadCell(props: HeadCellProps) {
  const { children, filtration, onSearch, onSort, initialSearchValue = '', initialSortValues = SORT_LIST_VALUES[0].id, ...rest } = props;
  const className = classnames('head-cell', props.className)
  const cellRef = useRef(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [selectedSortValues, setSelectedSortValues] = useState(SORT_LIST_VALUES.find((x) => x.id === initialSortValues) || SORT_LIST_VALUES[0]);

  const toggleFilters = useCallback((event: any) => {
    setIsPopoverOpen((x) => !x)
  }, [])

  const handleClose = useCallback(() => {
    setIsPopoverOpen(false);
  }, [])

  const onSearchHandler = useCallback((value: any) => {
    onSearch?.(value);
  }, [onSearch])

  const onAccepteButtonClick = useCallback(() => {
    onSearch?.(searchValue);
    onSort?.(selectedSortValues.id as SORT_VALUES);
    handleClose();
  }, [searchValue, selectedSortValues])

  const filtrationButtonClassName = classnames({
    "filtration-button--setted": Boolean(initialSearchValue
      || (selectedSortValues !== undefined && selectedSortValues.id !== SORT_VALUES.NOT_SELECTED))
  })

  return <Cell ref={cellRef} component="th" {...rest} className={className}>
    <div className="head-cell__content">
      <div className="head-cell__children">{children}</div>
      <div className="head-cell__filters">
        {filtration && (
          <IconButton onClick={toggleFilters} className={filtrationButtonClassName}>
            <MoreVert />
          </IconButton>
        )}
      </div>
      <Popover
        className="head-cell__popover"
        disablePortal
        open={isPopoverOpen}
        anchorEl={cellRef?.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <SearchField
          autoFocus
          withoutButton
          onSearch={onSearchHandler}
          onChange={(event) => setSearchValue(event.target.value)}
          value={searchValue}
          initialValue={initialSearchValue}
        />
        <SelectList
          list={SORT_LIST_VALUES}
          label="Сортировать"
          value={selectedSortValues.id}
          defaultValue={SORT_LIST_VALUES[0]}
          onChange={setSelectedSortValues}
        />
        <Button onClick={onAccepteButtonClick}>Применить</Button>
      </Popover>
    </div>
  </Cell >
}


export default HeadCell;