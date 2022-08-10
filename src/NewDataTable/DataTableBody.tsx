import { Body, Cell, Row } from "@grossb/react-table"
import { memo, useCallback } from "react";
import useDataTableBodyRowsContext from "../Context/DataTableContext/useDataTableBodyRowsContext";
import { DataTableBodyCell, DataTableBodyRow } from "./types";

function DataTableBody() {
  const context = useDataTableBodyRowsContext()

  const onRowClick = useCallback(() => { }, [])
  const onCheckboxClick = useCallback(() => { }, [])
  const renderBodyCellValue = useCallback((value: any) => value, [])

  // const onRowClick = (event: any) => {
  //   onRowClickProps?.(row)
  //   selectable && !disableSetCheckboxAfterRowClick && onBodyCheckboxClick(row)
  // }

  // const onCheckboxClick = (event: any) => {
  //   event.stopPropagation();
  //   onBodyCheckboxClick(row)
  // }

  const getBodyCell = useCallback((bodyLineCell: DataTableBodyCell) => {
    return <Cell
      key={bodyLineCell.id}
      {...bodyLineCell.config}
    >
      {
        bodyLineCell.render
          ? bodyLineCell.render?.(bodyLineCell)
          : renderBodyCellValue(bodyLineCell.value)
      }
    </Cell>
  }, [])

  const getRow = useCallback((row: DataTableBodyRow) => {
    const RowComponent = row.render || Row

    return <RowComponent key={row.id} {...row.config} onClick={onRowClick}>
      {/* {selectable && <Cell className="cell__select">
        <Checkbox
          checked={selectRowsHook.isRowSelected(row)}
          onClick={onCheckboxClick}
        />
      </Cell>} */}
      {row.cells?.map(getBodyCell)}
    </RowComponent >

  }, [onRowClick])

  const bodyRows = context.bodyRows.map(getRow)

  return <Body>
    {bodyRows}
  </Body>
}

export default memo(DataTableBody);