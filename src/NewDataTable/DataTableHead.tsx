import { Body, Cell, Head, Row } from "@grossb/react-table"
import { memo, useCallback, useMemo } from "react";
import { HeadCell } from "../Components/HeadCell";
import { DataTableColumn, DataTableHeadCell, DataTableHeadRow } from "./types";

export type DataTableHeadProps = {
  columns: Array<DataTableColumn>
}

function DataTableHead(props: DataTableHeadProps) {
  const { columns } = props

  const getCell = useCallback((column: DataTableColumn) => {
    return <Cell key={column.id ?? column.dataField}>
      {column.header}
    </Cell>
  }, [])

  const getCells = useCallback(() => {
    return columns.map((column) => getCell(column))
  }, [columns, getCell])

  const getRows = useCallback(() => {
    return <Row>
      {getCells()}
    </Row>
  }, [getCells])

  const headRows = useMemo(getRows, [getRows])

  return <Head>
    {headRows}
  </Head>
}

export default memo(DataTableHead);