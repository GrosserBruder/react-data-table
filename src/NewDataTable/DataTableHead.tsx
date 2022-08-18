import { Head, Row } from "@grossb/react-table"
import { memo, useCallback } from "react";
import { SELECT_ALL_STATUSES, SORT_STRATEGY } from "../const";
import { DataRow, DataTableColumn } from "./types";
import useDataTableContext from "./Context/DataTableContext/useDataTableContext";
import { SelectedCheckboxCell } from "./Components";
import DataTableHeadCell from "./Components/DataTableHeadCell";
import { getColumnKey } from "../utils";

export type DataTableHeadProps = {
  columns: Array<DataTableColumn>
  data: Array<DataRow>
  filterable?: boolean
  sortable?: boolean
  selectable?: boolean
}

const MemoDataTableHeadCell = memo(DataTableHeadCell)

function DataTableHead(props: DataTableHeadProps) {
  const { columns, data, filterable, sortable, selectable } = props

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

  const getCells = useCallback(() => {
    const cells = columns.map((column) => <MemoDataTableHeadCell
      key={getColumnKey(column)}
      column={column}
      sortable={sortable}
      filterable={filterable}
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

  return <Head className="data-table-head">
    {getRows()}
  </Head>
}

export default memo(DataTableHead);