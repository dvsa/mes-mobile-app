export function extractPropertyNameFromId(id: any) {
  const startPos = id.indexOf('-');
  const returnString = id.substring(startPos + 1);
  return returnString;
}
