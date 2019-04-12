import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';

export type ShowMeQuestion = Pick<VehicleChecks,
  | 'showMeQuestionCode'
  | 'showMeQuestionDescription'
> & { showMeQuestionShortName: string };
