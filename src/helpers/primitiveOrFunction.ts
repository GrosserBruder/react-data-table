export function primitiveOrFunction(primitiveOrFunction: Function | any, dataToFunction: { [key: string]: any }) {
  if (typeof primitiveOrFunction === "function") return primitiveOrFunction(dataToFunction)
  return primitiveOrFunction;
}

export default primitiveOrFunction