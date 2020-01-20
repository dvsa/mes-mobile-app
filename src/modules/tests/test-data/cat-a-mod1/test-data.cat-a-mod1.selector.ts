import { Competencies } from '../test-data.constants';
import { TestData } from '@dvsa/mes-test-schema/categories/AM1';

export const getDrivingFaultCount = (
  data: TestData, competency: Competencies) => data.drivingFaults[competency];
