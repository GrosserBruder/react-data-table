import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

export type ButtonProps = LoadingButtonProps & {
  isLoading?: boolean,
}

export default function Button(props: ButtonProps) {
  const {
    isLoading,
    loadingPosition = 'center',
    variant = 'outlined',
    disabled,
    children,
    ...rest
  } = props
  return (
    <LoadingButton
      loadingPosition={loadingPosition}
      variant={variant}
      disabled={isLoading || disabled}
      {...rest}
      loading={isLoading}
    >
      {children}
    </LoadingButton>
  );
}
