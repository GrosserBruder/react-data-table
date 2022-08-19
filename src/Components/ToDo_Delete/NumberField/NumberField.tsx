import { DetailedHTMLProps, InputHTMLAttributes, useCallback } from "react";
import TextField, { TextFieldProps } from "../TextField/TextField";

export type NumberType = number | null

export type NumberFieldProps = Omit<TextFieldProps, "type" | "onChange"> & {
  onChange?: (value: NumberType, event: any) => void
}

export function NumberField(props: NumberFieldProps) {
  const { onChange, fullWidth = true, ...otherProps } = props

  const onChangeHandler = useCallback((event: any) => {
    const value = event.target.value

    if (value === '') {
      onChange?.(null, event)
      return;
    }

    onChange?.(+value, event)
  }, [])

  return <TextField
    type="number"
    size="small"
    {...otherProps}
    fullWidth={fullWidth}
    onChange={onChangeHandler}
  />
}

export default NumberField;