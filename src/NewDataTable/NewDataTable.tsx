import { Cell, Head, Row, Table, TableProps } from "@grossb/react-table"
import DataTableApiContext from "../Context/DataTableApiContext/DataTableApiContextProvider";
import DataTableBodyRowsContextProvider from "../Context/DataTableContext/DataTableBodyRowsContextProvider";
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { useDataTableProps } from "./hooks/useDataTableProps";
import { DataTableBodyRow, DataTableHeadRow } from "./types";

export type NewDataTableProps = {
  headRows?: Array<DataTableHeadRow>,
  bodyRows?: Array<DataTableBodyRow>
  tableProps?: TableProps,
}

function NewDataTable(props: NewDataTableProps) {
  const { tableProps, headRows } = props

  const processedProps = useDataTableProps(props)

  return <div>
    <DataTableBodyRowsContextProvider bodyRows={props.bodyRows}>
      <DataTableApiContext props={processedProps}>
        <Table {...tableProps}>
          <DataTableHead rows={headRows} />
          <DataTableBody />
        </Table>
      </DataTableApiContext>
    </DataTableBodyRowsContextProvider>
  </div>
}

export default NewDataTable;