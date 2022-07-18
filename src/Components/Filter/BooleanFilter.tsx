import { useCallback, useEffect, useState } from "react"
import CheckBox, { CheckBoxProps } from "../Checkbox/Checkbox"

export type BooleanFilterProps = {
  trueOptionProps?: Omit<CheckBoxProps, "onClick" | "defaultValue" | "value" | "checked">,
  falseOptionToProps?: Omit<CheckBoxProps, "onClick" | "defaultValue" | "value" | "checked">,
  onChange?: (value: boolean | undefined) => void,
  defaultValue?: boolean
}

export function BooleanFilter(props: BooleanFilterProps) {
  const { defaultValue, onChange, trueOptionProps, falseOptionToProps } = props
  const [value, setValue] = useState(defaultValue)

  const onChecked = useCallback((event: any) => {
    const newValue = (event.target.value === 'true')
    const result = value === newValue ? undefined : newValue

    setValue(result)
    onChange?.(result)
  }, [value])

  return <div>
    <CheckBox label="Да" {...trueOptionProps} onClick={onChecked} value={true} checked={value === true} />
    <CheckBox label="Нет" {...falseOptionToProps} onClick={onChecked} value={false} checked={value === false} />
  </div>
}

export default BooleanFilter