import { TestSummary } from '@dvsa/mes-test-schema/categories/B';

export const getRouteNumber = (testSummary: TestSummary): number => testSummary.routeNumber;
export const getCandidateDescription = (testSummary: TestSummary): string => testSummary.candidateDescription;
export const getAdditionalInformation = (testSummary: TestSummary): string => testSummary.additionalInformation;

export const isIdentificationLicense = (testSummary: TestSummary): boolean =>
  testSummary.identification === 'Licence';
export const isIdentificationPassport = (testSummary: TestSummary): boolean =>
  testSummary.identification === 'Passport';
export const isD255Yes = (testSummary: TestSummary): boolean => testSummary.D255;
export const isD255No = (testSummary: TestSummary): boolean => {
  return (testSummary.D255 !== null && !testSummary.D255) || false;
};
export const getSatNavUsed = (testSummary: TestSummary): boolean => testSummary.independentDriving === 'Sat nav';
export const getTrafficSignsUsed = (testSummary: TestSummary): boolean =>
  testSummary.independentDriving === 'Traffic signs';
export const isDebriefWitnessed = (testSummary: TestSummary): boolean => testSummary.debriefWitnessed;
export const isDebriefUnwitnessed = (testSummary: TestSummary): boolean => {

  return (testSummary.debriefWitnessed != null && !testSummary.debriefWitnessed) || false;
};
