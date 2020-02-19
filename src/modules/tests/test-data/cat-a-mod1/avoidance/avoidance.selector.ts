import { TestData, Avoidance } from '@dvsa/mes-test-schema/categories/AM1';

export const getAvoidance = (testData: TestData): Avoidance => testData.avoidance;

export const getAvoidanceAttempted = (avoidance: Avoidance) : boolean => {
  if (avoidance.firstAttempt !== undefined || avoidance.secondAttempt !== undefined) return true;
  return false;
};
