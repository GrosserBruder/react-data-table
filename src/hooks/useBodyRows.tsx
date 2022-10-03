import { Column, DataItem } from "../DataTable";
import { Row, Cell } from "@grossb/react-table"
import { memo } from "react";
import DataTableBodyRow from "../DataTableBodyRow";
import { SELECT_STATUSES } from "../constants/const";

const MemoDataTableRow = memo(DataTableBodyRow)

export type useBodyRowsConfig = {
  onRowClick?: (event: any, dataItem: DataItem) => void,
  selectable?: boolean,
  isSelected?: (item: DataItem) => boolean,
  onSelectClick?: (event: any, currentStatus?: SELECT_STATUSES) => void,
}

export function useBodyRows(data: Array<DataItem>, columns: Array<Column>, config: useBodyRowsConfig = {}) {
  const { onRowClick, selectable, isSelected, onSelectClick } = config
  const colspan = selectable ? columns.length + 1 : columns.length

  if (data.length === 0) {
    return <Row className="data-table__empty-row">
      <Cell colSpan={colspan}>
        Список пуст
      </Cell>
    </Row>
  }

  return data.map((dataItem) => <MemoDataTableRow
    key={dataItem.id ?? dataItem}
    columns={columns}
    dataItem={dataItem}
    onClick={onRowClick}
    selectable={selectable}
    isSelected={isSelected?.(dataItem)}
    onSelectClick={onSelectClick}
  />
  )
}
