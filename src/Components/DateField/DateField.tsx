import { HTMLAttributes, InputHTMLAttributes, useCallback } from "react"

export type DateType = string | null

export type DateFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type | onChange"> & {
  onChange?: (value: DateType, event: any) => void
}

export function DateField(props: DateFieldProps) {
  const { onChange, ...otherProps } = props;

  const onChangeHandler = useCallback((event: any) => {
    const value = event.target.value

    if (value === '') {
      onChange?.(null, event)
      return;
    }

    onChange?.(value, event)
  }, [])

  return <input {...otherProps} type="date" onChange={onChangeHandler} />
}

export default DateField