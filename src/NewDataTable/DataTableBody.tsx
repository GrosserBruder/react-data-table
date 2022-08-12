import { Body, Cell, Row } from "@grossb/react-table"
import { memo, useCallback, useMemo } from "react";
import { DataItem, DataTableBodyRow, DataTableColumn } from "./types";

export type DataTableBodyProps = {
  renderRow?: (row: DataTableBodyRow) => JSX.Element
  onRowClick?: (event: any, row: DataTableBodyRow) => void
  columns: Array<DataTableColumn>
  data?: Array<DataItem>
}

function DataTableBody(props: DataTableBodyProps) {
  const { columns, data } = props;

  const getCell = useCallback((dataItem: DataItem, column: DataTableColumn) => {
    if (!column.dataField) return <Cell />

    return <Cell key={column.id ?? column.dataField}>
      {dataItem[column.dataField]}
    </Cell>
  }, [])

  const getCells = useCallback((dataItem: DataItem) => {
    return columns.map((column) => getCell(dataItem, column))
  }, [columns, getCell])

  const getRows = useCallback(() => {
    if (data?.length === 0) {
      return <Row>
        <Cell colSpan={columns.length}>
          Список пуст
        </Cell>
      </Row>
    }

    return data?.map((dataItem) => <Row key={dataItem.id}>
      {getCells(dataItem)}
    </Row>)
  }, [data, columns.length, getCells])

  const bodyRows = useMemo(getRows, [data, getRows])

  return <Body>
    {bodyRows}
  </Body>
}

export default memo(DataTableBody);