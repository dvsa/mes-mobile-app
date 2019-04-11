import { JournalData } from '@dvsa/mes-test-schema/categories/B';

export const getTestTime = (data: JournalData) => data.start || '';
