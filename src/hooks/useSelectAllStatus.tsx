import { useCallback, useEffect, useMemo, useState } from "react"

export enum SELECT_ALL_STATUSES {
  NOT_SELECTED,
  INDETERMINATE,
  SELECTED
}

type RETURN = [status: SELECT_ALL_STATUSES, setSelectedAllStatus: (status: SELECT_ALL_STATUSES) => void]

export function useSelectAllStatus(allRowsLenght: number, selectedRowsLength: number): RETURN {
  const [status, setStatus] = useState<SELECT_ALL_STATUSES>(SELECT_ALL_STATUSES.NOT_SELECTED)

  useEffect(() => {
    switch (true) {
      case allRowsLenght === selectedRowsLength:
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

  useEffect(() => {
    console.log(status)
  }, [status])

  return [status, setSelectedAllStatus]
}

export default useSelectAllStatus;