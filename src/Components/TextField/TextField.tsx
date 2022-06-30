import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

export type TextFieldProps = MuiTextFieldProps & {
  isInvalid?: boolean;
}

export default function TextField(props: TextFieldProps) {
  const { isInvalid, ...rest } = props;
  return <MuiTextField {...rest} error={isInvalid} />
}