export function extractPropertyNameFromId(id) {
    var startPos = id.indexOf('-');
    var returnString = id.substring(startPos + 1);
    return returnString;
}
//# sourceMappingURL=property-name-extraction.js.map