var StringType = /** @class */ (function () {
    function StringType() {
    }
    /**isNumeric
     * tests to ensure a string is made up of only 0-9 characters
     * if empty will return false
     * if containing alpha characters, punctuation etc will return false
     * will allow prefixing of zeroes e.g 01234 will evaluate as true
     * @param  {string} value
     */
    StringType.isNumeric = function (value) {
        if (value === null || value === '') {
            return false;
        }
        var regExp = new RegExp('^([0-9]*)$');
        return regExp.test(value);
    };
    return StringType;
}());
export { StringType };
//# sourceMappingURL=string-type.js.map