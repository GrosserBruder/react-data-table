import { Body, Cell, CellProps, Row } from "@grossb/react-table"
import { memo, useCallback } from "react";
import { SELECT_ALL_STATUSES } from "../const";
import { DataTableRow } from "../Components";
import { useDataTableContext } from "./Context";
import { DataRow, DataTableColumn, RowPropsWithoutChildren } from "./types";

export type DataTableBodyProps = {
  columns: Array<DataTableColumn>
  data?: Array<DataRow>
  selectable?: boolean
  rowProps?: (dataRow: DataRow) => RowPropsWithoutChildren | undefined
  cellProps?: (column: DataTableColumn) => CellProps | undefined
}

const MemoRow = memo(DataTableRow)

function DataTableBody(props: DataTableBodyProps) {
  const { columns, data, selectable } = props;

  const dataTableContext = useDataTableContext()

  const onSelectClick = useCallback((row: DataRow, currentStatus?: SELECT_ALL_STATUSES) => {
    if (currentStatus === SELECT_ALL_STATUSES.SELECTED) {
      dataTableContext.removeSelectedRows?.(row)
    } else {
      dataTableContext.addSelectedRows?.(row)
    }
  }, [dataTableContext.addSelectedRows, dataTableContext.removeSelectedRows])

  const getRows = useCallback(() => {
    if (data?.length === 0) {

      const colspan = selectable ? columns.length + 1 : columns.length

      return <Row>
        <Cell colSpan={colspan}>
          Список пуст
        </Cell>
      </Row>
    }

    return data?.map((dataRow) => <MemoRow
      key={dataRow.id}
      columns={columns}
      dataRow={dataRow}
      selectable={selectable}
      onSelectClick={onSelectClick}
      selectStatus={dataTableContext.getSelectStatus?.(dataRow)}
    />)
  }, [data, columns, selectable, dataTableContext.getSelectStatus, onSelectClick])

  return <Body>
    {getRows()}
  </Body>
}

export default memo(DataTableBody);