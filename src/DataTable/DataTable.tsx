import { FC, useCallback, useMemo, forwardRef, ForwardedRef, useRef } from 'react';
import { Table, Body, Cell, CellProps, Head, Row, RowProps, TableProps } from "@grossb/react-table"
import { HeadCell, HeadCellProps } from '../Components/HeadCell/HeadCell';
import Checkbox from '../Components/Checkbox/Checkbox';
import { useSelectRows, useSelectAllStatus, SELECT_ALL_STATUSES, useFilter } from "./hooks"
import CrudToolbar, { ToolbarProps } from '../Components/Toolbar/CrudToolbar';
import { FilterCheckers, FilterComparers, FilterProps as HookFilterProps } from './hooks/useFilter';
import Filter, { FilterProps, FilterValue } from '../Filter/Filter';
import FilterContainer, { FilterContainerProps } from '../Filter/FilterContainer';
import {
  filterComparers as defaultFilterComparers,
  filterCheckers as defaultFilterCheckers,
} from "./defaultProps"
import '../styles/DataTable.scss';
import { mergeObjects } from '../utils';

export type LineCell = {
  id: string | number,
  value?: any,
  renderComponent?: FC<RowProps>,
  cellComponent?: FC<any>,
  filterKey?: string,
}

export type HeadLineCell = LineCell & {
  config?: HeadCellProps
  columnValue?: any
}

export type BodyLineCell = LineCell & {
  config?: CellProps
}

export type TableRowProps<CellType> = {
  id: string | number,
  cells: Array<CellType>,
  render?: FC<RowProps>
  config?: RowProps
}

export type DataTableProps = {
  onRowClick?: (row: TableRowProps<BodyLineCell>) => void,
  onSelect?: (row: TableRowProps<BodyLineCell>, isSelected: boolean) => void,
  onSelectAll?: (selectedRows: Array<TableRowProps<BodyLineCell>>) => void,
  tableProps?: Omit<TableProps, 'children'>,
  filterProps?: HookFilterProps,
  filterComponentProps?: FilterProps
  headLines: Array<TableRowProps<HeadLineCell>>,
  bodyLines: Array<TableRowProps<BodyLineCell>>,
  filterable?: boolean,
  selectable?: boolean,
  toolbar: FC<ToolbarProps>
  disableToolbar?: boolean
  additionalToolbar?: FC<ToolbarProps>
  disableSetCheckboxAfterRowClick?: boolean,
  filterCheckers?: FilterCheckers
  filterComparers?: FilterComparers
}

const filterContainer = ({ children, ...otherProps }: FilterContainerProps) => <FilterContainer {...otherProps}>{children}</FilterContainer>

