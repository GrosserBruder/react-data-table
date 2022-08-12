import { Head, Row } from "@grossb/react-table"
import { memo, useCallback, useMemo } from "react";
import { HeadCell } from "../Components/HeadCell";
import { DataTableColumn } from "./types";

export type DataTableHeadProps = {
  columns: Array<DataTableColumn>
}

function DataTableHead(props: DataTableHeadProps) {
  const { columns } = props

  const getCell = useCallback((column: DataTableColumn) => {
    return <HeadCell key={column.id ?? column.dataField}>
      {column.header}
    </HeadCell>
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