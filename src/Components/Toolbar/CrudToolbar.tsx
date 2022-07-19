import Add from "@mui/icons-material/Add"
import Edit from "@mui/icons-material/Edit"
import Delete from "@mui/icons-material/Delete"
import "../styles/CrudToolbar.scss"
import ToolbarButton, { ToolbarButtonProps } from "./ToolbarButton"
import { TableRowProps, BodyLineCell } from "../../DataTable/DataTable"
import { primitiveOrFunction } from "../../utils"
import { FC } from "react"

export type ToolbarProps = {
  selectable?: boolean,
  filterable?: boolean,
  sortValues: Map<string, string>,
  filteredRows: Array<TableRowProps<BodyLineCell>>
  searchValues: Map<string, string>
  selectedRows: Array<TableRowProps<BodyLineCell>>
  additionalToolbar?: FC<ToolbarProps>
}

export type CrudToolbarProps = ToolbarProps & {
  createButton?: ToolbarButtonProps
  updateButton?: ToolbarButtonProps
  deleteButton?: ToolbarButtonProps
  showCreate?: ((props: ToolbarProps) => boolean) | boolean
  showUpdate?: ((props: ToolbarProps) => boolean) | boolean
  showDelete?: ((props: ToolbarProps) => boolean) | boolean
}

export function CrudToolbar(props: CrudToolbarProps) {
  const {
    filteredRows, selectable, filterable, sortValues, selectedRows, searchValues,
    showCreate, showDelete, showUpdate, createButton, deleteButton, updateButton,
    additionalToolbar: AdditionalToolbar
  } = props;

  const toolbarProps: ToolbarProps = {
    selectable,
    filterable,
    sortValues,
    filteredRows,
    searchValues,
    selectedRows
  }

  return <div className="toolbar">
    <ToolbarButton
      icon={<Add />}
      show={primitiveOrFunction(showCreate, toolbarProps) ?? true}
      label="Создать"
      {...createButton}
    />
    <ToolbarButton
      icon={<Edit />}
      show={primitiveOrFunction(showUpdate, toolbarProps) ?? selectedRows.length === 1}
      label="Редактировать"
      {...updateButton}
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
    />
  </div>
}

export default CrudToolbar