export function flattenArray(array) {
    var result = '';
    array.forEach(function (value, index) {
        if (index === 0) {
            result = result.concat(value);
            return;
        }
        if (index === array.length - 1) {
            result = result.concat(" and " + value);
            return;
        }
        result = result.concat(", " + value);
    });
    return result;
}
export function convertBooleanToString(value) {
    return value ? 'Yes' : 'No';
}
//# sourceMappingURL=view-test-result-helpers.js.map