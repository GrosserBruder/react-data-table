import { useRef, useCallback } from "react";
import NumberField, { NumberFieldProps, NumberType } from "../NumberField/NumberField";
import classnames from "classnames"

export type NumberRange = {
  from: number | null,
  to: number | null,
}

export type NumberRangeProps = {
  dateFromProps?: Omit<NumberFieldProps, "onChange" | "defaultValue">,
  dateToProps?: Omit<NumberFieldProps, "onChange" | "defaultValue">,
  onChange?: (value: NumberRange) => void,
  defaultValue?: NumberRange
}

export function NumberRange(props: NumberRangeProps) {
  const {
    dateFromProps, dateToProps, defaultValue = { from: null, to: null }, onChange
  } = props;
  const dateRangeValue = useRef(defaultValue)

  const onChangeHandler = useCallback(() => {
    onChange?.(dateRangeValue.current)
  }, [dateRangeValue])

  const onFromChange = useCallback((value: NumberType) => {
    dateRangeValue.current.from = value
    onChangeHandler()
  }, [dateRangeValue])

  const onToChange = useCallback((value: NumberType) => {
    dateRangeValue.current.to = value
    onChangeHandler()
  }, [dateRangeValue])

  const dateFromClassName = classnames("date-range__date-from", dateFromProps?.className)
  const dateToClassName = classnames("date-range__date-to", dateToProps?.className)

  return <div>
    <NumberField placeholder="От" onChange={onFromChange} />
    <NumberField placeholder="До" onChange={onToChange} />
  </div>
}

export default NumberRange