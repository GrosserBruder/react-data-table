import { ReactElement, useCallback } from "react";
import { Popper, PopperProps, Box, ClickAwayListener } from "@mui/material";
import classnames from "classnames"
import "../styles/FilterContainer.scss"

export type FilterContainerProps = PopperProps & {
  onClose?: () => void
  children?: Array<ReactElement> | ReactElement
}

export function FilterContainer(props: FilterContainerProps) {
  const { children, onClose, className, ...containerProps } = props;

  const onClickAwayListener = useCallback((event: any) => {
    //workaround for Node as Portal
    if ((event.target as Node).nodeName === "BODY" && event.type === "click") {
      return;
    }
    onClose?.()
  }, [onClose])

  const popperClassName = classnames("data-table__filter-container__popper", className)

  return <Popper
    className={popperClassName}
    disablePortal
    placement="bottom-end"
    {...containerProps}
  >
    <ClickAwayListener onClickAway={onClickAwayListener}>
      <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
        {children}
      </Box>
    </ClickAwayListener>
  </Popper>
}


export default FilterContainer;