import { Table, TableProps } from "@grossb/react-table"
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { DataItem, DataTableColumn } from "./types";

export type NewDataTableProps = {
  tableProps?: TableProps,
  columns: Array<DataTableColumn>
  data?: Array<DataItem>
}

function NewDataTable(props: NewDataTableProps) {
  const { tableProps, columns, data } = props

  return <div>
    <Table {...tableProps}>
      <DataTableHead columns={columns} />
      <DataTableBody columns={columns} data={data} />
    </Table>
  </div>
}

export default NewDataTable;