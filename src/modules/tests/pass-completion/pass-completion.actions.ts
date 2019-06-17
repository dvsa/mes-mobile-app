import { Action } from '@ngrx/store';

export const POPULATE_PASS_COMPLETION = '[Pass Completion] Populate with default answers';
export const PASS_CERTIFICATE_NUMBER_CHANGED = '[Pass Completion] Pass certificate number changed';
export const PROVISIONAL_LICENSE_RECEIVED = '[Pass Completion] Provisional license received';
export const PROVISIONAL_LICENSE_NOT_RECEIVED = '[Pass Completion] Provisional license not received';

export class PopulatePassCompletion implements Action {
  readonly type = POPULATE_PASS_COMPLETION;
}

export class PassCertificateNumberChanged implements Action {
  readonly type = PASS_CERTIFICATE_NUMBER_CHANGED;
  constructor(public passCertificateNumber: string) { }
}

export class ProvisionalLicenseReceived implements Action {
  readonly type = PROVISIONAL_LICENSE_RECEIVED;
}

export class ProvisionalLicenseNotReceived implements Action {
  readonly type = PROVISIONAL_LICENSE_NOT_RECEIVED;
}

export type Types =
  | PopulatePassCompletion
  | PassCertificateNumberChanged
  | ProvisionalLicenseReceived
  | ProvisionalLicenseNotReceived;
