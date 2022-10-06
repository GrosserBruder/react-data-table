import { Column, DataItem } from "../DataTable";
import DataTableHeadRow, { DataTableHeadRowProps } from "../DataTableHeadRow";
import { memo } from "react";

export type useHeadRowsConfig<T extends DataItem> = Omit<DataTableHeadRowProps<T>, "columns">

const MemoDataTableHeadRow = memo(DataTableHeadRow) as typeof DataTableHeadRow

export function useHeadRows<T extends DataItem>(columns: Array<Column<T>>, config: useHeadRowsConfig<T> = {}) {

  return <MemoDataTableHeadRow<T>
    columns={columns}
    {...config}
  />
}
