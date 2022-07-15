import { useCallback, useRef } from "react";
import DateField, { DateFieldProps, DateType } from "../DateField/DateField";

export type DateRange = {
  from: DateType,
  to: DateType,
}

export type DateRangeProps = {
  fieldFromProps?: Omit<DateFieldProps, "onChange | defaultValue">,
  fieldToProps?: Omit<DateFieldProps, "onChange | defaultValue">,
  onChange?: (value: DateRange) => void,
  defaultValue?: DateRange
}

export function DateRange(props: DateRangeProps) {
  const { fieldFromProps, fieldToProps, defaultValue = { from: null, to: null }, onChange } = props;
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


  return <div>
    <DateField className="date-range__date-from" {...fieldFromProps} placeholder="С даты" onChange={onDateFromChange} defaultValue={defaultValue?.from ?? undefined} />
    <DateField className="date-range__date-to" {...fieldToProps} placeholder="По дату" onChange={onDateToChange} defaultValue={defaultValue?.to ?? undefined} />
  </div>
}

export default DateRange