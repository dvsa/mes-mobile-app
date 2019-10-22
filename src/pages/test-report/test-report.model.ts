export type TestReportModel = {
  seriousMode: boolean,
  dangerousMode: boolean,
  removeFaultMode: boolean,
  isLegalRequirementsValid: boolean,
  isEtaValid: boolean,
};

export interface OverlayCallback {
  callbackMethod: () => void;
}
