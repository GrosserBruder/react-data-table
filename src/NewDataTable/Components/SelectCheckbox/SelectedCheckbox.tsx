import { Cell } from "@grossb/react-table"
import useSelectedRowsContext from "../../Context/SelectableContext/useSelectedRowsContext"
import { Checkbox } from "../../../Components"
import { DataRow } from "../../../NewDataTable/types"
import { useCallback, useMemo } from "react"

export type SelectedCheckboxProps = {
  row: DataRow
}

export default function SelectedCheckbox(props: SelectedCheckboxProps) {
  const { row } = props;

  const selectedRowsContext = useSelectedRowsContext()

  const isSelected = useMemo(() => {
    return selectedRowsContext.selectedRows.find((x) => x.id === row.id) !== undefined
  }, [selectedRowsContext.selectedRows, row])

  const onCheckboxClick = useCallback(() => {
    if (isSelected) {
      selectedRowsContext.removeSelectedRows(row)
    } else {
      selectedRowsContext.addSelectedRows(row)
    }
  }, [selectedRowsContext.addSelectedRows, selectedRowsContext.removeSelectedRows, row])

  return <Cell className="cell__select-all" width={50}>
    <Checkbox
      checked={isSelected}
      onClick={onCheckboxClick}
    />
  </Cell>
}