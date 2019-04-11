import { TestSummary } from '@dvsa/mes-test-schema/categories/B';

export const getRouteNumber = (testSummary: TestSummary): number => testSummary.routeNumber;
export const getCandidateDescription = (testSummary: TestSummary): string => testSummary.candidateDescription;
export const getAdditionalInformation = (testSummary: TestSummary): string => testSummary.additionalInformation;
export const wasIdentificationLicense = (testSummary: TestSummary): boolean => {
  return testSummary.identification === 'Licence' || false;
};
export const wasIdentificationPassport = (testSummary: TestSummary): boolean => {
  return testSummary.identification === 'Passport' || false;
};
export const wasD255Yes = (testSummary: TestSummary): boolean => {
  return testSummary.D255 || false;
};
export const wasD255No = (testSummary: TestSummary): boolean => {
  return (testSummary.D255 !== null && !testSummary.D255) || false;
};
export const wasSatNavUsed = (testSummary: TestSummary): boolean => {
  return testSummary.independentDriving === 'Sat nav' || false;
};
export const wereTrafficSignsUsed = (testSummary: TestSummary): boolean => {
  return testSummary.independentDriving === 'Traffic signs' || false;
};
export const debriefWasWitnessed = (testSummary: TestSummary): boolean => {
  return (testSummary.debriefWitnessed) || false;
};
export const debriefWasUnwitnessed = (testSummary: TestSummary): boolean => {
  return (testSummary.debriefWitnessed != null && !testSummary.debriefWitnessed) || false;
};
