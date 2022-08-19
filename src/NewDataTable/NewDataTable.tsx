import { Table, TableProps } from "@grossb/react-table/dist/Table";
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { DataRow, DataTableColumn, RowPropsWithoutChildren } from "./types";
import { useCallback, useMemo } from "react";
import { useDataTableProps } from "./hooks/useDataTableProps";
import "../styles/DataTableHead.scss"
import useDataTableContext from "./Context/DataTableContext/useDataTableContext";
import DataTableProvider, { DataTableContextType } from "./Context/DataTableContext/DataTableProvider";

export type NewDataTableProps = {
  tableProps?: TableProps,
  columns: Array<DataTableColumn>
  data?: Array<DataRow>
  filterable?: boolean
  sortable?: boolean
  selectable?: boolean
  rowProps?: ((dataRow: DataRow, selectedRowsContext: DataTableContextType) => RowPropsWithoutChildren) | RowPropsWithoutChildren
}

function NewDataTableRaw(props: NewDataTableProps) {

  const processedProps = useDataTableProps(props)

  const { tableProps, columns, data = [], filterable, sortable, selectable, rowProps } = processedProps

  const dataTableContext = useDataTableContext()

  const sortedAndFilteredData = useMemo(() => {
    const filteredData = dataTableContext.filterDataRows(data ?? [])
    return dataTableContext.sortDataRows(filteredData)
  }, [data, dataTableContext.filterDataRows, dataTableContext.sortDataRows])

  const getRowProps = useCallback((dataRow: DataRow) => {
    if (typeof rowProps === "function") {
      return rowProps(dataRow, dataTableContext)
    }

    return rowProps
  }, [rowProps, dataTableContext])

  const getBodyCellProps = useCallback((column: DataTableColumn) => {
    if (typeof column.bodyCellProps === "function") {
      return column.bodyCellProps(column)
    }

    return column.bodyCellProps
  }, [rowProps])

  const getHeadCellProps = useCallback((column: DataTableColumn) => {
    if (typeof column.headCellProps === "function") {
      return column.headCellProps?.(column)
    }

    return column.headCellProps
  }, [rowProps])

  return <Table {...tableProps}>
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
      rowProps={getRowProps}
      cellProps={getBodyCellProps}
    />
  </Table>
}

function NewDataTable(props: NewDataTableProps) {
  return <DataTableProvider columns={props.columns} data={props.data ?? []}>
    <NewDataTableRaw {...props} />
  </DataTableProvider>
}

export default NewDataTable;