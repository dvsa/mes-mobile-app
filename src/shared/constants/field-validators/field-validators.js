// Used for when you want to check value does not have a leading zero
export var leadingZero = /^0*/g;
// Used for when you want to replace all parts of input except numbers 0-9
export var nonNumericValues = /[^0-9]/g;
// Used for when you want to replace all parts of input except numbers 0-9 and alpha A-Z insensitive
export var nonAlphaNumericValues = /[^A-Z0-9]/gi;
export var getByteCount = function (str) { return Buffer.byteLength(str, 'utf8'); };
export var getRegistrationNumberValidator = function () {
    return {
        pattern: /^[A-Z0-9]{1,7}$/gi,
        maxLength: '7',
    };
};
export var getInstructorRegistrationNumberValidator = function () {
    return {
        pattern: /^[1-9][0-9]{0,6}$/g,
        maxLength: '7',
    };
};
export var getTrainerRegistrationNumberValidator = function () {
    return {
        pattern: /^[1-9][0-9]{0,6}$/g,
        maxLength: '7',
    };
};
export var getSpeedCheckValidator = function () {
    return {
        pattern: /^[0-9]{0,2}$/g,
        maxLength: '2',
    };
};
export var getPassCertificateAMOD1Validator = function () {
    return {
        pattern: /^[A-Z][0-9]{5}[%ZYXWVUT/RQP+NMLKJ\-HGFEDC&A9876543210–]$/gi,
        maxLength: '7',
        maxByteLength: 8,
    };
};
export var getDL196CBTCertificateNumberValidator = function () {
    return {
        pattern: /^\d{7}?$/,
        maxLength: '7',
    };
};
//# sourceMappingURL=field-validators.js.map