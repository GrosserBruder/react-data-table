import { Cell } from "@grossb/react-table"
import useSelectedRowsContext from "../../Context/SelectableContext/useSelectedRowsContext"
import { Checkbox } from "../../../Components"
import { DataRow } from "../../types"
import { useCallback, useMemo } from "react"
import { SELECT_ALL_STATUSES } from "../../../const"

export type SelectedCheckboxProps = {
  data?: Array<DataRow>
}

export default function SelectedAllCheckbox(props: SelectedCheckboxProps) {
  const { data = [] } = props;

  const selectedRowsContext = useSelectedRowsContext()

  const onCheckboxClick = useCallback(() => {
    if (selectedRowsContext.selectAllStatus === SELECT_ALL_STATUSES.NOT_SELECTED) {
      selectedRowsContext.addSelectedRows(data)
    } else {
      selectedRowsContext.resetSelectedBox()
    }
  }, [selectedRowsContext.addSelectedRows, selectedRowsContext.resetSelectedBox, data])

  return <Cell className="cell__select-all" width={50}>
    <Checkbox
      checked={selectedRowsContext.selectAllStatus === SELECT_ALL_STATUSES.SELECTED}
      indeterminate={selectedRowsContext.selectAllStatus === SELECT_ALL_STATUSES.INDETERMINATE}
      onClick={onCheckboxClick}
    />
  </Cell>
}