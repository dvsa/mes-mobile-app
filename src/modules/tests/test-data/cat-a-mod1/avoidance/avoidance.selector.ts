import { TestData, Avoidance } from '@dvsa/mes-test-schema/categories/AM1';

export const getAvoidance = (testData: TestData): Avoidance => testData.avoidance;
