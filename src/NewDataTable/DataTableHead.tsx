import { Head, Row } from "@grossb/react-table"
import { memo, useCallback, useMemo } from "react";
import { SortStrategyIcon } from "../Components";
import { HeadCellV2 as HeadCell } from "../Components/HeadCell";
import { SelectedAllCheckbox } from "./Components";
import useDataTableContext from "./Context/DataTableContext/useDataTableBodyRowsContext";
import { SORT_STRATEGY } from "./Context/DataTableContext/useSort";
import { FilterContainer } from "./Filter/FilterContainer";
import { DataRow, DataTableColumn } from "./types";

export type DataTableHeadProps = {
  columns: Array<DataTableColumn>
  data?: Array<DataRow>
}

function DataTableHead(props: DataTableHeadProps) {
  const { columns, data } = props

  const dataTableContext = useDataTableContext()

  const onHeadCellClick = useCallback((event: any, column: DataTableColumn) => {
    if (column.dataField === undefined) return;

    const currentSort = dataTableContext.sortFields.get(column.dataField)

    switch (true) {
      case currentSort === undefined:
        return dataTableContext.setSort(column.dataField, SORT_STRATEGY.ASC)
      case currentSort === SORT_STRATEGY.ASC:
        return dataTableContext.setSort(column.dataField, SORT_STRATEGY.DESC)
      default:
        return dataTableContext.removeSort(column.dataField)
    }
  }, [dataTableContext.setSort, dataTableContext.sortFields, dataTableContext.removeSort])

  const getCell = useCallback((column: DataTableColumn) => {
    const currentSort = column.dataField
      ? dataTableContext.sortFields.get(column.dataField)
      : undefined

    return <HeadCell
      key={column.id ?? column.dataField}
      onClick={(event) => onHeadCellClick(event, column)}
    >
      <div className="head-cell__title">{column.header}</div>
      <SortStrategyIcon sortStrategy={currentSort} />
      <FilterContainer column={column}>
        {column.filterComponent}
      </FilterContainer>
    </HeadCell>
  }, [onHeadCellClick])

  const getCells = useCallback(() => {
    const cells = columns.map((column) => getCell(column))
    return [<SelectedAllCheckbox data={data} key="select-all-checkbox" />, cells]

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