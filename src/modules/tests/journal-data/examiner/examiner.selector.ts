import { Examiner } from '@dvsa/mes-test-schema/categories/Common';

export const getStaffNumber = (examiner: Examiner) => examiner.staffNumber || '';
