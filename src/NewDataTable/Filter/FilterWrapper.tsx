import Stack from "@mui/material/Stack"
import { ReactNode } from "react"
import { Button } from "../../Components"

export type FilterWrapperProps = {
  children?: ReactNode
  onAccept?: () => void
  onReset?: () => void
}

export function FilterWrapper(props: FilterWrapperProps) {
  const { children, onAccept, onReset } = props;
  return <div>
    {children}
    <Stack direction="row" spacing={1} justifyContent="center">
      <Button
        size="small"
        onClick={onAccept}
      >
        Применить
      </Button>
      <Button
        color="error"
        size="small"
        onClick={onReset}
      >
        Сбросить
      </Button>
    </Stack>
  </div>
}