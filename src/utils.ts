export type ResultCompare = -1 | 0 | 1

export const ascSorting = (resultCompare: ResultCompare) => {
  if (resultCompare === -1) {
    return -1;
  }
  if (resultCompare === 1) {
    return 1
  }
  return 0
}

export const descSorting = (resultCompare: ResultCompare) => {
  if (resultCompare === -1) {
    return 1;
  }
  if (resultCompare === 1) {
    return -1
  }
  return 0
}

export const compareByAlphabetically = (a: any, b: any) => {
  if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) return -1;
  if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) return 1;
  return 0;
}

export const compareNumberOrBoolean = (a: any, b: any) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}