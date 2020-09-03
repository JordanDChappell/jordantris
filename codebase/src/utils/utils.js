/**
 * * Returns true if the param is indeed an object.
 * @param {object?} obj | Tested for objectness
 */
export const isObject = (obj) => {
  if (obj == null) {
    return false;
  }

  return typeof obj === "object";
}