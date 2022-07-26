import { useRef, useCallback } from "react";
import NumberField, { NumberFieldProps, NumberType } from "../NumberField/NumberField";
import classnames from "classnames"

export type NumberRange = {
  from: number | null,
  to: number | null,
}

export type NumberRangeProps = {
  numberFromProps?: Omit<NumberFieldProps, "onChange" | "defaultValue">,
  numberToProps?: Omit<NumberFieldProps, "onChange" | "defaultValue">,
  onChange?: (value: NumberRange) => void,
  defaultValue?: NumberRange
}

export function NumberRange(props: NumberRangeProps) {
  const {
    numberFromProps, numberToProps, defaultValue = { from: null, to: null }, onChange
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

  const numberFromClassName = classnames("number-range__number-from", numberFromProps?.className)
  const numberToClassName = classnames("number-range__number-to", numberToProps?.className)

  return <>
    <NumberField
      label="От"
      {...numberFromProps}
      className={numberFromClassName}
      onChange={onFromChange}
      defaultValue={dateRangeValue?.current.from ?? undefined}
    />
    <NumberField
      label="До"
      {...numberToProps}
      className={numberToClassName}
      onChange={onToChange}
      defaultValue={dateRangeValue?.current.to ?? undefined}
    />
  </>
}

export default NumberRange