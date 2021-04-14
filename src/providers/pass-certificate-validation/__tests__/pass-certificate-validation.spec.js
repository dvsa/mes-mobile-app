import { TestBed } from '@angular/core/testing';
import { PassCertificateValidationProvider } from '../pass-certificate-validation';
import { configureTestSuite } from 'ng-bullet';
describe('PassCertificateValidationProvider', function () {
    var certificateValidatorProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                PassCertificateValidationProvider,
            ],
        });
    });
    beforeEach(function () {
        certificateValidatorProvider = TestBed.get(PassCertificateValidationProvider);
    });
    describe('calculateMod37CheckDigit', function () {
        it('should return invalid if second character is not a digit', function () {
            var checkDigit = certificateValidatorProvider.calculateMod37CheckDigit('CX23458');
            expect(checkDigit).toBe('invalid');
        });
    });
    describe('calculateMod37CheckDigit', function () {
        it('should return invalid if third character is not a digit', function () {
            var checkDigit = certificateValidatorProvider.calculateMod37CheckDigit('C1X3458');
            expect(checkDigit).toBe('invalid');
        });
    });
    describe('calculateMod37CheckDigit', function () {
        it('should return invalid if fourth character is not a digit', function () {
            var checkDigit = certificateValidatorProvider.calculateMod37CheckDigit('C12X458');
            expect(checkDigit).toBe('invalid');
        });
    });
    describe('calculateMod37CheckDigit', function () {
        it('should return invalid if fifth character is not a digit', function () {
            var checkDigit = certificateValidatorProvider.calculateMod37CheckDigit('C123X58');
            expect(checkDigit).toBe('invalid');
        });
    });
    describe('calculateMod37CheckDigit', function () {
        it('should return invalid if sixth character is not a digit', function () {
            var checkDigit = certificateValidatorProvider.calculateMod37CheckDigit('C1234X8');
            expect(checkDigit).toBe('invalid');
        });
    });
    describe('calculateMod37CheckDigit', function () {
        it('should return invalid if seventh character is not a digit', function () {
            var checkDigit = certificateValidatorProvider.calculateMod37CheckDigit('C12345X');
            expect(checkDigit).toBe('invalid');
        });
    });
    describe('calculateMod37CheckDigit', function () {
        it('should return a check digit of N if passed C758920', function () {
            var checkDigit = certificateValidatorProvider.calculateMod37CheckDigit('C758920');
            expect(checkDigit).toBe('N');
        });
    });
    describe('calculateMod37CheckDigit', function () {
        it('should return a check digit of W if passed C839255', function () {
            var checkDigit = certificateValidatorProvider.calculateMod37CheckDigit('C839255');
            expect(checkDigit).toBe('W');
        });
    });
    describe('isLetter', function () {
        it('should return true if passed a alpha character', function () {
            var result = certificateValidatorProvider.isLetter('C');
            expect(result).toBeTruthy();
        });
    });
    describe('isLetter', function () {
        it('should return false if passed a numeric character', function () {
            var result = certificateValidatorProvider.isLetter('9');
            expect(result).toBeFalsy();
        });
    });
    describe('isLetter', function () {
        it('should return false if passed a punctuation character', function () {
            var result = certificateValidatorProvider.isLetter('@');
            expect(result).toBeFalsy();
        });
    });
    describe('isPassCertificateValid', function () {
        it('should return false if passed a short certificate', function () {
            var result = certificateValidatorProvider.isPassCertificateValid('C123');
            expect(result).toBeFalsy();
        });
    });
    describe('isPassCertificateValid', function () {
        it('should return false if passed a certificate starting with a non alphabet character', function () {
            var result = certificateValidatorProvider.isPassCertificateValid('1123456X');
            expect(result).toBeFalsy();
        });
    });
    describe('isPassCertificateValid', function () {
        it('should return false if passed a certificate with a letter in place of a number', function () {
            var result = certificateValidatorProvider.isPassCertificateValid('C12X456X');
            expect(result).toBeFalsy();
        });
    });
    describe('isPassCertificateValid', function () {
        it('should return false if passed a certificate with an incorrect check digit', function () {
            var result = certificateValidatorProvider.isPassCertificateValid('C839255T');
            expect(result).toBeFalsy();
        });
    });
    describe('isPassCertificateValid', function () {
        it('should return true if passed a valid certificate', function () {
            var result = certificateValidatorProvider.isPassCertificateValid('C839255W');
            expect(result).toBeTruthy();
        });
    });
    describe('isPassCertificateValid', function () {
        it('should return true if passed a valid certificate with lowercase letters', function () {
            var result = certificateValidatorProvider.isPassCertificateValid('c839255w');
            expect(result).toBeTruthy();
        });
    });
});
//# sourceMappingURL=pass-certificate-validation.spec.js.map