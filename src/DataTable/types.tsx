import { CellProps } from "@grossb/react-table/dist/Cell"
import { RowProps } from "@grossb/react-table/dist/Row"
import { TableProps } from "@grossb/react-table/dist/Table"
import { FC } from "react"
import { HeadCellProps } from "../Components/HeadCell/HeadCell"
import { FilterCheckers, FilterComparers, FilterProps as HookFilterProps } from './hooks/types';
import { ToolbarProps } from "../Components/Toolbar/CrudToolbar"
import { FilterProps } from "../Filter"

export type LineCell = {
  id: string | number,
  value?: any,
  renderComponent?: FC<BodyLineCell>,
  cellComponent?: FC<any>,
  filterKey?: string,
}

export type HeadLineCell = LineCell & {
  config?: HeadCellProps
  columnValue?: any
}

export type BodyLineCell = LineCell & {
  config?: CellProps
}

export type TableRowProps<CellType> = {
  id: string | number,
  cells: Array<CellType>,
  render?: FC<RowProps>
  config?: RowProps
}

export type DataTableProps = {
  onRowClick?: (row: TableRowProps<BodyLineCell>) => void,
  onSelect?: (row: TableRowProps<BodyLineCell>, isSelected: boolean) => void,
  onSelectAll?: (selectedRows: Array<TableRowProps<BodyLineCell>>) => void,
  tableProps?: Omit<TableProps, 'children'>,
  filterProps?: HookFilterProps,
  filterComponentProps?: FilterProps
  headLines: Array<TableRowProps<HeadLineCell>>,
  bodyLines: Array<TableRowProps<BodyLineCell>>,
  filterable?: boolean,
  selectable?: boolean,
  toolbar: FC<ToolbarProps>
  disableToolbar?: boolean
  additionalToolbar?: FC<ToolbarProps>
  disableSetCheckboxAfterRowClick?: boolean,
  filterCheckers?: FilterCheckers
  filterComparers?: FilterComparers
}