import { Injectable } from '@angular/core';

@Injectable()
export class PassCertificateValidatorProvider {

  isPassCertificateValid(certificate: string | null): boolean {
    if (!certificate || certificate.length !== 8) {
      return false;
    }
    if (!this.isLetter(certificate[0])) {
      return false;
    }

    const checkDigit = this.calculateMod37CheckDigit(certificate);

    if (checkDigit === 'invalid') {
      return false;
    }

        // compare entered checkdigit with generated one
    if (checkDigit !== certificate.toUpperCase()[7]) {
      return false;
    }

    return true;
  }

  isLetter(char: string): boolean {
    return char.length === 1 && char.match(/[a-z]/i) !== null;
  }

  calculateMod37CheckDigit(certificate: string): string {
    const digitMultipliers: number[] = [7, 6, 5, 4, 3, 2];
    const checkDigits: string[] = Array.from(
          '%ZYXWVUT/RQP+NMLKJ-HGFEDC&A9876543210');

    const digit1 = parseInt(certificate[1], 10);
    const digit2 = parseInt(certificate[2], 10);
    const digit3 = parseInt(certificate[3], 10);
    const digit4 = parseInt(certificate[4], 10);
    const digit5 = parseInt(certificate[5], 10);
    const digit6 = parseInt(certificate[6], 10);

    if (isNaN(digit1) || isNaN(digit2) || isNaN(digit3) ||
          isNaN(digit4) || isNaN(digit5) || isNaN(digit6)) {
      return 'invalid';
    }

    const position: number  = ((digit1 * digitMultipliers[0]) +
          (digit2 * digitMultipliers[1]) +
          (digit3 * digitMultipliers[2]) +
          (digit4 * digitMultipliers[3]) +
          (digit5 * digitMultipliers[4]) +
          (digit6 * digitMultipliers[5])) % 37;

    const checkDigit = checkDigits[position];
    return checkDigit;
  }
}
