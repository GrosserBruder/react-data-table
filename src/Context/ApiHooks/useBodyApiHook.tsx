import { MutableRefObject } from "react";
import { DataTableApi, DataTableBodyRow, ProcessedDataTableProps } from "../../NewDataTable/types";

export function useBodyApiHook(apiRef: MutableRefObject<DataTableApi>, props: ProcessedDataTableProps) {
  // Todo: удалить
  const selectContext = {
    isRowSelected: ((row: DataTableBodyRow) => true),
    removeFromSelectedRows: (row: DataTableBodyRow) => void 0,
    addToSelectedRows: (row: DataTableBodyRow) => void 0,
    onSelect: (row: DataTableBodyRow) => void 0,
  }


  const onBodyCheckboxClick = (row: DataTableBodyRow) => {
    const isSelected = selectContext.isRowSelected(row);

    if (isSelected) {
      selectContext.removeFromSelectedRows(row)
    } else {
      selectContext.addToSelectedRows(row)
    }

    apiRef.current.onSelect?.(row, isSelected)
  }

  const onRowClick = (event: any, row: DataTableBodyRow) => {
    props.onRowClick?.(event, row)
    props?.selectable && !props.disableSetCheckboxAfterRowClick && onBodyCheckboxClick(row)
  }

  const onCheckboxClick = (event: any, row: DataTableBodyRow) => {
    event.stopPropagation();
    onBodyCheckboxClick(row)
  }

  return {
    onBodyCheckboxClick,
    onRowClick,
    onCheckboxClick,
  }
}