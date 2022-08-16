import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { SORT_STRATEGY } from "../../NewDataTable/Context/DataTableContext/useSort"

export type SortStrategyIconProps = {
  sortStrategy?: SORT_STRATEGY
}

export default function SortStrategyIcon(props: SortStrategyIconProps) {
  const { sortStrategy } = props;
  switch (true) {
    case sortStrategy === SORT_STRATEGY.ASC:
      return <ArrowUpward titleAccess="Сортировка по возрастанию" />
    case sortStrategy === SORT_STRATEGY.DESC:
      return <ArrowDownward titleAccess="Сортировка по убыванию" />
    default:
      return <></>
  }
}