import { TestCentre } from '@dvsa/mes-test-schema/categories/B';

export const getCosstCentre = (testCentre: TestCentre) => testCentre.costCode || '';
