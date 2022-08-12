import { Table, TableProps } from "@grossb/react-table"
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { DataRow, DataTableColumn } from "./types";
import "../styles/DataTableHead.scss"
import DataTableProvider from "./Context/DataTableProvider";

export type NewDataTableProps = {
  tableProps?: TableProps,
  columns: Array<DataTableColumn>
  data?: Array<DataRow>
}

function NewDataTable(props: NewDataTableProps) {
  const { tableProps, columns, data } = props

  // подумать как получить состояние из DataTableProvider

  return <div>
    <DataTableProvider columns={columns}>
      <Table {...tableProps}>
        <DataTableHead columns={columns} />
        <DataTableBody columns={columns} data={data} />
      </Table>
    </DataTableProvider>
  </div>
}

export default NewDataTable;