import { Head, Row } from "@grossb/react-table"
import { memo, useCallback, useMemo } from "react";
import { SELECT_ALL_STATUSES, SORT_STRATEGY } from "../const";
import { SortStrategyIcon } from "../Components";
import { HeadCellV2 as HeadCell, HeadCellProps } from "../Components/HeadCell";
import { FilterContainer } from "./Filter/FilterContainer";
import { DataRow, DataTableColumn } from "./types";
import useDataTableContext from "./Context/DataTableContext/useDataTableContext";
import { SelectedCheckboxCell } from "./Components";

export type DataTableHeadProps = {
  columns: Array<DataTableColumn>
  data: Array<DataRow>
  filterable?: boolean
  sortable?: boolean
  selectable?: boolean
  cellProps?: (column: DataTableColumn) => HeadCellProps | undefined
}

function DataTableHead(props: DataTableHeadProps) {
  const { columns, data, filterable, sortable, selectable, cellProps } = props

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

  const onSelectAllClick = useCallback(() => {
    if (dataTableContext.selectAllStatus === SELECT_ALL_STATUSES.NOT_SELECTED) {
      dataTableContext.addSelectedRows(data)
    } else {
      dataTableContext.resetSelectedBox()
    }
  }, [dataTableContext.addSelectedRows, dataTableContext.resetSelectedBox, data])

  const getCell = useCallback((column: DataTableColumn) => {
    const currentSort = column.dataField
      ? dataTableContext.sortFields.get(column.dataField)
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
      return [<SelectedCheckboxCell key="select-all-checkbox" onClick={onSelectAllClick} selectStatus={dataTableContext.selectAllStatus} />, cells]
    }

    return cells
  }, [columns, getCell, selectable, onSelectAllClick, dataTableContext.selectAllStatus])

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