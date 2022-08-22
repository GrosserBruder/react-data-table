# react-data-table

## Оглавление

[DataTableProvider](#DataTableProvider)

[DataTable](#DataTable)

[Основные типы данных](#BasicDataTypes)

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
