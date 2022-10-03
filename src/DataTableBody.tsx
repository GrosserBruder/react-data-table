import { Body } from "@grossb/react-table"
import { useCallback } from "react";
import { SELECT_STATUSES } from "./constants/const";
import { Column, DataItem } from "./DataTable";
import { useBodyRows } from "./hooks/useBodyRows";

export type DataTableBodyProps = {
  columns: Array<Column>
  data: Array<DataItem>
  selectable?: boolean
  onRowClick?: (event: any, dataItem: DataItem) => void
  onSelectClick?: (event: any, currentStatus?: SELECT_STATUSES) => void,
  isSelected?: (item: DataItem) => boolean,
}

function DataTableBody(props: DataTableBodyProps) {
  const { columns, data, selectable, onRowClick, onSelectClick, isSelected } = props;

  const onRowClickHandler = useCallback((event: any, dataRow: DataItem, selectStatus?: SELECT_STATUSES) => {
    onRowClick?.(event, dataRow)
  }, [onRowClick])

  const bodyRowsHook = useBodyRows(data, columns, { onRowClick: onRowClickHandler, selectable, onSelectClick, isSelected })

  return <Body>
    {bodyRowsHook}
  </Body>
}

export default DataTableBody;