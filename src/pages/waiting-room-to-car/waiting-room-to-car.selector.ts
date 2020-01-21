import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';

export const displayCabLockDown = (categoryCode: CategoryCode) => categoryCode === 'C' || categoryCode === 'C+E' ;
export const displayLoadSecured =
  (categoryCode: CategoryCode) => categoryCode === 'C' ||  categoryCode === 'C+E' || categoryCode === 'C1+E' ;
