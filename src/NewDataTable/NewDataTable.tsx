import { Table, TableProps } from "@grossb/react-table"
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { DataRow, DataTableColumn } from "./types";
import "../styles/DataTableHead.scss"
import DataTableProvider from "./Context/DataTableContext/DataTableProvider";
import { useMemo } from "react";
import useDataTableContext from "./Context/DataTableContext/useDataTableBodyRowsContext";
import SelectedRowsProvider from "./Context/SelectableContext/SelectedRowsProvider";

export type NewDataTableProps = {
  tableProps?: TableProps,
  columns: Array<DataTableColumn>
  data?: Array<DataRow>
}

function NewDataTableRaw(props: NewDataTableProps) {
  const { tableProps, columns, data } = props

  const dataTableContext = useDataTableContext()

  const sortedAndFilteredData = useMemo(() => {
    return dataTableContext.sortAndFilterDataRows(data ?? [])
  }, [data, dataTableContext.sortAndFilterDataRows])

  return <div>
    <Table {...tableProps}>
      <DataTableHead columns={columns} data={sortedAndFilteredData} />
      <DataTableBody columns={columns} data={sortedAndFilteredData} />
    </Table>
  </div>
}

function NewDataTable(props: NewDataTableProps) {
  return <DataTableProvider columns={props.columns}>
    <SelectedRowsProvider dataRowsLength={props.data?.length}>
      <NewDataTableRaw {...props} />
    </SelectedRowsProvider>
  </DataTableProvider>
}

export default NewDataTable;