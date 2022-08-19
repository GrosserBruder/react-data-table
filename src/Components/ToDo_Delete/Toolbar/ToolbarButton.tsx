import Chip, { ChipProps } from "@mui/material/Chip"
import classnames from "classnames"
import { useEffect } from "react"
import "../styles/ToolbarButton.scss"

export type ToolbarButtonProps = Omit<ChipProps, "clickable"> & {
  show?: boolean,
}

export function ToolbarButton({ show = true, ...props }: ToolbarButtonProps) {
  const className = classnames("toolbar-button", props.className, {
    "toolbar-button--showing": show,
  })

  useEffect(() => {
  })

  return <Chip
    variant="outlined"
    color="primary"
    size="small"
    {...props}
    className={className}
    clickable
  />
}

export default ToolbarButton