import { useCallback, useEffect, useState } from "react"
import { SELECT_ALL_STATUSES } from "../../const"

type RETURN = [status: SELECT_ALL_STATUSES, setSelectedAllStatus: (status: SELECT_ALL_STATUSES) => void]

export function useSelectAllStatus(allRowsLenght: number, selectedRowsLength: number): RETURN {
  const [status, setStatus] = useState<SELECT_ALL_STATUSES>(SELECT_ALL_STATUSES.NOT_SELECTED)

  // вызывает еще одну перерисовку при монтировании компонента
  useEffect(() => {
    switch (true) {
      case selectedRowsLength !== 0 && allRowsLenght === selectedRowsLength:
        setStatus(SELECT_ALL_STATUSES.SELECTED)
        return;
      case selectedRowsLength > 0 && selectedRowsLength < allRowsLenght:
        setStatus(SELECT_ALL_STATUSES.INDETERMINATE)
        return
      case selectedRowsLength === 0:
        setStatus(SELECT_ALL_STATUSES.NOT_SELECTED)
        return;
    }
  }, [allRowsLenght, selectedRowsLength])

  const setSelectedAllStatus = useCallback((status: SELECT_ALL_STATUSES) => {
    setStatus(status)
  }, [])

  return [status, setSelectedAllStatus]
}

export default useSelectAllStatus;