import { Cell } from "@grossb/react-table"
import { Checkbox } from "../../BaseComponents"
import { DataRow } from "../../DataTable/types"
import { useCallback } from "react"
import { SELECT_STATUSES } from "../../const"

export type SelectedCheckboxProps = {
  selectStatus?: SELECT_STATUSES,
  onClick?: (event: any, currentStatus?: SELECT_STATUSES) => void
}

export default function SelectedAllCheckbox(props: SelectedCheckboxProps) {
  const { selectStatus, onClick } = props;

  const onCheckboxClick = useCallback((event: any) => {
    onClick?.(event, selectStatus)
  }, [selectStatus, onClick])

  return <Cell className="cell__select-all">
    <Checkbox
      checked={selectStatus === SELECT_STATUSES.SELECTED}
      indeterminate={selectStatus === SELECT_STATUSES.INDETERMINATE}
      onClick={onCheckboxClick}
    />
  </Cell>
}