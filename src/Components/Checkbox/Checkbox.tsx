import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from "@mui/material/Checkbox";

export type CheckBoxProps = MuiCheckboxProps

export default function Checkbox(props: CheckBoxProps) {
  return <MuiCheckbox {...props} />
}