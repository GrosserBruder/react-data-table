export const enum FILTER_TYPES {
  DATE = "date",
  NUMBER = "number",
  BOOLEAN = "boolean",
  STRING = "string",
}

export type FILTER_TYPE = FILTER_TYPES | null

const getFilterType = (value: any) => {
  switch (true) {
    case (typeof value === "string") && !isNaN(Date.parse(value)):
      return FILTER_TYPES.DATE
    case typeof value === "boolean":
      return FILTER_TYPES.BOOLEAN
    case typeof value === "number":
      return FILTER_TYPES.NUMBER
    case typeof value === "string":
      return FILTER_TYPES.STRING
    default:
      return null
  }
}

export function useFilterType(value: any): FILTER_TYPE {
  return getFilterType(value)
}

export default useFilterType