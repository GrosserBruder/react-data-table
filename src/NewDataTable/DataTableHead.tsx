import { Head, Row } from "@grossb/react-table"
import { memo, useCallback, useMemo } from "react";
import { HeadCellV2 as HeadCell } from "../Components/HeadCell";
import { FilterContainer } from "./Filter/FilterContainer";
import { DataTableColumn } from "./types";

export type DataTableHeadProps = {
  columns: Array<DataTableColumn>
}

function DataTableHead(props: DataTableHeadProps) {
  const { columns } = props

  const getCell = useCallback((column: DataTableColumn) => {
    return <HeadCell
      key={column.id ?? column.dataField}
    >
      <div className="head-cell__title">{column.header}</div>
      <FilterContainer column={column}>
        {column.filterComponent}
      </FilterContainer>
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

  return <Head className="data-table-head">
    {headRows}
  </Head>
}

export default memo(DataTableHead);