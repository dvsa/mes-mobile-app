import { TestCentre } from '@dvsa/mes-test-schema/categories/B';

export const getCostCentre = (testCentre: TestCentre) => testCentre.costCode || '';
