import { Head, Row } from "@grossb/react-table"
import { memo, useCallback } from "react";
import { SELECT_STATUSES, SORT_STRATEGY } from "../const";
import { DataRow, DataTableColumn, HeadCellPropsCommunity, HeadPropsCommunity } from "./types";
import { useDataTableContext } from "./Context";
import { SelectedCheckboxCell, DataTableHeadCell } from "../Components";
import { getColumnKey } from "../utils";
import classNames from "classnames";

export type DataTableHeadProps = HeadPropsCommunity & {
  columns: Array<DataTableColumn>
  data: Array<DataRow>
  filterable?: boolean
  sortable?: boolean
  selectable?: boolean
  getCellProps?: (column: DataTableColumn) => HeadCellPropsCommunity
}

const MemoDataTableHeadCell = memo(DataTableHeadCell)

function DataTableHead(props: DataTableHeadProps) {
  const {
    columns, data, filterable, sortable, selectable, className, getCellProps,
    ...restProps
  } = props

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
    if (dataTableContext.selectAllStatus === SELECT_STATUSES.NOT_SELECTED) {
      dataTableContext.addSelectedRows(data)
    } else {
      dataTableContext.resetSelectedRows()
    }
  }, [dataTableContext.addSelectedRows, dataTableContext.resetSelectedRows, data])

  const getCells = useCallback(() => {
    const cells = columns.map((column) => <MemoDataTableHeadCell
      key={getColumnKey(column)}
      {...getCellProps?.(column)}
      column={column}
      sortable={(sortable || column.sortable) && Boolean(column.rowComparer)}
      filterable={(filterable || column.filterable) && Boolean(column.rowFilter)}
      sortStrategy={column.dataField
        ? dataTableContext.sortFields.get(column.dataField)
        : undefined
      }
      onHeadCellClick={onHeadCellClick}
    />)

    if (selectable) {
      return [
        <SelectedCheckboxCell
          key="select-all-checkbox"
          onClick={onSelectAllClick}
          selectStatus={dataTableContext.selectAllStatus}
        />,
        cells
      ]
    }

    return cells
  }, [columns, sortable, selectable, filterable, onSelectAllClick, onHeadCellClick, dataTableContext.selectAllStatus])

  const getRows = useCallback(() => {
    return <Row>
      {getCells()}
    </Row>
  }, [getCells])

  const headClassName = classNames("data-table-head", className)

  return <Head className={headClassName} {...restProps}>
    {getRows()}
  </Head>
}

export default memo(DataTableHead);