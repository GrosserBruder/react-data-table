import Add from "@mui/icons-material/Add"
import Edit from "@mui/icons-material/Edit"
import Delete from "@mui/icons-material/Delete"
import ToolbarButton, { ToolbarButtonProps } from "./ToolbarButton"
import { TableRowProps, BodyLineCell } from "../../DataTable/DataTable"
import { primitiveOrFunction } from "../../utils"
import { FC, useCallback } from "react"
import { FilterValue } from "../../Filter/Filter"
import "../styles/CrudToolbar.scss"

export type ToolbarProps = {
  selectable?: boolean,
  filterable?: boolean,
  filteredRows: Array<TableRowProps<BodyLineCell>>
  filterState: Map<string, FilterValue>
  selectedRows: Array<TableRowProps<BodyLineCell>>
  additionalToolbar?: FC<AdditionalToolbarProps>
}

export type AdditionalToolbarProps = Omit<ToolbarProps, "additionalToolbar">

export type CrudToolbarButtonProps = Omit<ToolbarButtonProps, "onClick"> & {
  onClick?: (event: any, toolbarProps: ToolbarProps) => void
}

export type CrudToolbarProps = ToolbarProps & {
  createButton?: CrudToolbarButtonProps
  updateButton?: CrudToolbarButtonProps
  deleteButton?: CrudToolbarButtonProps
  showCreate?: ((props: ToolbarProps) => boolean) | boolean
  showUpdate?: ((props: ToolbarProps) => boolean) | boolean
  showDelete?: ((props: ToolbarProps) => boolean) | boolean
}

export function CrudToolbar(props: CrudToolbarProps) {
  const {
    filteredRows, selectable, filterable, filterState, selectedRows,
    showCreate, showDelete, showUpdate, createButton, deleteButton, updateButton,
    additionalToolbar: AdditionalToolbar
  } = props;

  const toolbarProps: ToolbarProps = {
    selectable,
    filterable,
    filterState,
    filteredRows,
    selectedRows
  }

  const onCreateClick = useCallback((event: any) => {
    createButton?.onClick?.(event, toolbarProps)
  }, [])

  const onUpdateClick = useCallback((event: any) => {
    updateButton?.onClick?.(event, toolbarProps)
  }, [])

  const onDeleteClick = useCallback((event: any) => {
    deleteButton?.onClick?.(event, toolbarProps)
  }, [])

  return <div className="toolbar">
    <ToolbarButton
      icon={<Add />}
      show={primitiveOrFunction(showCreate, toolbarProps) ?? true}
      label="Создать"
      {...createButton}
      onClick={onCreateClick}
    />

    <ToolbarButton
      icon={<Edit />}
      show={primitiveOrFunction(showUpdate, toolbarProps) ?? selectedRows.length === 1}
      label="Редактировать"
      {...updateButton}
      onClick={onUpdateClick}
    />

    {AdditionalToolbar && <AdditionalToolbar
      {...toolbarProps}
    />}

    <ToolbarButton
      icon={<Delete />}
      show={primitiveOrFunction(showDelete, toolbarProps) ?? selectedRows.length > 0}
      label="Удалить"
      color="error"
      {...deleteButton}
      onClick={onDeleteClick}
    />
  </div>
}

export default CrudToolbar