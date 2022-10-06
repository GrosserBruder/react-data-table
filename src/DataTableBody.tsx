import { Body } from "@grossb/react-table"
import { useCallback } from "react";
import { SELECT_STATUSES } from "./constants/const";
import { Column, DataItem } from "./DataTable";
import { useBodyRows } from "./hooks/useBodyRows";

export type DataTableBodyProps<T extends DataItem> = {
  columns: Array<Column<T>>
  data: Array<T>
  selectable?: boolean
  onRowClick?: (event: any, dataItem: T) => void
  onSelectClick?: (event: any, currentStatus?: SELECT_STATUSES) => void,
  isSelected?: (item: T) => boolean,
}

function DataTableBody<T extends DataItem>(props: DataTableBodyProps<T>) {
  const { columns, data, selectable, onRowClick, onSelectClick, isSelected } = props;

  const onRowClickHandler = useCallback((event: any, dataRow: T, selectStatus?: SELECT_STATUSES) => {
    onRowClick?.(event, dataRow)
  }, [onRowClick])

  const bodyRowsHook = useBodyRows(data, columns, { onRowClick: onRowClickHandler, selectable, onSelectClick, isSelected })

  return <Body>
    {bodyRowsHook}
  </Body>
}

export default DataTableBody;