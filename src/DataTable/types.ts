import { HeadCellProps } from '../BaseComponents/HeadCell/HeadCell';
import { CellProps, RowProps } from "@grossb/react-table"
import { ReactNode } from "react"

export type ColumnFilter = {
  search?: string,
  [key: string]: any,
}

export type DataTableColumn = {
  id?: string,
  dataField?: string,
  header?: ReactNode,
  valueGetter?: (value: DataRow) => ReactNode | JSX.Element,
  rowComparer?: (first: DataRow, second: DataRow) => -1 | 0 | 1
  rowFilter?: (row: DataRow, filter?: ColumnFilter) => boolean
  filterComponent?: ReactNode
  filterable?: boolean,
  sortable?: boolean,
  headCellProps?: ((column: DataTableColumn) => HeadCellProps) | HeadCellProps
  bodyCellProps?: ((column: DataTableColumn) => CellProps) | CellProps
}

export type DataRow = {
  id: number | string,
  [key: string]: any,
}

export type RowPropsWithoutChildren = Omit<RowProps, "children">