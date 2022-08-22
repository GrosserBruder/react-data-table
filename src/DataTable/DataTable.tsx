import { Table, TableProps } from "@grossb/react-table";
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { BodyPropsCommunity, CellPropsCommunity, DataRow, DataTableColumn, HeadCellPropsCommunity, HeadPropsCommunity, RowPropsCommunity } from "./types";
import { useMemo } from "react";
import "../styles/DataTable.scss"
import { useDataTableContext } from "./Context";

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
}

function DataTableRaw(props: DataTableProps) {

  const {
    tableProps, filterable, sortable, selectable, disableSelectOnClick, onRowClick,
    getBodyCellProps, getRowProps, bodyProps, headProps, getHeadCellProps
  } = props

  const dataTableContext = useDataTableContext()

  const columns = dataTableContext.props.columns
  const data = dataTableContext.props.data

  const sortedAndFilteredData = useMemo(() => {
    const filteredData = dataTableContext.filterDataRows(data ?? [])

    // убираем из выбранных строки, которые скрылить при обновлении фильтров
    const notExistingSelectedRows = dataTableContext.selectedRows.filter(
      (selectedRow) => filteredData.findIndex(((filteredDataItem) => selectedRow.id === filteredDataItem.id)) === -1
    )

    if (notExistingSelectedRows.length > 0) {
      dataTableContext.removeSelectedRows(notExistingSelectedRows)
    }

    return dataTableContext.sortDataRows(filteredData)
  }, [data, dataTableContext.filterDataRows, dataTableContext.sortDataRows])

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

export default DataTableRaw;