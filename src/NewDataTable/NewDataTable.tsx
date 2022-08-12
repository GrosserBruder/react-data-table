import { Table, TableProps } from "@grossb/react-table"
import DataTableBodyRowsContextProvider from "../Context/DataTableContext/DataTableBodyRowsContextProvider";
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { DataTableBodyRow, DataTableColumn, DataTableHeadRow } from "./types";

export type NewDataTableProps = {
  headRows?: Array<DataTableHeadRow>,
  bodyRows?: Array<DataTableBodyRow>
  tableProps?: TableProps,
  columns: Array<DataTableColumn>
  data?: Array<any>
}

function NewDataTable(props: NewDataTableProps) {
  const { tableProps, columns, data } = props

  return <div>
    <DataTableBodyRowsContextProvider bodyRows={props.bodyRows}>
      <Table {...tableProps}>
        <DataTableHead columns={columns} />
        <DataTableBody columns={columns} data={data} />
      </Table>
    </DataTableBodyRowsContextProvider>
  </div>
}

export default NewDataTable;