import { FC, useCallback, useEffect, useState } from 'react';
import { Table, Body, BodyProps, Cell, CellProps, Head, HeadProps, Row, RowProps, TableProps } from "@grossb/react-table"
import { HeadCell, HeadCellProps } from './Components/HeadCell/HeadCell';
import { DataTableProvider } from './DataTableProvider/DataTableProvider';
import { useDataTable } from './DataTableProvider/useDataTable';
import './styles/DataTable.scss';
import { SORT_VALUES } from './const';
import Checkbox from './Components/Checkbox/Checkbox';

export type LineCell = {
  id: string | number,
  value?: any,
  renderComponent?: FC<RowProps>,
  cellComponent?: FC<any>,
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
  tableProps?: TableProps,
  headProps?: HeadProps
  bodyProps?: BodyProps
  headLines: Array<TableRowProps<HeadLineCell>>,
  bodyLines: Array<TableRowProps<BodyLineCell>>,
  filtration?: boolean,
  selectable?: boolean,
}

function DataTable(props: DataTableProps) {
  const { headLines, filtration, tableProps, selectable } = props;
  const dataTableHook = useDataTable();
  const [selectedRows, setSelectedRows] = useState<Array<TableRowProps<BodyLineCell>>>([])

  const addToSelectedRows = useCallback((row: TableRowProps<BodyLineCell>) => {
    setSelectedRows([...selectedRows, row])
  }, [selectedRows])

  const removeFromSelectedRows = useCallback((row: TableRowProps<BodyLineCell>) => {
    setSelectedRows(selectedRows.filter((x) => x.id !== row.id))
  }, [selectedRows])

  useEffect(() => {
  }, [selectedRows])

  const isRowSelected = useCallback((row: TableRowProps<BodyLineCell>) => {
    return selectedRows.findIndex((x) => x.id === row.id) !== -1
  }, [selectedRows])

  const onBodyCheckboxClick = useCallback((row: TableRowProps<BodyLineCell>) => {
    const isSelected = isRowSelected(row);
    if (isSelected) {
      removeFromSelectedRows(row)
    } else {
      addToSelectedRows(row)
    }
  }, [isRowSelected, removeFromSelectedRows, addToSelectedRows, selectedRows])

  const onHeadCheckboxClick = useCallback(() => {
    if (selectedRows.length !== 0) {
      setSelectedRows([])
    } else {
      setSelectedRows(dataTableHook.resultBodyLines)
    }
  }, [selectedRows, dataTableHook.resultBodyLines])

  const getBodyCell = useCallback((bodyLineCell: BodyLineCell) => {
    const CellComponent = bodyLineCell.renderComponent || Cell

    return <CellComponent
      key={bodyLineCell.id}
      {...bodyLineCell.config}
    >
      {bodyLineCell.value}
    </CellComponent>
  }, [])

  const getHeadCell = useCallback((headLineCell: HeadLineCell) => {
    const CellComponent = headLineCell.renderComponent || HeadCell

    return <CellComponent
      key={headLineCell.id}
      onSearch={(value: any) => dataTableHook.onSearch(headLineCell.id, value)}
      onSort={(sortValue: SORT_VALUES) => dataTableHook.onSort(headLineCell.id, sortValue)}
      initialSearchValue={dataTableHook.getSearchValueByColumnId(headLineCell.id)}
      selectedSortValues={dataTableHook.getSortingValueByColumnId(headLineCell.id)}
      filtration={filtration}
      {...headLineCell.config}
    >
      {headLineCell.value}
    </CellComponent>
  }, [])

  const headRows = headLines.map((row) => {
    const RowComponent = row.render || Row

    return <RowComponent key={row.id} {...row.config}>
      {selectable && (
        <Cell className="cell__select-all" rowSpan={headLines.length} width={50}>
          <Checkbox
            checked={selectedRows.length === dataTableHook.resultBodyLines.length}
            indeterminate={selectedRows.length > 0 && selectedRows.length < dataTableHook.resultBodyLines.length}
            onClick={onHeadCheckboxClick}
          />
        </Cell>
      )}
      {row.cells.map(getHeadCell)}
    </RowComponent>
  })

  const getRows = useCallback(() => {
    return dataTableHook.resultBodyLines.map((row) => {
      const RowComponent = row.render || Row

      const onRowClick = (event: any) => {
        onBodyCheckboxClick(row)
      }

      const onCheckboxClick = (event: any) => {
        event.stopPropagation();
        onBodyCheckboxClick(row)
      }

      return <RowComponent key={row.id} {...row.config} onClick={onRowClick}>
        {selectable && <Cell className="cell__select">
          <Checkbox
            checked={isRowSelected(row)}
            onClick={onCheckboxClick}
          />
        </Cell>}
        {row.cells.map(getBodyCell)}
      </RowComponent >
    })
  }, [dataTableHook.resultBodyLines, getBodyCell, selectedRows])


  const getRowsOrEmptyRow = useCallback(() => {
    const isEmpty = dataTableHook.resultBodyLines.length === 0;

    if (isEmpty) {
      const columnCount = headLines[0].cells.reduce((acc, value) => acc + (value.config?.colSpan || 1), 0)

      return <Row>
        <Cell className="data-table__empty-row" colSpan={columnCount}>Список пуст</Cell>
      </Row>
    }

    return getRows()
  }, [dataTableHook.resultBodyLines, getBodyCell, selectedRows])

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