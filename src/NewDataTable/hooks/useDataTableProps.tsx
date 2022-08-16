import { useMemo } from "react";
import { NewDataTableProps } from "../NewDataTable";
import { ProcessedDataTableProps } from "../types";

export function useDataTableProps(props: NewDataTableProps): NewDataTableProps {

  const newProps = useMemo(() => ({
    filterable: true,
    sortable: true,
    selectable: true,
    ...props
  }), [props])

  return newProps
}