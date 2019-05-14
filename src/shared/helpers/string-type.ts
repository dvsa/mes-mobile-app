export class StringType {
  static isNumeric(value: string): boolean {

    if (value === null || value === '') {
      return false;
    }

    const regExp = new RegExp('^([0-9]*)$');
    return regExp.test(value);
  }

}
