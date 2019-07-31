import { Examiner } from '@dvsa/mes-test-schema/categories/B';

export const getStaffNumber = (examiner: Examiner) => examiner.staffNumber || '';
