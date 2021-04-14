/**
 * Formats application reference as a single number, of the form <``app-id``><``book-seq``><``check-digit``>.
 *
 * @param appRef The application reference, as separate fields
 * @returns The app id, booking sequence (padded to 2 digits) and check digit
 */
export var formatApplicationReference = function (appRef) {
    var formatter = Intl.NumberFormat('en-gb', { minimumIntegerDigits: 2 });
    return "" + appRef.applicationId + formatter.format(appRef.bookingSequence) + appRef.checkDigit;
};
export var removeLeadingZeros = function (value) {
    return value.replace(/^0+(?!$)/, '');
};
export var removeNonAlphaNumeric = function (value) {
    return value.replace(/[^a-z0-9+]+/gi, '');
};
//# sourceMappingURL=formatters.js.map