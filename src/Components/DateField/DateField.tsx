import { InputHTMLAttributes, useCallback } from "react"
import TextField, { TextFieldProps } from "../TextField/TextField";

export type DateType = string | null

export type DateFieldProps = {
  onChange?: (value: DateType, event: any) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange">
  & Omit<TextFieldProps, "type" | "onChange">

export function DateField(props: DateFieldProps) {
  const { onChange, min = "1900-01-01", max = "2099-12-31", fullWidth = true, ...otherProps } = props;

  const onChangeHandler = useCallback((event: any) => {
    const value = event.target.value

    if (value === '') {
      onChange?.(null, event)
      return;
    }

    onChange?.(value, event)
  }, [])

  return <TextField
    size="small"
    {...otherProps}
    fullWidth={fullWidth}
    type="date"
    onChange={onChangeHandler}
  />
}

export default DateField