import { ReactElement, useCallback } from "react";
import { Popper, PopperProps, Box, ClickAwayListener } from "@mui/material";

export type FilterContainerProps = PopperProps & {
  onClose?: () => void
  children?: Array<ReactElement> | ReactElement
}

export function FilterContainer(props: FilterContainerProps) {
  const { children, onClose, ...containerProps } = props;

  const onClickAwayListener = useCallback((event: any) => {
    //workaround for Node as Portal
    if ((event.target as Node).nodeName === "BODY" && event.type === "click") {
      return;
    }
    onClose?.()
  }, [onClose])

  return <Popper
    className="head-cell__popper"
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