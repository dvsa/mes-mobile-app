import { ActivityCode } from '@dvsa/mes-test-schema/categories/B';

export type TerminationCode = {
  code: ActivityCode,
  description: string,
};
