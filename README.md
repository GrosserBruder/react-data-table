# react-data-table

## Оглавление

[DataTableProvider](#DataTableProvider)

[DataTable](#DataTable)

[Body](#Body)

[Head](#Head)

[Row](#Row)

[Cell](#Cell)

[CSS переменные](#CSS_переменные)

[Пример использования](#Пример_использования)

|               |               |                                 |                      |

### <a name="DataTableProvider">DataTableProvider</a>

|    Название   |      Тип      |            Описание            | Значение по умолчанию |
| ------------- | ------------- | ------------------------------ | --------------------- |
|    `data`     | Array<DataRow> | Массив объектов. В каждом объекте обязательное поле `id` |  |
|   `columns`    |  Array<DataTableColumn> |   Массив объектов, в которых описываются ячейки столбца, их свойства и т.д.   |                      |
| `defaultSelectedRows`  | Array<DataRow>  | Начальное значение выбранных строк | [] |
| `sortingMode` | SORTING_MODE  |   Указывает режим работы сортировки. <br/> Доступные значения:  <br/>   `SORTING_MODE.OFF` - сортировка отключена <br/>  `SORTING_MODE.SINGLE` - сортировка работает только по последнему выбранному стобцу <br/> `SORTING_MODE.MULTIPLE` - сортировка работает по всем выбранным столбцам. Сортировка применяется к стобцам в порядке объявления их в `columns`  | SORTING_MODE.MULTIPLE |

### <a name="DataTable">DataTable</a>

|    Название   |      Тип      |            Описание            | Значение по умолчанию |
| ------------- | ------------- | ------------------------------ | --------------------- |
| `tableProps`  |  TableProps  | Параметры таблицы. Импортирована из библиотеки `@grossb/react-table` |        |
| `filterable`  |  boolean |   Включает логику фильтрации в таблице |                      |
| `sortable`    | boolean  | Включает сортировку столбцов | [] |
| `selectable`  | boolean  |   Включает множественный выбор строк. Слева появляется стобец с чекбоксами.  |       |
| `getBodyCellProps` |  `(dataRow: DataRow, column: DataTableColumn) => CellPropsCommunity`  |    Функция, которая принимает объект из массива `data` и объект из `columns`  ассоциированные с ячейкой, возвращающая объект с параметрами для ячейки из тела таблицы. Функция вызывается во время отрисовки ячейки.    |                      |
| `getRowProps` |  `(dataRow: DataRow) => RowPropsCommunity`   |   Функция, которая принимает объект из массива `data`,  возвращающая объект с параметрами для строки из тела таблицы.  Функция вызывается во время отрисовки строки |                      |
| `bodyProps`   |  BodyPropsCommunity | Объект с параметрами для тела таблицы  |                      |
|  `headProps`  |   HeadPropsCommunity   |   Объект с параметрами для заголовка таблицы   |                      |
| `getHeadCellProps` |  `(column: DataTableColumn) => HeadCellPropsCommunity` |  Функция, которая принимает объект из `columns` ассоциированный с ячейкой, возвращающая обхект с параметрами для ячейки. Функция вызывается во время отрисовки ячейки. |                      |
| `disableSelectOnClick` | boolean   |  Флаг, который отключает установку чекбокса при `selectable = true`  |       |
|  `onRowClick` |  `(event: any, dataRow: DataRow) => void`  | Функция, которая вызывается при нажатии на строку из тела таблицы. Принимает событие и объект из `data` |  undefined |
|  `disableFiltersAndSortingOnClientSide`  |    boolean    |  Флаг оключает обработку сортировки и фильтрации столбцов. Необходима, например, для серверной обработки данных событий  |                      |
| `onFilterChange` |  `(filters: Map<string, ColumnFilter>) => void` |  Функция вызывается при изменении фильтров для столбцов. Также вызывается при `disableFiltersAndSortingOnClientSide = true` |                      |
| `onSortChange` |  `(sortFields: Map<string, SORT_STRATEGY>) => void`  |  Функция вызывается при изменении сортировки для столбцов. Также вызывается при `disableFiltersAndSortingOnClientSide = true`  |                      |
| `onSelectedRowsChange` |  `(selectedRows: Array<DataRow>) => void`  |  Функция вызывается при изменении выбранных строк |                      |

TableProps
DataTableColumn
