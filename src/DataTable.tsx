import { FC, useCallback, useEffect, useState, memo, useMemo } from 'react';
import { Table, Body, BodyProps, Cell, CellProps, Head, HeadProps, Row, RowProps, TableProps } from "@grossb/react-table"
import { HeadCell, HeadCellProps } from './Components/HeadCell/HeadCell';
import { DataTableProvider } from './DataTableProvider/DataTableProvider';
import './styles/DataTable.scss';
import { SORT_VALUES } from './const';
import Checkbox from './Components/Checkbox/Checkbox';
import { useSelectRows, useSelectAllStatus, SELECT_ALL_STATUSES, useFilter } from "./hooks"

export type LineCell = {
  id: string | number,
  value?: any,
  renderComponent?: FC<RowProps>,
  cellComponent?: FC<any>,
  filterKey?: string,
}

export type HeadLineCell = LineCell & {
  config?: HeadCellProps
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
  onSelected?: (rows: Array<TableRowProps<BodyLineCell>>) => void,
  onSortChange?: (headLineCell: HeadLineCell, sortValue: SORT_VALUES) => void,
  onSearchChange?: (headLineCell: HeadLineCell, value: string) => void,
  tableProps?: Omit<TableProps, 'children'>,
  headProps?: HeadProps
  bodyProps?: BodyProps
  headLines: Array<TableRowProps<HeadLineCell>>,
  bodyLines: Array<TableRowProps<BodyLineCell>>,
  filtration?: boolean,
  selectable?: boolean,
}

function DataTable(props: DataTableProps) {
  const {
    headLines, bodyLines, filtration, tableProps, selectable, onRowClick: onRowClickProps, onSelected, onSearchChange, onSortChange
  } = props;
  const filterHook = useFilter(bodyLines);
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
  }, [selectRowsHook.isRowSelected, selectRowsHook.removeFromSelectedRows, selectRowsHook.addToSelectedRows])

  const onHeadCheckboxClick = useCallback(() => {
    if (selectAllStatus !== SELECT_ALL_STATUSES.NOT_SELECTED) {
      selectRowsHook.resetSelectedRows([])
      setSelectedAllStatus(SELECT_ALL_STATUSES.NOT_SELECTED)
    } else {
      selectRowsHook.resetSelectedRows(filterHook.filteredRows)
      setSelectedAllStatus(SELECT_ALL_STATUSES.SELECTED)
    }
  }, [selectAllStatus, filterHook.filteredRows])

  const onSortHandler = (headLineCell: HeadLineCell, value: SORT_VALUES) => {
    if (!headLineCell.filterKey) return;

    onSortChange?.(headLineCell, value)
    filterHook.setSort(headLineCell.filterKey, value)
  }

  const onSearchHandler = (headLineCell: HeadLineCell, value: string) => {
    if (!headLineCell.filterKey) return;

    onSearchChange?.(headLineCell, value)
    filterHook.setSearch(headLineCell.filterKey, value)
  }

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
      onSearch={(value: any) => onSearchHandler(headLineCell, value)}
      onSort={(sortValue: SORT_VALUES) => onSortHandler(headLineCell, sortValue)}
      initialSearchValue={headLineCell.filterKey ? filterHook.getSearchValueByFilterKey(headLineCell.filterKey) : undefined}
      initialSortValues={headLineCell.filterKey ? filterHook.getSortValueByFilterKey(headLineCell.filterKey) as SORT_VALUES : undefined}
      filtration={filtration}
      {...headLineCell.config}
    >
      {headLineCell.value}
    </CellComponent>
  }, [])

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
        selectable && onBodyCheckboxClick(row)
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


  const getRowsOrEmptyRow = useCallback(() => {
    const isEmpty = filterHook.filteredRows.length === 0;

    if (isEmpty) {
      let columnCount = headLines[0].cells.reduce((acc, value) => acc + (value.config?.colSpan || 1), 0)
      if (selectable) {
        columnCount = columnCount + 1
      }

      return <Row>
        <Cell className="data-table__empty-row" colSpan={columnCount}>Список пуст</Cell>
      </Row>
    }

    return getRows()
  }, [filterHook.filteredRows, getBodyCell, selectRowsHook.selectedRows])

  const bodyRows = getRowsOrEmptyRow();

  return <Table fixedTopTitle className="data-table" {...tableProps}>
    <Head>
      {headRows}
    </Head>
    <Body>
      {bodyRows}
    </Body>
  </Table>
}

export default (props: DataTableProps) => {
  return <DataTableProvider initialValues={props}>
    <DataTable {...props} />
  </DataTableProvider>
}