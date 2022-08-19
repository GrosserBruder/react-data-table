import { useMemo } from "react";
import { DataTableProps } from "../DataTable";

export function useDataTableProps(props: DataTableProps): DataTableProps {

  const newProps = useMemo(() => ({
    filterable: true,
    sortable: true,
    selectable: true,
    ...props
  }), [props])

  return newProps
}