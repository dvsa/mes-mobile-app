var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { PASS_CERTIFICATE_LENGTH } from './pass-certificate-validation.constants';
var PassCertificateValidationProvider = /** @class */ (function () {
    function PassCertificateValidationProvider() {
    }
    PassCertificateValidationProvider.prototype.isPassCertificateValid = function (certificate) {
        if (!certificate || certificate.length !== PASS_CERTIFICATE_LENGTH) {
            return false;
        }
        if (!this.isLetter(certificate[0])) {
            return false;
        }
        var checkDigit = this.calculateMod37CheckDigit(certificate);
        if (checkDigit === 'invalid') {
            return false;
        }
        if (checkDigit.toUpperCase() !== certificate.toUpperCase()[7]) {
            return false;
        }
        return true;
    };
    PassCertificateValidationProvider.prototype.isLetter = function (char) {
        return char.length === 1 && char.match(/[a-z]/i) !== null;
    };
    PassCertificateValidationProvider.prototype.calculateMod37CheckDigit = function (certificate) {
        var digitMultipliers = [7, 6, 5, 4, 3, 2];
        var checkDigits = Array.from('%ZYXWVUT/RQP+NMLKJ-HGFEDC&A9876543210');
        // attempt to convert positions 1 - 6 to numbers
        // and return 'invalid' if any are not a number
        var digit1 = parseInt(certificate[1], 10);
        var digit2 = parseInt(certificate[2], 10);
        var digit3 = parseInt(certificate[3], 10);
        var digit4 = parseInt(certificate[4], 10);
        var digit5 = parseInt(certificate[5], 10);
        var digit6 = parseInt(certificate[6], 10);
        if (isNaN(digit1) || isNaN(digit2) || isNaN(digit3) ||
            isNaN(digit4) || isNaN(digit5) || isNaN(digit6)) {
            return 'invalid';
        }
        // take the 6 digits, apply the multiplier for each digit
        // (defined in digitMultiplier above) and add them together
        // then take the remainder of this value divided by 37.
        var position = ((digit1 * digitMultipliers[0]) +
            (digit2 * digitMultipliers[1]) +
            (digit3 * digitMultipliers[2]) +
            (digit4 * digitMultipliers[3]) +
            (digit5 * digitMultipliers[4]) +
            (digit6 * digitMultipliers[5])) % 37;
        // return the check digit from the checkDigits array at the position
        // calculated
        var checkDigit = checkDigits[position];
        return checkDigit;
    };
    PassCertificateValidationProvider = __decorate([
        Injectable()
    ], PassCertificateValidationProvider);
    return PassCertificateValidationProvider;
}());
export { PassCertificateValidationProvider };
//# sourceMappingURL=pass-certificate-validation.js.map