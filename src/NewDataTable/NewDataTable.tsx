import { Table, TableProps } from "@grossb/react-table"
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { DataRow, DataTableColumn } from "./types";
import "../styles/DataTableHead.scss"
import DataTableProvider from "./Context/DataTableContext/DataTableProvider";
import { useMemo } from "react";
import useDataTableContext from "./Context/DataTableContext/useDataTableBodyRowsContext";
import SelectedRowsProvider from "./Context/SelectableContext/SelectedRowsProvider";
import { useDataTableProps } from "./hooks/useDataTableProps";

export type NewDataTableProps = {
  tableProps?: TableProps,
  columns: Array<DataTableColumn>
  data?: Array<DataRow>
  filterable?: boolean
  sortable?: boolean
  selectable?: boolean
}

function NewDataTableRaw(props: NewDataTableProps) {

  const processedProps = useDataTableProps(props)

  const { tableProps, columns, data, filterable, sortable, selectable } = processedProps

  const dataTableContext = useDataTableContext()

  const sortedAndFilteredData = useMemo(() => {
    return dataTableContext.sortAndFilterDataRows(data ?? [])
  }, [data, dataTableContext.sortAndFilterDataRows])

  return <div>
    <Table {...tableProps}>
      <DataTableHead
        columns={columns}
        data={sortedAndFilteredData}
        filterable={filterable}
        sortable={sortable}
        selectable={selectable}
      />
      <DataTableBody
        columns={columns}
        data={sortedAndFilteredData}
        selectable={selectable}
      />
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