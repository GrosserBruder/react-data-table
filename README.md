## Описание типов

## Перечисления (enum)

|   `SELECT_STATUSES`  - Статус выбора   |
| ----------------------------------- |
| Название |        Описание          |
| -------- | ------------------------ |
| `NOT_SELECTED` | Не выбран |
| `INDETERMINATE` | Неопреден. Используется для чекбокса - `Выбрать все` в заголовке таблицы. Используется, если выбраны некоторые значения из списка, но не все|
| `SELECTED` | Выбран |

|  `SORTING_ORDER` - Порядок сортировки   |
| ----------------------------------- |
| Название |        Описание          |
| -------- | ------------------------ |
|   `ASC`  |     По возрастанию       |
|   `DESC` |     По убыванию          |

|  `SORTING_MODE` - Режим работы сортировки   |
| ----------------------------------- |
| Название |        Описание          |
| -------- | ------------------------ |
| `SERVER = "server"` | Режим сервера |
| `CLIENT = "client"` |  Режим клиента |

|  `FILTERING_MODE` - Режим работы фильтрации   |
| ----------------------------------- |
| Название |        Описание          |
| -------- | ------------------------ |
| `SERVER = "server"` | Режим сервера |
| `CLIENT = "client"` |  Режим клиента |

## DataItem

`DataItem` - базовый тип объекта данных из массива `data`. Тип данных, который будет передаваться в массиве `data`, должен быть расширен от данного типа.

|    Название   |               Описание            |
| ------------- |  -------------------------------- |
 | `id: number | string`  | Уникальные идентификатор объекта. Он используется как ключ для строк в таблице. |
 | `[key: string]: any` | дополнительные поля объекта. |

## FilterComponentProps

 `FilterComponentProps` - параметры, которые передаются в компоненты фильтрации

|    Название   |               Описание            |
| ------------- |  -------------------------------- |
| `column: Column<T>`  | объект типа `Column` из массива `columns` |
| `allFilterData?: AllFilterData` | Фильтры для всех столбцов |
| `columnFilterData?: FilterData` | Фильтры для столбца `column` |
| `onSubmit: (data: any) => void` | Функция, которая принимает объект с полями фильтра. Данный объект будет передаваться в `filterComparator` из `column` |
| `onReset: () => void` | Функция сброса значений фильтров для столбца |

## Column

`Column` - тип, которые описывается все ячейки одного столбца.

|    Название   |               Описание            |
| ------------- |  -------------------------------- |
|  `id?: ColumnId` | Унивальный идентификатор столбца. Необязательное поле. (string | number ) |
  
 | `dataField?: string` | Поле объекта из которого будут браться данные для вывода в ячейку. Необязательный параметр. |
  
 | `valueGetter?: (value: T) => ReactNode` | Функция для преобазования данных с поля объекта для вывода в ячейку. Необязательный параметр. |
  
  |`header?: ReactNode` | Загловок столбца, которые будет выводится в `Head` таблицы.Необязательный параметр. |
  
 | `headCellProps?: CellProps` | Параметры ячейки в заголовке таблицы. Можно задать стили или класс и т.д. Необязательный параметр. |
  
 | `bodyCellProps?: ((dataItem: T) => CellProps) | CellProps` | Параметры ячейки в тебе таблицы. Можно задать стили или класс и т.д. Принимается как функция, так и объект. Необязательный параметр.|
  
  |`sortComparator?: SortComparator<T>` | Функция для сортировки данных в столбце. Чтобы сортировка работала, нужно для таблицы указать параметр `sortable` и указать данную функцию. Необязательный параметр.|
  
  |`filterComparator?: FilterComparator<T>` | Функция фля фильтрации данных в таблице по столбцу. Функция получается как данные фильтра для конкретного столбца, так и фильтры для всех столбцов. Названия полей задаются пользователем в компоненте фильтра. Чтобы фильтрация работалаЮ нужно для таблицы указать параметр `filterable` и указать данную функцию. Необязательный параметр. |
  
  |`filterComponent?: ColumnFilterComponent<T>` | Компонент фильтра для столбца. Можно указать `false`, чтобы не отображать компонент фильтра для столбца, даже есть будет указан общий компонент фильтра в таблице. Необязательный параметр. |

