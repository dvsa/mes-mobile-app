export function replaceAt(array, index, value) {
  const result = [...array];
  result[index] = value;
  return result;
}
