import { Checkbox } from "../Checkbox"
import { useCallback } from "react"
import { SELECT_STATUSES } from "../../constants/const"

export type SelectedCheckboxProps = {
  className?: string
  selectStatus?: SELECT_STATUSES,
  onClick?: (event: any, currentStatus?: SELECT_STATUSES) => void
}

export default function SelectedCheckbox(props: SelectedCheckboxProps) {
  const { selectStatus, onClick } = props;

  const onCheckboxClick = useCallback((event: any) => {
    onClick?.(event, selectStatus)
  }, [selectStatus, onClick])

  return <Checkbox
    checked={selectStatus === SELECT_STATUSES.SELECTED}
    indeterminate={selectStatus === SELECT_STATUSES.INDETERMINATE}
    onClick={onCheckboxClick}
  />
}