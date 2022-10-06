import { Row, Cell } from "@grossb/react-table";
import { ReactNode, useCallback } from "react";
import { SelectedCheckbox } from "./components/SelectedCheckbox";
import { SELECT_STATUSES } from "./constants/const";
import { Column, DataItem } from "./DataTable";
import useCell from "./hooks/useCell";

export type DataTableBodyRowProps<T extends DataItem> = {
  columns: Array<Column<T>>
  dataItem: T
  onClick?: (event: any, dataItem: T) => void,
  children?: ReactNode,
  selectable?: boolean,
  isSelected?: boolean,
  onSelectClick?: (event: any, currentStatus?: SELECT_STATUSES) => void
}

function DataTableBodyRow<T extends DataItem>(props: DataTableBodyRowProps<T>) {
  const { children, columns, dataItem, onClick, selectable, isSelected, onSelectClick, ...restProps } = props;

  const onClickHandler = useCallback((event: any) => {
    onClick?.(event, dataItem)
  }, [onClick, dataItem])

  const onSelectClickHandler = useCallback((event: any, currentStatus?: SELECT_STATUSES) => {
    event.stopPropagation()
    onSelectClick?.(dataItem, currentStatus)
  }, [dataItem, onSelectClick])

  const cellHook = useCell()

  return <Row key={dataItem.id} {...restProps} onClick={onClickHandler}>
    {
      selectable && <Cell className="cell__select">
        <SelectedCheckbox
          onClick={onSelectClickHandler}
          selectStatus={isSelected
            ? SELECT_STATUSES.SELECTED
            : SELECT_STATUSES.NOT_SELECTED
          }
        />
      </Cell>
    }
    {cellHook.createBodyCells(columns, dataItem)}
  </Row>
}

export default DataTableBodyRow;