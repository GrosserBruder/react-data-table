import { ReactElement, useCallback, cloneElement, isValidElement, useEffect } from "react";
import { Popper, PopperProps, Box, ClickAwayListener } from "@mui/material";
import classnames from "classnames"
import "../styles/FilterContainer.scss"
import { FilterValue } from "./types";

export type FilterContainerProps = PopperProps & {
  onClose?: () => void
  children?: ReactElement
}

export function FilterContainer(props: FilterContainerProps) {
  const { children: propsChildren, onClose, className, ...containerProps } = props;

  const onClickAwayListener = useCallback((event: any) => {
    //workaround for Node as Portal
    if ((event.target as Node).nodeName === "BODY" && event.type === "click") {
      return;
    }
    onClose?.()
  }, [onClose])

  const onKeyDown = useCallback((event: any) => {
    if (event.key === 'Escape') {
      onClose?.()
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [onKeyDown])

  const popperClassName = classnames("data-table__filter-container__popper", className)

  const onFilterChange = useCallback((value: FilterValue) => {
    propsChildren?.props.onFilterChange?.(value)
    onClose?.()
  }, [propsChildren])

  const children = isValidElement(propsChildren)
    ? cloneElement(propsChildren, { onFilterChange })
    : null

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