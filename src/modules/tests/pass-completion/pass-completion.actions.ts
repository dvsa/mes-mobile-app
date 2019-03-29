import { Action } from '@ngrx/store';

export const PASS_CERTIFICATE_NUMBER_CHANGED = '[Pass Completion] Pass certificate number changed';

export class PassCertificateNumberChanged implements Action {
  readonly type = PASS_CERTIFICATE_NUMBER_CHANGED;
  constructor(public passCertificateNumber: string) {}
}

export type Types =
  | PassCertificateNumberChanged;
