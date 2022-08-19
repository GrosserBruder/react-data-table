import { Body, Cell, Row } from "@grossb/react-table"
import { memo, useCallback } from "react";
import { SELECT_ALL_STATUSES } from "../const";
import { DataTableRow } from "../Components";
import { useDataTableContext } from "./Context";
import { BodyPropsCommunity, CellPropsCommunity, DataRow, DataTableColumn, RowPropsCommunity } from "./types";

export type DataTableBodyProps = BodyPropsCommunity & {
  columns: Array<DataTableColumn>
  data?: Array<DataRow>
  selectable?: boolean
  getCellProps?: (dataRow: DataRow, column: DataTableColumn) => CellPropsCommunity
  getRowProps?: (dataRow: DataRow) => RowPropsCommunity
}

const MemoDataTableRow = memo(DataTableRow)

function DataTableBody(props: DataTableBodyProps) {
  const { columns, data, selectable, getCellProps, getRowProps, ...restProps } = props;

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
        <Cell colSpan={colspan} className="data-table__empty-row">
          Список пуст
        </Cell>
      </Row>
    }

    return data?.map((dataRow) => <MemoDataTableRow
      key={dataRow.id}
      columns={columns}
      dataRow={dataRow}
      selectable={selectable}
      onSelectClick={onSelectClick}
      selectStatus={dataTableContext.getSelectStatus?.(dataRow)}
      getCellProps={getCellProps}
      {...getRowProps?.(dataRow)}
    />)
  }, [data, columns, selectable, dataTableContext.getSelectStatus, onSelectClick])

  return <Body {...restProps}>
    {getRows()}
  </Body>
}

export default memo(DataTableBody);