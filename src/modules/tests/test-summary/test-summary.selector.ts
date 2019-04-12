import { TestSummary } from '@dvsa/mes-test-schema/categories/B';

export const getRouteNumber = (testSummary: TestSummary): number => testSummary.routeNumber;
export const getCandidateDescription = (testSummary: TestSummary): string => testSummary.candidateDescription;
export const getAdditionalInformation = (testSummary: TestSummary): string => testSummary.additionalInformation;
export const isIdentificationLicense = (testSummary: TestSummary): boolean => {
  return testSummary.identification === 'Licence' || false;
};
export const isIdentificationPassport = (testSummary: TestSummary): boolean => {
  return testSummary.identification === 'Passport' || false;
};
export const isD255Yes = (testSummary: TestSummary): boolean => {
  return testSummary.D255 || false;
};
export const isD255No = (testSummary: TestSummary): boolean => {
  return (testSummary.D255 !== null && !testSummary.D255) || false;
};
export const getSatNavUsed = (testSummary: TestSummary): boolean => {
  return testSummary.independentDriving === 'Sat nav' || false;
};
export const getTrafficSignsUsed = (testSummary: TestSummary): boolean => {
  return testSummary.independentDriving === 'Traffic signs' || false;
};
export const isDebriefWitnessed = (testSummary: TestSummary): boolean => {
  return (testSummary.debriefWitnessed) || false;
};
export const isDebriefUnwitnessed = (testSummary: TestSummary): boolean => {
  return (testSummary.debriefWitnessed != null && !testSummary.debriefWitnessed) || false;
};
