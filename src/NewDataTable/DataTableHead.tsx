import { Body, Cell, Head, Row } from "@grossb/react-table"
import { memo, useCallback, useMemo } from "react";
import { HeadCell } from "../Components/HeadCell";
import { DataTableHeadCell, DataTableHeadRow } from "./types";

export type DataTableHeadProps = {
  rows?: Array<DataTableHeadRow>
}

function DataTableHead(props: DataTableHeadProps) {
  const { rows } = props

  const getCell = useCallback((headLineCell: DataTableHeadCell, index: number) => {
    return <HeadCell
      key={headLineCell.id}
      // isFiltersInstalled={headLineCell.filterKey ? filterHook.isInstalledFilters(headLineCell.filterKey) : false}
      // filterable={filterable}
      // filterContainer={filterContainer}
      // filter={<Filter
      //   columnValue={headLineCell.columnValue}
      //   onFilterChange={(value) => onSetFilterHandler(headLineCell, value)}
      //   initialFilters={headLineCell.filterKey ? filterHook.getFilterStateByFilterKey(headLineCell.filterKey) : undefined}
      //   {...filterComponentProps}
      // />}

      {...headLineCell.config}

    >
      {headLineCell.render ? headLineCell.render?.(headLineCell) : headLineCell.value}
    </HeadCell >
  }, [])

  const headRows = useMemo(() => rows?.map((row) => {
    const RowComponent = row.render || Row

    return <RowComponent key={row.id} {...row.config}>
      {/* {selectable && (
        <Cell className="cell__select-all" rowSpan={headLines.length} width={50}>
          <Checkbox
            checked={selectAllStatus === SELECT_ALL_STATUSES.SELECTED}
            indeterminate={selectAllStatus === SELECT_ALL_STATUSES.INDETERMINATE}
            onClick={onHeadCheckboxClick}
          />
        </Cell>
      )} */}
      {row.cells?.map(getCell)}
    </RowComponent>
  }), [rows, getCell])

  return <Head>
    {headRows}
  </Head>
}

export default memo(DataTableHead);