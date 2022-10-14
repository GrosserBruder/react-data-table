#

Библиотека сделана на основе библиотеки [@grossb/react-table](https://www.npmjs.com/package/@grossb/react-table)

## Описание типов

## Перечисления (enum)

**SELECT_STATUSES  -  Статус выбора**

| Название |        Описание          |
| :--------: | :------------------------: |
| `NOT_SELECTED` | Не выбран |
| `INDETERMINATE` | Неопреден. Используется для чекбокса - `Выбрать все` в заголовке таблицы. Используется, если выбраны некоторые значения из списка, но не все|
| `SELECTED` | Выбран |

**SORTING_ORDER - Порядок сортировки**

| Название |        Описание          |
| -------- | ------------------------ |
|   `ASC`  |     По возрастанию       |
|   `DESC` |     По убыванию          |

**SORTING_MODE - Режим работы сортировки**

| Название |        Описание          |
| -------- | ------------------------ |
| `SERVER = "server"` | Режим сервера |
| `CLIENT = "client"` |  Режим клиента |

**FILTERING_MODE - Режим работы фильтрации**

| Название |        Описание          |
| -------- | ------------------------ |
| `SERVER = "server"` | Режим сервера |
| `CLIENT = "client"` |  Режим клиента |

## DataItem

`DataItem` - базовый тип объекта данных из массива `data`. Тип данных, который будет передаваться в массиве `data`, должен быть расширен от данного типа.

|    Название   |               Описание            |
| ------------- |  -------------------------------- |
 | `id: number \| string`  | Уникальные идентификатор объекта. Он используется как ключ для строк в таблице. |
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
|  `fixedTopTitle` |  Зафиксировать заголовок при скролле таблицы. (position: sticky) |
|  `fixedLeftColumn` |  Зафиксировать левый столбец про горизонтальном скролле. (position: sticky) |
|  `striped` | Строки таблицы будут полосатыми. Одни темнее, другие светлее через одну. |

### CSS переменные

Описание CSS переменных находится [тут](https://github.com/GrosserBruder/react-table#CSS_переменные)

### <a name="#Пример_использования">Пример использования</a>

```js
function alphabeticalSortComparator<T extends DataItem>(a: T, b: T, sortingOrder: SORTING_ORDER, fieldName: keyof T) {
  const res = a[fieldName].toLocaleLowerCase().localeCompare(b[fieldName].toLocaleLowerCase())

  if (sortingOrder === SORTING_ORDER.DESC) {
    return res * -1
  }

  return res
}

class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public middleName: string,
    public email: string,
  ) { }

  get fullName() {
    return `${this.lastName} ${this.firstName} ${this.middleName}`
  }
}

const columns: Array<Column<User>> = [
  {
    dataField: "fullName",
    header: "ФИО",
    headCellProps: {
      width: 300
    },
    sortComparator: (a, b, sortingOrder) => alphabeticalSortComparator<User>(a, b, sortingOrder, "fullName")
  },
  {
    dataField: "email",
    header: "Электронная почта",
    headCellProps: {
      width: 300
    },
    sortComparator: (a, b, sortingOrder) => alphabeticalSortComparator<User>(a, b, sortingOrder, "email")
  },
]

const data = [
  new User(1, "string", "string", "string", "string@string.com"),
  new User(2, "а", "а", "а", "a@a.com"),
  new User(3, "test", "test", "test", "test@test.com"),
  new User(4, "example", "example", "example", "example@example.com"),
  new User(5, "Иван", "Иванов", "Иванович", "email@example.com"),
]

  //////// DataTableExample.ts

  <DataTable<User>
    selectable
    filterable
    sortable
    striped
    fixedTopTitle
    data={data}
    columns={columns}
  />
```
