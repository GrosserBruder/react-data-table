import { VALUE_TYPE } from "../../const"
import { getValueType } from "../../utils"

export function useValueType(value: any): VALUE_TYPE {
  return getValueType(value)
}

export default useValueType