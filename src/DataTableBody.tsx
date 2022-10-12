import { Body, Cell, Row, RowProps } from "@grossb/react-table";
import { memo, useCallback } from "react";
import { SELECT_STATUSES } from "./constants/const";
import { Column, DataItem } from "./DataTable";
import DataTableBodyRow from "./DataTableBodyRow";
import { primitiveOrFunction } from "./helpers";

export type DataTableBodyProps<T extends DataItem> = {
  columns: Array<Column<T>>
  data: Array<T>
  selectable?: boolean
  onRowClick?: (event: any, dataItem: T) => void
  onSelectClick?: (event: any, currentStatus?: SELECT_STATUSES) => void,
  isSelected?: (item: T) => boolean,
  rowProps?: ((dataItem: T) => RowProps) | RowProps
}

const MemoDataTableRow = memo(DataTableBodyRow) as typeof DataTableBodyRow

function DataTableBody<T extends DataItem>(props: DataTableBodyProps<T>) {
  const { columns, data, selectable, onRowClick, onSelectClick, isSelected, rowProps } = props;

  const onRowClickHandler = useCallback((event: any, dataRow: T, selectStatus?: SELECT_STATUSES) => {
    onRowClick?.(event, dataRow)
  }, [onRowClick])

  if (data.length === 0) {
    const colspan = selectable ? columns.length + 1 : columns.length

    return <Body>
      <Row className="data-table__empty-row">
        <Cell colSpan={colspan}>
          Список пуст
        </Cell>
      </Row>
    </Body>
  }

  return <Body>
    {
      data.map((dataItem) => <MemoDataTableRow<T>
        key={dataItem.id ?? dataItem}
        columns={columns}
        dataItem={dataItem}
        onClick={onRowClickHandler}
        selectable={selectable}
        isSelected={isSelected?.(dataItem)}
        onSelectClick={onSelectClick}
        {...primitiveOrFunction(rowProps, dataItem)}
      />
      )
    }
  </Body>
}

export default DataTableBody;