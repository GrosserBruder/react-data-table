import { Body, Cell, Row } from "@grossb/react-table"
import { memo, useCallback, useMemo } from "react";
import { DataRow, DataTableBodyRow, DataTableColumn } from "./types";

export type DataTableBodyProps = {
  renderRow?: (row: DataTableBodyRow) => JSX.Element
  onRowClick?: (event: any, row: DataTableBodyRow) => void
  columns: Array<DataTableColumn>
  data?: Array<DataRow>
}

function DataTableBody(props: DataTableBodyProps) {
  const { columns, data } = props;

  const getCell = useCallback((dataRow: DataRow, column: DataTableColumn) => {
    if (!column.dataField) return <Cell />

    const value = column.valueGetter !== undefined
      ? column.valueGetter(dataRow)
      : dataRow[column.dataField]

    return <Cell key={column.id ?? column.dataField}>
      {value}
    </Cell>
  }, [])

  const getCells = useCallback((dataRow: DataRow) => {
    return columns.map((column) => getCell(dataRow, column))
  }, [columns, getCell])

  const getRows = useCallback(() => {
    if (data?.length === 0) {
      return <Row>
        <Cell colSpan={columns.length}>
          Список пуст
        </Cell>
      </Row>
    }

    return data?.map((dataRow) => <Row key={dataRow.id}>
      {getCells(dataRow)}
    </Row>)
  }, [data, columns.length, getCells])

  const bodyRows = useMemo(getRows, [data, getRows])

  return <Body>
    {bodyRows}
  </Body>
}

export default memo(DataTableBody);