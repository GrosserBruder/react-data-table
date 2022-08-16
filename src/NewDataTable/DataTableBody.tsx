import { Body, Cell, Row } from "@grossb/react-table"
import { memo, useCallback, useMemo } from "react";
import { SelectedCheckbox } from "./Components";
import { DataRow, DataTableBodyRow, DataTableColumn } from "./types";

export type DataTableBodyProps = {
  renderRow?: (row: DataTableBodyRow) => JSX.Element
  onRowClick?: (event: any, row: DataTableBodyRow) => void
  columns: Array<DataTableColumn>
  data?: Array<DataRow>
  selectable?: boolean
}

function DataTableBody(props: DataTableBodyProps) {
  const { columns, data, selectable } = props;

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
    const cells = columns.map((column) => getCell(dataRow, column))

    if (selectable) {
      return [<SelectedCheckbox row={dataRow} key="select-checkbox" />, cells]
    }

    return cells
  }, [columns, getCell, selectable])

  const getRows = useCallback(() => {
    if (data?.length === 0) {

      const colspan = selectable ? columns.length + 1 : columns.length

      return <Row>
        <Cell colSpan={colspan}>
          Список пуст
        </Cell>
      </Row>
    }

    return data?.map((dataRow) => <Row key={dataRow.id}>
      {getCells(dataRow)}
    </Row>)
  }, [data, columns.length, getCells, selectable])

  const bodyRows = useMemo(getRows, [data, getRows])

  return <Body>
    {bodyRows}
  </Body>
}

export default memo(DataTableBody);