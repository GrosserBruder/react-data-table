import { CellProps, RowProps, TableProps } from "@grossb/react-table"
import { ReactNode } from "react"
import { HeadCellProps } from "../Components"
import { ColumnFilter } from "./Context/useFilter"

export type DataTableCell = {
  id: string | number,
  value: any,
  render?: (value: any) => JSX.Element,
}

export type DataTableHeadCell = DataTableCell & {
  config?: HeadCellProps
}

export type DataTableBodyCell = DataTableCell & {
  config?: CellProps,
}

export type DataTableRow = {
  id: string | number,
  config?: RowProps,
  render?: (props: any) => JSX.Element,
}

export type DataTableHeadRow = DataTableRow & {
  cells?: Array<DataTableHeadCell>,
}

export type DataTableBodyRow = DataTableRow & {
  cells?: Array<DataTableBodyCell>,
}

export type ProcessedDataTableProps = {
  headRows?: Array<DataTableHeadRow>,
  bodyRows?: Array<DataTableBodyRow>
  tableProps?: TableProps,
  onRowClick?: (event: any, row: DataTableBodyRow) => void
  selectable?: boolean
  disableSetCheckboxAfterRowClick?: boolean
}

export type DataTableApi = {
  onSelect?: (row: DataTableBodyRow, isSelected: boolean) => void,
  onBodyCheckboxClick?: (row: DataTableBodyRow) => void,
  onRowClick?: (event: any, row: DataTableBodyRow) => void,
  onCheckboxClick?: (event: any, row: DataTableBodyRow) => void,
}

export type DataTableColumn = {
  id?: string,
  dataField?: string,
  header?: ReactNode,
  valueGetter?: (value: DataRow) => ReactNode | JSX.Element,
  rowComparer?: (first: DataRow, second: DataRow) => -1 | 0 | 1
  rowFilter?: (row: DataRow, filter: ColumnFilter) => boolean
  filterComponent?: ReactNode
}

export type DataRow = {
  id: number | string,
  [key: string]: any,
}