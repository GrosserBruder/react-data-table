import { Head, Row } from "@grossb/react-table"
import { memo, useCallback, useMemo } from "react";
import { SORT_STRATEGY } from "../const";
import { SortStrategyIcon } from "../Components";
import { HeadCellV2 as HeadCell, HeadCellProps } from "../Components/HeadCell";
import { SelectedAllCheckbox } from "./Components";
import { FilterContainer } from "./Filter/FilterContainer";
import { DataRow, DataTableColumn } from "./types";
import useSortContext from "./Context/SortContext/useSortContext";

export type DataTableHeadProps = {
  columns: Array<DataTableColumn>
  data?: Array<DataRow>
  filterable?: boolean
  sortable?: boolean
  selectable?: boolean
  cellProps?: (column: DataTableColumn) => HeadCellProps | undefined
}

function DataTableHead(props: DataTableHeadProps) {
  const { columns, data, filterable, sortable, selectable, cellProps } = props

  const sortContext = useSortContext()

  const onHeadCellClick = useCallback((event: any, column: DataTableColumn) => {
    if (column.dataField === undefined) return;

    const currentSort = sortContext.sortFields.get(column.dataField)

    switch (true) {
      case currentSort === undefined:
        return sortContext.setSort(column.dataField, SORT_STRATEGY.ASC)
      case currentSort === SORT_STRATEGY.ASC:
        return sortContext.setSort(column.dataField, SORT_STRATEGY.DESC)
      default:
        return sortContext.removeSort(column.dataField)
    }
  }, [sortContext.setSort, sortContext.sortFields, sortContext.removeSort])

  const getCell = useCallback((column: DataTableColumn) => {
    const currentSort = column.dataField
      ? sortContext.sortFields.get(column.dataField)
      : undefined

    return <HeadCell
      key={column.id ?? column.dataField}
      {...cellProps?.(column)}
      onClick={sortable ? (event) => onHeadCellClick(event, column) : undefined}
    >
      <div className="head-cell__title">{column.header}</div>
      {(sortable || column.sortable) && <SortStrategyIcon sortStrategy={currentSort} />}
      {(filterable || column.filterable) && <FilterContainer column={column}>
        {column.filterComponent}
      </FilterContainer>}
    </HeadCell>
  }, [onHeadCellClick])

  const getCells = useCallback(() => {
    const cells = columns.map((column) => getCell(column))

    if (selectable) {
      return [<SelectedAllCheckbox data={data} key="select-all-checkbox" />, cells]
    }

    return cells
  }, [columns, getCell, selectable])

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