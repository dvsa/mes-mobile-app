import { Action } from '@ngrx/store';

export const PASS_FINALISTATION_VIEW_DID_ENTER = '[PassFinalisationPage] Pass Finalisation view did enter';
export const PASS_CERTIFICATE_NUMBER_CHANGED = '[PassFinalisationPage] Pass certificate number changed';

export class PassFinalisationViewDidEnter implements Action {
  readonly type = PASS_FINALISTATION_VIEW_DID_ENTER;
}

export class PassCertificateNumberChanged implements Action {
  readonly type = PASS_CERTIFICATE_NUMBER_CHANGED;
  constructor(public passCertificateNumber: string) {}
}

export type Types =
  | PassFinalisationViewDidEnter
  | PassCertificateNumberChanged;
