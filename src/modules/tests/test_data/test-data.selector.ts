import { TestData } from '@dvsa/mes-test-schema/categories/B';
import { Competencies } from './test-data.constants';

export const getDrivingFaultCount = (data: TestData, competency: Competencies) => data.drivingFaults[competency];
