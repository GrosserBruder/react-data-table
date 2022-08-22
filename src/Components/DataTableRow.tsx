import { Row } from "@grossb/react-table";
import { memo, useCallback } from "react";
import { SELECT_STATUSES } from "../const";
import { getColumnKey } from "../utils";
import { CellPropsCommunity, DataRow, DataTableColumn, RowPropsCommunity } from "../DataTable/types";
import DataTableCell from "./DataTableCell";
import { SelectedCheckboxCell } from "./SelectedCheckboxCell";

export type DataTableRowProps = Omit<RowPropsCommunity, "onClick"> & {
  columns: Array<DataTableColumn>
  dataRow: DataRow
  selectable?: boolean
  onSelectClick?: (dataRow: DataRow, currentStatus?: SELECT_STATUSES) => void
  selectStatus?: SELECT_STATUSES
  getCellProps?: (dataRow: DataRow, column: DataTableColumn) => CellPropsCommunity
  onClick?: (event: any, dataRow: DataRow, currentStatus?: SELECT_STATUSES) => void
}

const MemoDataTableCell = memo(DataTableCell)

function DataTableRow(props: DataTableRowProps) {
  const { columns, dataRow, selectable, onSelectClick, selectStatus, getCellProps, onClick, ...restProps } = props;

  const onSelectClickHandler = useCallback((currentStatus?: SELECT_STATUSES) => {
    onSelectClick?.(dataRow, currentStatus)
  }, [dataRow, onSelectClick])

  const onClickHandler = useCallback((event: any) => {
    onClick?.(event, dataRow, selectStatus)
  }, [onClick, dataRow, selectStatus])

  const getCells = useCallback((dataRow: DataRow) => {
    const cells = columns.map((column) => <MemoDataTableCell
      key={getColumnKey(column)}
      column={column}
      dataRow={dataRow}
      {...getCellProps?.(dataRow, column)}
    />)

    if (selectable) {
      return [
        <SelectedCheckboxCell key="" onClick={onSelectClickHandler} selectStatus={selectStatus} />,
        cells
      ]
    }

    return cells
  }, [columns, selectable, onSelectClick, selectStatus])

  return <Row key={dataRow.id} {...restProps} onClick={onClickHandler}>
    {getCells(dataRow)}
  </Row>
}

export default DataTableRow;