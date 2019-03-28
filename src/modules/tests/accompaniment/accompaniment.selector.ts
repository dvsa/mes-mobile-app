import { Accompaniment } from '@dvsa/mes-test-schema/categories/B';

export const getInstructorAccompaniment = (accompaniment: Accompaniment) => accompaniment.ADI;
export const getSupervisorAccompaniment = (accompaniment: Accompaniment) => accompaniment.supervisor;
export const getOtherAccompaniment = (accompaniment: Accompaniment) => accompaniment.other;
