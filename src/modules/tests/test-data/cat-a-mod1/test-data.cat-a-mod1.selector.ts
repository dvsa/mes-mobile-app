import { createFeatureSelector } from '@ngrx/store';
import { TestData } from '@dvsa/mes-test-schema/categories/AM1';

import { Competencies } from '../test-data.constants';

export const getTestData = createFeatureSelector<TestData>('testData');
export const getDrivingFaultCount = (
  data: TestData, competency: Competencies) => data.drivingFaults[competency];
