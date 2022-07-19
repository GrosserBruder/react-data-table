import { useCallback, useEffect, useRef, useState } from "react"
import { isEmptyDeep, ResultCompare } from "../../utils"
import { FilterValue } from "../../Filter/Filter"
import { TableRowProps, BodyLineCell } from "../DataTable"

export type FilterProps = {
  initialFilteredRows?: Array<TableRowProps<BodyLineCell>>
}

export type FilterChecker = (cell: BodyLineCell, filterValue?: FilterValue) => boolean;
export type FilterCheckers = {
  [filterFieldKey: string]: FilterChecker
};

export type FilterComparer = (
  first: BodyLineCell,
  second: BodyLineCell,
  filterValue?: FilterValue
) => ResultCompare;
export type FilterComparers = {
  [filterFieldKey: string]: FilterComparer
};

export function useFilter(bodyLines: Array<TableRowProps<BodyLineCell>>, filterCheckers: FilterCheckers, filterComparers: FilterComparers, props?: FilterProps) {
  const [filteredRows, setFilteredRows] = useState<Array<TableRowProps<BodyLineCell>>>(props?.initialFilteredRows ?? [])
  const [filterState, setFilterState] = useState<Map<string, FilterValue>>(new Map<string, FilterValue>())


  const setFilter = useCallback((filterKey: string, value: FilterValue) => {
    setFilterState((x) => new Map<string, FilterValue>(x.set(filterKey, value)))
  }, [setFilterState])

  const compareRows = useCallback((
    first: TableRowProps<BodyLineCell>,
    second: TableRowProps<BodyLineCell>
  ) => {
    // отсеиваем ячейки, у которых нет filtertkey или не установлены фильтры
    const firstFilteredCells = first.cells
      .filter((cell) => Boolean(cell.filterKey))
      .filter((cell) => !isEmptyDeep(filterState.get(cell.filterKey!)))

    // цикл for сделан, потому что его можно прервать
    for (let i = 0; i < firstFilteredCells.length; i++) {
      const firstCell = firstFilteredCells[i]
      // ячейку со второй строки берем, потому что они изначаться не отфильтрованы
      const secondCell = second.cells.find((x) => x.id === firstCell.id)

      if (!secondCell) {
        continue;
      }

      const filterValue = filterState.get(firstCell.filterKey!)

      if (!filterValue) return 0;

      const filterValueKeys = Object.keys(filterValue)

      // собираем все значения из полученных filterComparers
      // ToDo: исправить на получение первого ненулевого результата
      const compareResults = filterValueKeys.map((filterValueKey) => {
        const comparer = filterComparers[filterValueKey]

        if (comparer) {
          return comparer(firstCell, secondCell, filterValue)
        }
      })

      // получаем первый ненулевой результат. проверка на тип значения нужна,
      // т.к. поле searh на данный момент проверяется тоже и в массив
      // сохраняется значение undefined
      const compareResult = compareResults.find((x) => typeof x === "number" && x !== 0)

      // если найдено ненулевой результат, то можно прекратить дальнейшее
      // сравнение ячеек строк
      if (compareResult) {
        return compareResult
      }
    }
    return 0;
  }, [filterState])

  const filterRows = useCallback((bodyLines: Array<TableRowProps<BodyLineCell>>) => {
    return bodyLines.filter((line) => {
      return line.cells
        .filter((cell) => Boolean(cell.filterKey))
        .filter((cell) => !isEmptyDeep(filterState.get(cell.filterKey!)))
        .every((cell) => {
          const filterValue = filterState.get(cell.filterKey!)
          if (!filterValue) return true;

          const filterValueKeys = Object.keys(filterValue)

          return filterValueKeys.every((filterValueKey) => {
            const checker = filterCheckers[filterValueKey]

            if (!checker) return true;

            return checker(cell, filterValue)
          })
        })
    })
  }, [filterState])

  const refilter = useCallback(() => {
    const result = filterRows(bodyLines)
      .sort(compareRows)

    setFilteredRows(result)
  }, [bodyLines, filterRows, filterState])

  useEffect(() => {
    refilter()
  }, [bodyLines, refilter, filterRows, filterState])

  // refactor

  const setSort = useCallback((filterKey: string, value: any) => {
    // setSortValues((x) => new Map<string, string>(x.set(filterKey, value)))
  }, [])

  const getSearchValueByFilterKey = (key: string) => ""
  const getSortValueByFilterKey = (key: string) => ""
  const [sortValues, setSortValues] = useState(new Map<string, string>())
  const [searchValues, setSearchValues] = useState(new Map<string, string>())

  return {
    filteredRows,
    setFilter,
    setSort,
    getSearchValueByFilterKey,
    getSortValueByFilterKey,
    sortValues,
    searchValues,
  }
}

export default useFilter