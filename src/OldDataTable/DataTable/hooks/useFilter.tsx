import { useCallback, useEffect, useState } from "react"
import { isEmptyDeep } from "../../utils"
import { FilterValue } from "../../Filter"
import { TableRowProps, BodyLineCell } from "../types"
import { FilterCheckers, FilterComparers, FilterProps } from "./types"



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
  }, [filterState, filterComparers])

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
  }, [filterState, filterCheckers])

  const refilter = useCallback(() => {
    const result = filterRows(bodyLines)
      .sort(compareRows)

    setFilteredRows(result)
  }, [bodyLines, filterRows, filterState])

  const getFilterStateByFilterKey = useCallback((filterKey: string) => {
    return filterState.get(filterKey)
  }, [filterState])

  const isInstalledFilters = useCallback((filterKey: string) => {
    const state = filterState.get(filterKey) ?? {}

    const isInstalled = Object.keys(state).some((key) => {
      if (Boolean(state[key])) {
        return true
      }
    })

    return isInstalled;
  }, [filterState])

  useEffect(() => {
    refilter()
  }, [bodyLines, refilter, filterRows, filterState])

  return {
    filteredRows,
    setFilter,
    filterState,
    refilter,
    getFilterStateByFilterKey,
    isInstalledFilters,
  }
}

export default useFilter