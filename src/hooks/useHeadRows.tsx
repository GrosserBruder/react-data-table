import { Column } from "../DataTable";
import DataTableHeadRow, { DataTableHeadRowProps } from "../DataTableHeadRow";
import { memo } from "react";

export type useHeadRowsConfig = Omit<DataTableHeadRowProps, "columns">

const MemoDataTableHeadRow = memo(DataTableHeadRow)

export function useHeadRows(columns: Array<Column>, config: useHeadRowsConfig = {}) {

  return <MemoDataTableHeadRow
    columns={columns}
    {...config}
  />
}
