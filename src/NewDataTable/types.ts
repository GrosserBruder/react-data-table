import { CellProps, RowProps } from "@grossb/react-table"
import { HeadCellProps } from "../Components"

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