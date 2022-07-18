import { DetailedHTMLProps, InputHTMLAttributes, useCallback } from "react";

export type NumberType = number | null

export type NumberFieldProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "type" | "onChange"> & {
  onChange?: (value: NumberType, event: any) => void
}

export function NumberField(props: NumberFieldProps) {
  const { onChange, ...otherProps } = props

  const onChangeHandler = useCallback((event: any) => {
    const value = event.target.value

    if (value === '') {
      onChange?.(null, event)
      return;
    }

    onChange?.(+value, event)
  }, [])

  return <input type="number" {...otherProps} onChange={onChangeHandler} />
}

export default NumberField;