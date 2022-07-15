import { useRef } from "react";
import DateField, { DateFieldProps, DateType } from "../DateField/DateField";

export type DateRange = {
  from: DateType,
  to: DateType,
}

export type DateRangeProps = {
  fieldFromProps: Omit<DateFieldProps, "onChange | defaultValue">,
  fieldToProps: Omit<DateFieldProps, "onChange | defaultValue">,
  onChange?: (value: DateRange) => void,
  defaultValue?: DateRange
}

export function DateRange(props: DateRangeProps) {
  const { fieldFromProps, fieldToProps, defaultValue, onChange } = props;
  const dateRangeValue = useRef(defaultValue)


  return <div>
    <DateField className="date-range__date-from" {...fieldFromProps} defaultValue={defaultValue?.from ?? undefined} />
    <DateField className="date-range__date-to" {...fieldToProps} defaultValue={defaultValue?.to ?? undefined} />
  </div>
}

export default DateRange