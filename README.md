## Описание типов

## DataItem

`DataItem` - базовый тип объекта данных из массива `data`. Тип данных, который будет передаваться в массиве `data`, должен быть расширен от данного типа.

  `id: number | string`  - Уникальные идентификатор объекта. Он используется как ключ для строк в таблице.
  `[key: string]: any` - дополнительные поля объекта.

## Column

`Column` - тип, которые описывается все ячейки одного столбца.

  `id?: ColumnId` - Унивальный идентификатор столбца. Необязательное поле. (string | number)
  `dataField?: string` - Поле объекта из которого будут браться данные для вывода в ячейку. Необязательный параметр.
  `valueGetter?: (value: T) => ReactNode` - Функция для преобазования данных с поля объекта для вывода в ячейку. Необязательный параметр.
  `header?: ReactNode` - Загловок столбца, которые будет выводится в `Head` таблицы.Необязательный параметр.
  `headCellProps?: CellProps` - Параметры ячейки в заголовке таблицы. Можно задать стили или класс и т.д. Необязательный параметр.
  `bodyCellProps?: ((dataItem: T) => CellProps) | CellProps` - Параметры ячейки в тебе таблицы. Можно задать стили или класс и т.д. Принимается как функция, так и объект. Необязательный параметр.
  `sortComparator?: SortComparator<T>` - Функция для сортировки данных в столбце. Чтобы сортировка работала, нужно для таблицы указать параметр `sortable` и указать данную функцию. Необязательный параметр.
  `filterComparator?: FilterComparator<T>` - Функция фля фильтрации данных в таблице по столбцу. Функция получается как данные фильтра для конкретного столбца, так и фильтры для всех столбцов. Названия полей задаются пользователем в компоненте фильтра. Чтобы фильтрация работалаЮ нужно для таблицы указать параметр `filterable` и указать данную функцию. Необязательный параметр.
  `filterComponent?: ColumnFilterComponent<T>` - Компонент фильтра для столбца. Можно указать `false`, чтобы не отображать компонент фильтра для столбца, даже есть будет указан общий компонент фильтра в таблице. Необязательный параметр.

  ## DataTableProps
    data: Array<T>,
  columns: Array<Column<T>>,
  onRowClick?: (event: any, dataItem: T) => void,
  selectable?: boolean,
  onSelectChange?: (selectedItems: Array<T>) => void
  onSortChange?: (sortingColumnOrder?: SortingColumnOrder<T>) => void
  sortable?: boolean,
  filterable?: boolean,
  defaultSortingColumnOrder?: SortingColumnOrder<T>,
  commonFilterComponent?: FilterComponent<T>,
  onFilterChange?: (allFilterData?: AllFilterData) => void,
  sortingMode?: SORTING_MODE
  filterMode?: FILTERING_MODE
  rowProps?: ((dataItem: T) => RowProps) | RowProps


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

### <a name="BasicDataTypes">Основные типы данных</a>

**DataTableColumn**
|    Название   |      Тип      |            Описание            | Значение по умолчанию |
| ------------- | ------------- | ------------------------------ | --------------------- |
| `id`     |    string     |   Уникальный идентификатор столбца    |         |
| `dataField`  |    string     |   Название поля из объекта массива `data`  |       |
| `header`     |   ReactNode   |   Заголовок столбца             |             |
| `valueGetter` |  `(dataRow: DataRow) => ReactNode | JSX.Element`  |    Функция, которая переопределяет значение, которое будет выведено в таблицу. Принимает объект из массива `data`       |                      |
| `rowComparer` | `(first: DataRow, second: DataRow) => -1 | 0 | 1` |   Функция вызывается во время сравнение строк таблицы при установке сортировки. Сравнение в данной функции всегда должно быть **по возрастанию**. А выбранный вариант сортировки будет применен после вызова данной функции. Если функция не будет передана, то сортировка для столбца будет недоступна даже с включенной сортировкой     |                      |
| `rowFilter`  |  `(dataRow: DataRow, filter?: ColumnFilter) => boolean`  |  Функция вызывается при фильтровании строк таблицы. В функции нужно определить, удовлетворяетли строка параметрам фильтрации. Если строка удовлетворяет условиям, то нужно вернуть `true`, иначе `false`. Функция принимает объект из `data` и установленные фильтры для столбца  |                      |
| `filterComponent`   |  ReactNode  | Комонент фильтров, который будет отобажаться при нажатии на **иконку с тремя точками** в заголовке столбца. Если компонент не будет объявлен, то фильтрация для столбца работать не будет. Компонент должен использовать хук `useFilterContainerContext`, чтобы получить данные о столбце, установленные для него фильтры и функции установки фильтров и их сброса |                      |
| `filterable`  |   boolean    |   Включает фильтрацию для столбца. Перекрывает  `filterable` из `DataTable`   |                      |
| `sortable`  |  boolean     |   Включает сортировку для столбца. Перекрывает  `sortable` из `DataTable`   |                      |
| `headCellProps` |  `(column: DataTableColumn) => HeadCellProps` или  `HeadCellProps` |  Объект или функция возвращающая объект, который передает параметры для ячейки из заголовка                                |                      |
| `bodyCellProps` |  `(column: DataTableColumn) => CellProps` или `CellProps` |  Объект или функция возвращающая объект, который передает параметры для ячейки из тела таблицы  |                      |

### <a name="#CSS_переменные">CSS переменные</a>

Описание CSS переменных находится [тут](https://github.com/GrosserBruder/react-table#CSS_переменные)

### <a name="#Пример_использования">Пример использования</a>

```js

  const columns = [
    {
      dataField: "createdDate",
      header: 'Дата создания',
      valueGetter: (row: any) => new Date(row.createdDate).toLocaleString("ru-RU")
    },
    {
      dataField: "name",
      header: 'Название',
      rowComparer: (first: any, second: any) => {
        if (first.name.toLocaleLowerCase() < second.name.toLocaleLowerCase()) return -1;
        if (first.name.toLocaleLowerCase() > second.name.toLocaleLowerCase()) return 1;
        return 0;
      },
    },
    {
      dataField: "address",
      header: 'Название',
    },
    {
      dataField: "login",
      header: 'Логин',
    },
    {
      dataField: "password",
      header: 'Пароль',
      valueGetter: (row: any) => "********",
    },
    {
      dataField: "editCount",
      header: 'Количество редактирований',
      rowComparer: (first: any, second: any) => {
        const res = first.editCount - second.editCount
        if (res === 0) return 0
        return res > 0 ? 1 : -1;
      }
    },
    {
      dataField: "description",
      header: 'Описание',
    },
    {
      dataField: "isDeleted",
      header: 'Удален',
      valueGetter: (row: any) => row.isDeleted ? "Да" : "Нет"
    },
  ]

  const data = [
    {
      id: 0,
      createdDate: "2022-10-11T09:48:49.601Z",
      name: "название",
      address: "google.com",
      login: "логин",
      password: "test",
      editCount: 23,
      description: "description",
      isDeleted: true
    },
    {
      id: 1,
      createdDate: "2022-11-04T12:32:49.601Z",
      name: "gitlab",
      address: "address.ru",
      login: "q1w2e3r4",
      password: "password",
      editCount: 32,
      description: "не забыть поменять пароль",
      isDeleted: true
    }
  ]

  ////////

  <DataTableProvider columns={columns} data={data}>
    <DataTable
      tableProps={{
        striped: true,
        fixedTopTitle: true,
      }}
      disableSelectOnClick
      selectable
      sortable
    />
  </DataTableProvider>
```
