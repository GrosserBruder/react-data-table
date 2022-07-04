import { FC, useCallback } from 'react';
import { Table, Body, BodyProps, Cell, CellProps, Head, HeadProps, Row, RowProps, TableProps } from "@grossb/react-table"
import { HeadCell, HeadCellProps } from './Components/HeadCell/HeadCell';
import { DataTableProvider } from './DataTableProvider/DataTableProvider';
import { useDataTable } from './DataTableProvider/useDataTable';
import './styles/DataTable.scss';
import { SORT_VALUES } from './const';

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
}

function DataTable(props: DataTableProps) {
  const { headLines, filtration, tableProps } = props;
  const dataTableHook = useDataTable();

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
      {row.cells.map(getHeadCell)}
    </RowComponent>
  })

  const getRows = useCallback(() => {
    return dataTableHook.resultBodyLines.map((row) => {
      const RowComponent = row.render || Row

      return <RowComponent key={row.id} {...row.config}>
        {row.cells.map(getBodyCell)}
      </RowComponent >
    })
  }, [dataTableHook.resultBodyLines, getBodyCell])


  const getRowsOrEmptyRow = useCallback(() => {
    const isEmpty = dataTableHook.resultBodyLines.length === 0;

    if (isEmpty) {
      const columnCount = headLines[0].cells.reduce((acc, value) => acc + (value.config?.colSpan || 1), 0)

      return <Row>
        <Cell className="data-table__empty-row" colSpan={columnCount}>Список пуст</Cell>
      </Row>
    }

    return getRows()
  }, [dataTableHook.resultBodyLines, getBodyCell])

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