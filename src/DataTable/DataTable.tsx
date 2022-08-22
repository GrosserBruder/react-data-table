import { Table, TableProps } from "@grossb/react-table";
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { BodyPropsCommunity, CellPropsCommunity, DataRow, DataTableColumn, HeadCellPropsCommunity, HeadPropsCommunity, RowPropsCommunity } from "./types";
import { useEffect, useMemo } from "react";
import "../styles/DataTable.scss"
import { useDataTableContext } from "./Context";
import { onFilterChangeListener, onSortChangeListener, useListeners } from "./hooks";
import { onSelectedRowsChangeListener } from "./hooks/useListeners";

export type DataTableProps = {
  tableProps?: TableProps,
  filterable?: boolean
  sortable?: boolean
  selectable?: boolean
  getBodyCellProps?: (dataRow: DataRow, column: DataTableColumn) => CellPropsCommunity
  getRowProps?: (dataRow: DataRow) => RowPropsCommunity
  bodyProps?: BodyPropsCommunity
  headProps?: HeadPropsCommunity
  getHeadCellProps?: (column: DataTableColumn) => HeadCellPropsCommunity
  disableSelectOnClick?: boolean
  onRowClick?: (event: any, dataRow: DataRow) => void
  disableFiltersAndSortingOnClientSide?: boolean
  onFilterChange?: onFilterChangeListener
  onSortChange?: onSortChangeListener
  onSelectedRowsChange?: onSelectedRowsChangeListener
}

function DataTable(props: DataTableProps) {
  const {
    tableProps, filterable, sortable, selectable, disableSelectOnClick, onRowClick,
    getBodyCellProps, getRowProps, bodyProps, headProps, getHeadCellProps,
    disableFiltersAndSortingOnClientSide, onFilterChange, onSortChange,
    onSelectedRowsChange
  } = props

  const dataTableContext = useDataTableContext()

  useListeners(onFilterChange, onSortChange, onSelectedRowsChange)

  const columns = dataTableContext.props.columns
  const data = dataTableContext.props.data

  const sortedAndFilteredData = useMemo(() => {
    if (disableFiltersAndSortingOnClientSide) return data;

    const filteredData = dataTableContext.filterDataRows(data ?? [])

    return dataTableContext.sortDataRows(filteredData)
  }, [data, dataTableContext.filterDataRows, dataTableContext.sortDataRows, disableFiltersAndSortingOnClientSide])

  // убираем из выбранных строки, которые скрылить при обновлении фильтров
  useEffect(() => {
    if (sortedAndFilteredData.length === 0) return;

    const notExistingSelectedRows = dataTableContext.selectedRows.filter(
      (selectedRow) => sortedAndFilteredData.findIndex(((item) => selectedRow.id === item.id)) === -1
    )

    if (notExistingSelectedRows.length > 0) {
      dataTableContext.removeSelectedRows(notExistingSelectedRows)
    }
  }, [sortedAndFilteredData])

  return <Table {...tableProps} className="data-table">
    <DataTableHead
      {...headProps}
      columns={dataTableContext.props.columns}
      data={sortedAndFilteredData}
      filterable={filterable}
      sortable={sortable}
      selectable={selectable}
      getCellProps={getHeadCellProps}
    />
    <DataTableBody
      {...bodyProps}
      columns={columns}
      data={sortedAndFilteredData}
      selectable={selectable}
      getCellProps={getBodyCellProps}
      getRowProps={getRowProps}
      disableSelectOnClick={disableSelectOnClick}
      onRowClick={onRowClick}
    />
  </Table>
}

export default DataTable;