import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button";
import { TextFieldProps } from "../TextField/TextField";

export type SearchFieldProps = TextFieldProps & {
  initialValue?: string
  label?: string
  onSearch?: (value: string) => void
  withoutButton?: boolean
}

export default function SearchField(props: SearchFieldProps) {
  const { label = "Поиск", onSearch, initialValue = '', withoutButton, ...restProps } = props;
  const [searchValue, setSearchValue] = useState<string>(initialValue);
  const [callOnButtonClickAfterUpdate, setCallOnButtonClickAfterUpdate] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const onButtonClick = useCallback(() => {
    onSearch?.(searchValue)
  }, [searchValue, onSearch])

  const onReset = useCallback((event: any) => {
    if (event.target.value === '') {
      setCallOnButtonClickAfterUpdate(true)
    }
  }, [])

  useEffect(() => {
    searchRef.current?.addEventListener('search', onReset)
    return () => {
      searchRef.current?.removeEventListener('search', onReset)
    }
  }, [searchRef.current, onReset])

  useEffect(() => {
    if (!callOnButtonClickAfterUpdate) return;
    onButtonClick()
    setCallOnButtonClickAfterUpdate(false)

  }, [callOnButtonClickAfterUpdate, onButtonClick])

  const onChange = useCallback((event: any) => {
    setSearchValue(event.target.value)
  }, [])

  const onKeyDown = useCallback((event: any) => {
    if (event.key === 'Enter') {

      onChange(event)
      setCallOnButtonClickAfterUpdate(true)
    }
  }, [])

  return <div className="search-field">
    <TextField
      ref={searchRef}
      type="search"
      size="small"
      value={searchValue}
      label={label}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlined />
          </InputAdornment>
        ),
      }}
      onChange={onChange}
      onKeyDown={onKeyDown}
      {...restProps}
    />
    {!withoutButton && <Button
      onClick={onButtonClick}
      variant="outlined"
    >
      Найти
    </Button>
    }
  </div>
}