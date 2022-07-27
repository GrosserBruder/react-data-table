import { useCallback, useMemo, forwardRef, ForwardedRef, useRef } from 'react';
import { Table, Body, Cell, Head, Row } from "@grossb/react-table"
import { HeadCell } from '../Components/HeadCell/HeadCell';
import Checkbox from '../Components/Checkbox/Checkbox';
import { useSelectRows, useSelectAllStatus, useFilter } from "./hooks"
import CrudToolbar from '../Components/Toolbar/CrudToolbar';
import { Filter, FilterValue } from '../Filter';
import FilterContainer, { FilterContainerProps } from '../Filter/FilterContainer';
import {
  filterComparers as defaultFilterComparers,
  filterCheckers as defaultFilterCheckers,
  renderBodyCellValue,
} from "./defaultProps"
import '../styles/DataTable.scss';
import { mergeObjects } from '../utils';
import { BodyLineCell, DataTableProps, HeadLineCell, TableRowProps } from './types';
import { SELECT_ALL_STATUSES } from '../const';

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
    return <Cell
      key={bodyLineCell.id}
      {...bodyLineCell.config}
    >
      {
        bodyLineCell.renderComponent
          ? bodyLineCell.renderComponent?.(bodyLineCell)
          : renderBodyCellValue(bodyLineCell.value)
      }
    </Cell>
  }, [])

  const getHeadCell = useCallback((headLineCell: HeadLineCell, index: number) => {
    return <HeadCell
      key={headLineCell.id}
      isFiltersInstalled={headLineCell.filterKey ? filterHook.isInstalledFilters(headLineCell.filterKey) : false}
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
      {headLineCell.renderComponent ? headLineCell.renderComponent?.(headLineCell) : headLineCell.value}
    </HeadCell >
  }, [filterContainer, onSetFilterHandler, filterHook.getFilterStateByFilterKey, filterHook.isInstalledFilters])

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

  //ToDo: crash
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