## ColumnId

`ColumnId` - это вычисляемое значение на основе объекта типа `Column`.

Принцип работы следующий:

 1. Если в объекте типа `Column` объявлено поле `id`, то `ColumnId` будет равно значению `id`
 2. Если в объекте типа `Column` не объявлено поле `id`, но объявлено поле `dataField`, то `ColumnId` будет равно значению `dataField`
 3. Если в объекте типа `Column` не объявлены поля `id` и `dataField`, то `ColumnId` будет равно значению `undefined`

## SortingColumnOrder

 `SortingColumnOrder` - описывает сортировку для столбца и порядок сортировки

|    Название   |               Описание            |
| ------------- |  -------------------------------- |
|  `column: Column<T>` | объект типа `Column` |
|  `sortingOrder: SORTING_ORDER` | значение из enum  `SORTING_ORDER` |

## DataTableProps

|    Название   |               Описание            |
| ------------- |  -------------------------------- |
|    `data: Array<T>` | Массив данных для таблицы. Каждый объект должен наследовать тип от `DataItem`, чтобы компонент работал корректно |
|  `columns: Array<Column<T>>` | Массив объектов столбцов, которые описывают отдельно взятый столбец |
|  `onRowClick?: (event: any, dataItem: T) => void` |  Событие нажатия на строку в теле таблицы |
|  `selectable?: boolean` | Включает возможность выбора строк в таблице при помощи чекбоксов. |
|  `onSelectChange?: (selectedItems: Array<T>) => void` | Событие, которые вызывается при изменении выбора строк. Передает массив объектов из `data`, у которых стоит чекбокс |
|  `onSortChange?: (sortingColumnOrder?: SortingColumnOrder<T>) => void` | Событие изменения сортировки. В объекте `sortingColumnOrder` содежиться объект столбца из `columns` и порядок сортировки из enum `SORTING_ORDER`|
|  `sortable?: boolean` | Включает возможность сортировки строк в таблицею Для работы сортировки необходимо передать данный параметр и реализовать `sortComparator` в объекте столбца из массива `columns` |
|  `filterable?: boolean` | Включает возможность фильтрации данных. Для работы фильтрации необходимо передать данный параметр, реализовать `filterComparator` в объекте столбца из массива `columns` и реализовать компонент фильтра, которые будет отображаться в заголовке таблицы. Компонент фильтра можно реализовать двумя способами: передать в объекте столбца из массива `columns` или передать общий компонент фильтра для всех столбцов через параметр `commonFilterComponent` |
|  `defaultSortingColumnOrder?: SortingColumnOrder<T>` | Сортировка по умолчанию. В объекте необходимо указать `column` и `sortingOrder`, где `column` - это объект из `columns`, а `sortingOrder` - значение из enum `SORTING_ORDER`  |
|  `commonFilterComponent?: FilterComponent<T>` | Общий компонент фильтра для всех столбцов. Чтобы его переопределить или отключить для конкретного столбца, нужно в объекте  из `columns` в поле `filterComponent` или передать нужный фильтр или передать `false`, чтобы отключить его. |
|  `onFilterChange?: (allFilterData?: AllFilterData) => void` | Событие изменения фильтров для столбцов. Передаются все значения фильтров. Ключом является `ColumnId` на основе объекта их `columns`, а значением - объект с полями из фильтра. |
|  `sortingMode?: SORTING_MODE` | Режим работы сортировки: `server` или `client`. В режиме `client` при изменении сортировки происходит сортировка данных на основе `sortComparator` из объекта типа `Column` и вызывается событие `onSortChange`. В режиме `server` только вызывается событие `onSortChange`.  По умолчанию режим `client`|
|  `filterMode?: FILTERING_MODE` | Режим работы фильтрации: `server` или `client`. Принцип работы такой же, как и в `sortingMode`. Но используются функции `filterComparator` и `onFilterChange` соответственно. По умолчанию режим `client` |
|  `rowProps?: ((dataItem: T) => RowProps) | RowProps` |  Функция или объект для передачи параметров для строк. Например, если нужно в процессе  работы передать стиль для одной строки. |

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
