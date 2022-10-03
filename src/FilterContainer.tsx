import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import FilterAlt from "@mui/icons-material/FilterAlt";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import Popper, { PopperProps } from "@mui/material/Popper";
import classnames from "classnames";
import { MutableRefObject, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./styles/FilterContainer.scss";

export type FilterContainerProps = Pick<PopperProps, "anchorEl"> & {
  anchorRef?: MutableRefObject<any>
  className?: string
  children?: (props: FilterContainerRenderProps) => ReactElement | undefined
  isFilterInstalled?: boolean,
}

export type FilterContainerRenderProps = {
  onClose: () => void
}

export function FilterContainer(props: FilterContainerProps) {
  const { children, className, isFilterInstalled, anchorRef } = props;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const filterButtonRef = useRef(null)

  const togglePopover = useCallback((event: any) => {
    setIsPopoverOpen((x) => !x)
  }, [setIsPopoverOpen])

  const onClose = useCallback(() => {
    setIsPopoverOpen(false);
  }, [setIsPopoverOpen])

  const onClickAwayListener = useCallback((event: any) => {
    //workaround for Node as Portal like SelectList
    if ((event.target as Node).nodeName === "BODY" && event.type === "click") {
      return;
    }
    onClose()
  }, [onClose])

  const onKeyDown = useCallback((event: any) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [onKeyDown])

  const popperClassName = classnames("filter-container__popper", className)

  const childrenRenderProps: FilterContainerRenderProps = useMemo(() => ({ onClose }), [onClose])

  // в children находиться форма для установки фильтров
  // если ее нет, то не выводим кнопку для открытия формы
  if (!children) return <></>

  return <div className="filter-container">
    <IconButton
      className="filter-container__open-button"
      ref={filterButtonRef}
      onClick={togglePopover}
    >
      {isFilterInstalled ? <FilterAlt /> : <FilterAltOutlined />}
    </IconButton>

    <Popper
      className={popperClassName}
      open={isPopoverOpen}
      anchorEl={anchorRef?.current ?? filterButtonRef?.current}
      placement="bottom-end"
    >
      <ClickAwayListener onClickAway={onClickAwayListener}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
          {children?.(childrenRenderProps)}
        </Box>
      </ClickAwayListener>
    </Popper>
  </div>
}

export default FilterContainer