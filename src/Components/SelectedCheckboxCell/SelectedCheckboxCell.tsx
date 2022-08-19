import { Cell } from "@grossb/react-table"
import { Checkbox } from "../../BaseComponents"
import { DataRow } from "../../DataTable/types"
import { useCallback } from "react"
import { SELECT_ALL_STATUSES } from "../../const"

export type SelectedCheckboxProps = {
  selectStatus?: SELECT_ALL_STATUSES,
  onClick?: (currentStatus?: SELECT_ALL_STATUSES) => void
}

export default function SelectedAllCheckbox(props: SelectedCheckboxProps) {
  const { selectStatus, onClick } = props;

  const onCheckboxClick = useCallback(() => {
    onClick?.(selectStatus)
  }, [selectStatus, onClick])

  return <Cell className="cell__select-all">
    <Checkbox
      checked={selectStatus === SELECT_ALL_STATUSES.SELECTED}
      indeterminate={selectStatus === SELECT_ALL_STATUSES.INDETERMINATE}
      onClick={onCheckboxClick}
    />
  </Cell>
}