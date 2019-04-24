import { TestSummary, WeatherConditions } from '@dvsa/mes-test-schema/categories/B';

export const getRouteNumber = (testSummary: TestSummary): number => testSummary.routeNumber;
export const getCandidateDescription = (testSummary: TestSummary): string => testSummary.candidateDescription;
export const getAdditionalInformation = (testSummary: TestSummary): string => testSummary.additionalInformation;
export const isIdentificationLicense = (testSummary: TestSummary): boolean =>
  testSummary.identification === 'Licence';
export const isIdentificationPassport = (testSummary: TestSummary): boolean =>
  testSummary.identification === 'Passport';
export const getD255 = (testSummary: TestSummary): boolean => testSummary.D255;
export const getSatNavUsed = (testSummary: TestSummary): boolean => testSummary.independentDriving === 'Sat nav';
export const getTrafficSignsUsed = (testSummary: TestSummary): boolean =>
  testSummary.independentDriving === 'Traffic signs';
export const isDebriefWitnessed = (testSummary: TestSummary): boolean => testSummary.debriefWitnessed;
export const getWeatherConditions = (testSummary: TestSummary): WeatherConditions[] => testSummary.weatherConditions;
