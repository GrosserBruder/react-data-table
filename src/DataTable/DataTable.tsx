import { Table, TableProps } from "@grossb/react-table";
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { BodyPropsCommunity, CellPropsCommunity, DataRow, DataTableColumn, HeadCellPropsCommunity, HeadPropsCommunity, RowPropsCommunity } from "./types";
import { useMemo } from "react";
import { useDataTableProps } from "./hooks/useDataTableProps";
import "../styles/DataTable.scss"
import { useDataTableContext, DataTableProvider } from "./Context";

export type DataTableProps = {
  tableProps?: TableProps,
  columns: Array<DataTableColumn>
  data?: Array<DataRow>
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
    tableProps, columns, data = [], filterable, sortable, selectable,
    getBodyCellProps, getRowProps, bodyProps, headProps, getHeadCellProps
  } = processedProps

  const dataTableContext = useDataTableContext()

  const sortedAndFilteredData = useMemo(() => {
    const filteredData = dataTableContext.filterDataRows(data ?? [])
    return dataTableContext.sortDataRows(filteredData)
  }, [data, dataTableContext.filterDataRows, dataTableContext.sortDataRows])

  return <Table {...tableProps} className="data-table">
    <DataTableHead
      {...headProps}
      columns={columns}
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

function DataTable(props: DataTableProps) {
  return <DataTableProvider columns={props.columns} data={props.data ?? []}>
    <DataTableRaw {...props} />
  </DataTableProvider>
}

export default DataTable;