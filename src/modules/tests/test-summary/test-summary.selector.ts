
import { TestSummary } from '@dvsa/mes-test-schema/categories/B';

export const getRouteNumber = (testSummary: TestSummary): number => {
  return testSummary.routeNumber;
};

export const getCandidateDescription = (testSummary: TestSummary): string => {
  return testSummary.candidateDescription;
};

export const wasSatNavUsed = (testSummary: TestSummary): boolean => {
  return testSummary.independentDriving === 'Sat nav' || false;
};

export const wereTrafficSignsUsed = (testSummary: TestSummary): boolean => {
  console.log(JSON.stringify(testSummary));
  return testSummary.independentDriving === 'Traffic signs' || false;
};
