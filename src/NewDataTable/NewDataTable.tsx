import { Cell, Head, Row, Table, TableProps } from "@grossb/react-table"
import DataTableBodyRowsContextProvider from "../Context/DataTableContext/DataTableBodyRowsContext";
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { DataTableBodyRow, DataTableHeadRow } from "./types";

export type NewDataTableProps = {
  headRows?: Array<DataTableHeadRow>,
  bodyRows?: Array<DataTableBodyRow>
  tableProps?: TableProps,
}

function NewDataTable(props: NewDataTableProps) {
  const { tableProps, headRows } = props
  return <div>
    <DataTableBodyRowsContextProvider bodyRows={props.bodyRows}>
      <Table {...tableProps}>
        <DataTableHead rows={headRows} />
        <DataTableBody />
      </Table>
    </DataTableBodyRowsContextProvider>
  </div>
}

export default NewDataTable;