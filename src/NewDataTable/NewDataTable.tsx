import { Table, TableProps } from "@grossb/react-table"
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { DataRow, DataTableColumn, RowPropsWithoutChildren } from "./types";
import DataTableProvider, { DataTableContextType } from "./Context/DataTableContext/DataTableProvider";
import { useCallback, useMemo } from "react";
import useDataTableContext from "./Context/DataTableContext/useDataTableBodyRowsContext";
import SelectedRowsProvider from "./Context/SelectableContext/SelectedRowsProvider";
import { useDataTableProps } from "./hooks/useDataTableProps";
import "../styles/DataTableHead.scss"

export type NewDataTableProps = {
  tableProps?: TableProps,
  columns: Array<DataTableColumn>
  data?: Array<DataRow>
  filterable?: boolean
  sortable?: boolean
  selectable?: boolean
  rowProps?: ((dataRow: DataRow, dataTableContext: DataTableContextType) => RowPropsWithoutChildren) | RowPropsWithoutChildren
}

function NewDataTableRaw(props: NewDataTableProps) {

  const processedProps = useDataTableProps(props)

  const { tableProps, columns, data, filterable, sortable, selectable, rowProps } = processedProps

  const dataTableContext = useDataTableContext()

  const sortedAndFilteredData = useMemo(() => {
    return dataTableContext.sortAndFilterDataRows(data ?? [])
  }, [data, dataTableContext.sortAndFilterDataRows])

  const getRowProps = useCallback((dataRow: DataRow) => {
    if (typeof rowProps === "function") {
      return rowProps(dataRow, dataTableContext)
    }

    return rowProps
  }, [rowProps, dataTableContext])

  const getBodyCellProps = useCallback((column: DataTableColumn) => {
    if (typeof column.bodyCellProps === "function") {
      return column.bodyCellProps(column, dataTableContext)
    }

    return column.bodyCellProps
  }, [rowProps, dataTableContext])

  const getHeadCellProps = useCallback((column: DataTableColumn) => {
    if (typeof column.headCellProps === "function") {
      return column.headCellProps?.(column, dataTableContext)
    }

    return column.headCellProps
  }, [rowProps, dataTableContext])

  return <div>
    <Table {...tableProps}>
      <DataTableHead
        columns={columns}
        data={sortedAndFilteredData}
        filterable={filterable}
        sortable={sortable}
        selectable={selectable}
        cellProps={getHeadCellProps}
      />
      <DataTableBody
        columns={columns}
        data={sortedAndFilteredData}
        selectable={selectable}
        rowProps={getRowProps}
        cellProps={getBodyCellProps}
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