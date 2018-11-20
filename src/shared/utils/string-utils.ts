import { isString } from 'lodash';

export function isNonBlankString(val: any): boolean {
  return isString(val) && val.trim().length > 0;
}
