import { Table, TableProps } from "@grossb/react-table"
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { DataRow, DataTableColumn } from "./types";
import "../styles/DataTableHead.scss"
import DataTableProvider from "./Context/DataTableProvider";
import useDataTableContext from "./Context/useDataTableBodyRowsContext";
import { ReactNode, useMemo } from "react";

export type NewDataTableProps = {
  tableProps?: TableProps,
  columns: Array<DataTableColumn>
  data?: Array<DataRow>
}

function NewDataTableRaw(props: NewDataTableProps) {
  const { tableProps, columns, data } = props

  const dataTableContext = useDataTableContext()

  const bodyData = useMemo(() => {
    return dataTableContext.sortAndFilterDataRows(data ?? [])
  }, [data, dataTableContext.sortAndFilterDataRows])

  return <div>
    <Table {...tableProps}>
      <DataTableHead columns={columns} />
      <DataTableBody columns={columns} data={bodyData} />
    </Table>
  </div>
}

function NewDataTable(props: NewDataTableProps) {
  return <DataTableProvider columns={props.columns}>
    <NewDataTableRaw {...props} />
  </DataTableProvider>
}

export default NewDataTable;