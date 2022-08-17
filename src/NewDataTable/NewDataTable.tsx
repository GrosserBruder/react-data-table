import { Table, TableProps } from "@grossb/react-table"
import DataTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import { DataRow, DataTableColumn, RowPropsWithoutChildren } from "./types";
import { useCallback, useMemo } from "react";
import SelectedRowsProvider, { SelectedRowsContextType } from "./Context/SelectableContext/SelectedRowsProvider";
import { useDataTableProps } from "./hooks/useDataTableProps";
import "../styles/DataTableHead.scss"
import FilterProvider from "./Context/FilterContext/FilterProvider";
import SortProvider from "./Context/SortContext/SortProvider";
import useFilterContext from "./Context/FilterContext/useFilterContext";
import useSortContext from "./Context/SortContext/useSortContext";
import useSelectedRowsContext from "./Context/SelectableContext/useSelectedRowsContext";

export type NewDataTableProps = {
  tableProps?: TableProps,
  columns: Array<DataTableColumn>
  data?: Array<DataRow>
  filterable?: boolean
  sortable?: boolean
  selectable?: boolean
  rowProps?: ((dataRow: DataRow, selectedRowsContext: SelectedRowsContextType) => RowPropsWithoutChildren) | RowPropsWithoutChildren
}

function NewDataTableRaw(props: NewDataTableProps) {

  const processedProps = useDataTableProps(props)

  const { tableProps, columns, data, filterable, sortable, selectable, rowProps } = processedProps

  const filterContext = useFilterContext()
  const sortContext = useSortContext()
  const selectedRowsContext = useSelectedRowsContext()

  const sortedAndFilteredData = useMemo(() => {
    const filteredData = filterContext.filterDataRows(data ?? [])
    return sortContext.sortDataRows(filteredData)
  }, [data, filterContext.filterDataRows, sortContext.sortDataRows])

  const getRowProps = useCallback((dataRow: DataRow) => {
    if (typeof rowProps === "function") {
      return rowProps(dataRow, selectedRowsContext)
    }

    return rowProps
  }, [rowProps, selectedRowsContext])

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
  return <FilterProvider columns={props.columns}>
    <SortProvider columns={props.columns}>
      <SelectedRowsProvider dataRowsLength={props.data?.length}>
        <NewDataTableRaw {...props} />
      </SelectedRowsProvider>
    </SortProvider>
  </FilterProvider>
}

export default NewDataTable;