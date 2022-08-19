import { Table, TableProps } from "@grossb/react-table";
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { BodyPropsCommunity, CellPropsCommunity, DataRow, DataTableColumn, HeadCellPropsCommunity, HeadPropsCommunity, RowPropsCommunity } from "./types";
import { useMemo } from "react";
import { useDataTableProps } from "./hooks/useDataTableProps";
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
}

function DataTableRaw(props: DataTableProps) {

  const processedProps = useDataTableProps(props)

  const {
    tableProps, filterable, sortable, selectable,
    getBodyCellProps, getRowProps, bodyProps, headProps, getHeadCellProps
  } = processedProps

  const dataTableContext = useDataTableContext()

  const columns = dataTableContext.props.columns
  const data = dataTableContext.props.data

  const sortedAndFilteredData = useMemo(() => {
    const filteredData = dataTableContext.filterDataRows(data ?? [])
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
    />
  </Table>
}

export default DataTableRaw;