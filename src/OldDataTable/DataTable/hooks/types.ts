import { ResultCompare } from './../../utils';
import { FilterValue } from './../../Filter';
import { TableRowProps, BodyLineCell } from "../types"

export type FilterProps = {
  initialFilteredRows?: Array<TableRowProps<BodyLineCell>>
}

export type FilterChecker = (cell: BodyLineCell, filterValue?: FilterValue) => boolean;
export type FilterCheckers = {
  [filterFieldKey: string]: FilterChecker
};

export type FilterComparer = (
  first: BodyLineCell,
  second: BodyLineCell,
  filterValue?: FilterValue
) => ResultCompare;

export type FilterComparers = {
  [filterFieldKey: string]: FilterComparer
};
