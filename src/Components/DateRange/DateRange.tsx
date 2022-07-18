import { useCallback, useRef } from "react";
import DateField, { DateFieldProps, DateType } from "../DateField/DateField";
import classnames from "classnames"

export type DateRange = {
  from: DateType,
  to: DateType,
}

export type DateRangeProps = {
  dateFromProps?: Omit<DateFieldProps, "onChange" | "defaultValue">,
  dateToProps?: Omit<DateFieldProps, "onChange" | "defaultValue">,
  onChange?: (value: DateRange) => void,
  defaultValue?: DateRange
}

export function DateRange(props: DateRangeProps) {
  const {
    dateFromProps, dateToProps, defaultValue = { from: null, to: null }, onChange
  } = props;
  const dateRangeValue = useRef(defaultValue)

  const onChangeHandler = useCallback(() => {
    onChange?.(dateRangeValue.current)
  }, [dateRangeValue])

  const onDateFromChange = useCallback((value: DateType) => {
    dateRangeValue.current.from = value
    onChangeHandler()
  }, [dateRangeValue])

  const onDateToChange = useCallback((value: DateType) => {
    dateRangeValue.current.to = value
    onChangeHandler()
  }, [dateRangeValue])

  const dateFromClassName = classnames("date-range__date-from", dateFromProps?.className)
  const dateToClassName = classnames("date-range__date-to", dateToProps?.className)


  return <div>
    <DateField
      {...dateFromProps}
      className={dateFromClassName}
      placeholder="С даты"
      onChange={onDateFromChange}
      defaultValue={defaultValue?.from ?? undefined}
    />
    <DateField
      {...dateToProps}
      className={dateToClassName}
      placeholder="По дату"
      onChange={onDateToChange}
      defaultValue={defaultValue?.to ?? undefined}
    />
  </div>
}

export default DateRange