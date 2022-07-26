import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from '@mui/material/FormControlLabel';
import "../styles/Checkbox.scss"

export type CheckBoxProps = MuiCheckboxProps & {
  label?: string
}

export default function Checkbox(props: CheckBoxProps) {
  const { label, ...otherProps } = props
  return <FormControlLabel className="checkbox__label" control={< MuiCheckbox {...otherProps} />} label={label} />
}