function DataTable(props: DataTableProps, ref: ForwardedRef<any>) {
  const {
    headLines,
    bodyLines,
    filterable,
    tableProps,
    selectable,
    filterProps,
    toolbar: Toolbar = CrudToolbar,
    additionalToolbar,
    disableToolbar,
    disableSetCheckboxAfterRowClick,
    onRowClick: onRowClickProps,
    onSelect,
    onSelectAll,
    filterCheckers = {},
    filterComparers = {},
    filterComponentProps,
  } = props;
  const mergedFilterCheckers = useRef(mergeObjects(filterCheckers, defaultFilterCheckers))
  const mergedFilterComparers = useRef(mergeObjects(filterComparers, defaultFilterComparers))

  const filterHook = useFilter(bodyLines, mergedFilterCheckers.current, mergedFilterComparers.current, filterProps);
  const selectRowsHook = useSelectRows<TableRowProps<BodyLineCell>>()
  const [selectAllStatus, setSelectedAllStatus] = useSelectAllStatus(
    filterHook.filteredRows.length,
    selectRowsHook.selectedRows.length
  )

  const onBodyCheckboxClick = useCallback((row: TableRowProps<BodyLineCell>) => {
    const isSelected = selectRowsHook.isRowSelected(row);
    if (isSelected) {
      selectRowsHook.removeFromSelectedRows(row)
    } else {
      selectRowsHook.addToSelectedRows(row)
    }
    onSelect?.(row, isSelected)
  }, [selectRowsHook.isRowSelected, selectRowsHook.removeFromSelectedRows, selectRowsHook.addToSelectedRows])

  const onHeadCheckboxClick = useCallback(() => {
    if (selectAllStatus !== SELECT_ALL_STATUSES.NOT_SELECTED) {
      selectRowsHook.resetSelectedRows([])
      setSelectedAllStatus(SELECT_ALL_STATUSES.NOT_SELECTED)
      onSelectAll?.([])
    } else {
      selectRowsHook.resetSelectedRows(filterHook.filteredRows)
      setSelectedAllStatus(SELECT_ALL_STATUSES.SELECTED)
      onSelectAll?.(filterHook.filteredRows)
    }
  }, [selectAllStatus, filterHook.filteredRows])

  const onSetFilterHandler = useCallback((headLineCell: HeadLineCell, value: FilterValue) => {
    if (!headLineCell.filterKey) return;

    filterHook.setFilter(headLineCell.filterKey, value)
  }, [filterHook.setFilter])

  const getBodyCell = useCallback((bodyLineCell: BodyLineCell) => {
    const CellComponent = bodyLineCell.renderComponent || Cell

    return <CellComponent
      key={bodyLineCell.id}
      {...bodyLineCell.config}
    >
      {bodyLineCell.value}
    </CellComponent>
  }, [])

  const getHeadCell = useCallback((headLineCell: HeadLineCell, index: number) => {
    const CellComponent = headLineCell.renderComponent || HeadCell

    return <CellComponent
      key={headLineCell.id}
      filterable={filterable}
      filterContainer={filterContainer}
      filter={<Filter
        columnValue={headLineCell.columnValue}
        onFilterChange={(value) => onSetFilterHandler(headLineCell, value)}
        initialFilters={headLineCell.filterKey ? filterHook.getFilterStateByFilterKey(headLineCell.filterKey) : undefined}
        {...filterComponentProps}
      />}

      {...headLineCell.config}

    >
      {headLineCell.value}
    </CellComponent >
  }, [filterContainer, onSetFilterHandler, filterHook.getFilterStateByFilterKey])

  const headRows = useMemo(() => headLines.map((row) => {
    const RowComponent = row.render || Row

    return <RowComponent key={row.id} {...row.config}>
      {selectable && (
        <Cell className="cell__select-all" rowSpan={headLines.length} width={50}>
          <Checkbox
            checked={selectAllStatus === SELECT_ALL_STATUSES.SELECTED}
            indeterminate={selectAllStatus === SELECT_ALL_STATUSES.INDETERMINATE}
            onClick={onHeadCheckboxClick}
          />
        </Cell>
      )}
      {row.cells.map(getHeadCell)}
    </RowComponent>
  }), [headLines, selectable, onHeadCheckboxClick, getHeadCell])

  const getRows = useCallback(() => {
    return filterHook.filteredRows.map((row) => {
      const RowComponent = row.render || Row

      const onRowClick = (event: any) => {
        onRowClickProps?.(row)
        selectable && !disableSetCheckboxAfterRowClick && onBodyCheckboxClick(row)
      }

      const onCheckboxClick = (event: any) => {
        event.stopPropagation();
        onBodyCheckboxClick(row)
      }

      return <RowComponent key={row.id} {...row.config} onClick={onRowClick}>
        {selectable && <Cell className="cell__select">
          <Checkbox
            checked={selectRowsHook.isRowSelected(row)}
            onClick={onCheckboxClick}
          />
        </Cell>}
        {row.cells.map(getBodyCell)}
      </RowComponent >
    })
  }, [filterHook.filteredRows, getBodyCell, selectRowsHook.selectedRows])

  const columnCount = useMemo(() => headLines[0].cells.reduce((acc, value) => acc + (value.config?.colSpan || 1), 0), [headLines])

  const getRowsOrEmptyRow = useCallback(() => {
    const isEmpty = filterHook.filteredRows.length === 0;

    if (isEmpty) {
      let colSpan = columnCount
      if (selectable) {
        colSpan = colSpan + 1
      }

      return <Row>
        <Cell className="data-table__empty-row" colSpan={colSpan}>Список пуст</Cell>
      </Row>
    }

    return getRows()
  }, [filterHook.filteredRows, getBodyCell, selectRowsHook.selectedRows, columnCount])

  const bodyRows = useMemo(() => getRowsOrEmptyRow(),
    [filterHook.filteredRows, getBodyCell, selectRowsHook.selectedRows, columnCount]
  );

  return <Table ref={ref} fixedTopTitle className="data-table" {...tableProps}>
    <Head>
      {!disableToolbar && <Row className='row__toolbar'>
        <Cell
          className='cell__toolbar'
          colSpan={selectable ? columnCount + 1 : columnCount}
        >
          <Toolbar
            selectable={selectable}
            filterState={filterHook.filterState}
            filteredRows={filterHook.filteredRows}
            filterable={filterable}
            selectedRows={selectRowsHook.selectedRows}
            additionalToolbar={additionalToolbar}
          />
        </Cell>
      </Row>
      }
      {headRows}
    </Head>
    <Body>
      {bodyRows}
    </Body>
  </Table>
}

export default forwardRef(DataTable)