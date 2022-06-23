import { ReactNode, useState, FC, useEffect } from 'react';
import { Body, BodyProps, Cell, CellProps, Head, HeadCell, HeadProps, Row, RowProps, TableProps, HeadCellProps } from "@grossb/react-table"
import { DataTableProvider } from './DataTableProvider/DataTableProvider';
import { useDataTable } from './DataTableProvider/useDataTable';
import TableWithFixedHeader from '@grossb/react-table/dist/TableWithFixedHeader';
import './DataTable.scss';

export type LineCell = {
  id: string | number,
  value?: any,
  renderValue?: ReactNode,
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
}

function DataTableWrapper(props: DataTableProps) {
  const [initialValues, setInitialValues] = useState(props);

  useEffect(() => {
    setInitialValues(props)
  }, [props])

  return <DataTableProvider initialValues={initialValues}>
    <DataTable {...props} />
  </DataTableProvider>
}

function DataTable(props: DataTableProps) {
  const { headLines } = props;
  const dataTableHook = useDataTable();

  const headRows = headLines.map((row) => {
    const RowComponent = row.render || Row

    return <RowComponent key={row.id} {...row.config}>
      {row.cells.map((cell) => <HeadCell
        key={cell.id}
        onSearch={(value: any) => dataTableHook.onSearch(cell.id, value)}
        initialSearchValue={dataTableHook.getSearchValueByColumnId(cell.id)}
        {...cell.config}
      >
        {cell.renderValue}
      </HeadCell>
      )}
    </RowComponent>
  })

  const getRows = () => {
    return dataTableHook.resultBodyLines.map((row) => {
      const RowComponent = row.render || Row

      return <RowComponent key={row.id} {...row.config}>
        {row.cells.map((cell) => {
          const Component = cell.cellComponent || Cell;
          return <Component key={cell.id} {...cell.config}>
            {cell.renderValue}
          </Component>
        })}
      </RowComponent >
    })
  }


  const getRowsOrEmptyRow = () => {
    const isEmpty = dataTableHook.resultBodyLines.length === 0;

    if (isEmpty) {
      const columnCount = headLines[0].cells.reduce((acc, value) => acc + (value.config?.colSpan || 1), 0)

      return <Row>
        <Cell className="data-table__empty-row" colSpan={columnCount}>Список пуст</Cell>
      </Row>
    }

    return getRows()
  }

  const bodyRows = getRowsOrEmptyRow();

  return <TableWithFixedHeader fixedTopTitle className="data-table">
    <Head>
      {headRows}
    </Head>
    <Body>
      {bodyRows}
    </Body>
  </TableWithFixedHeader>
}

export default DataTableWrapper