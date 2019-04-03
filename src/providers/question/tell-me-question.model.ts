import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';

export type TellMeQuestion = Pick<VehicleChecks,
  | 'tellMeQuestionCode'
  | 'tellMeQuestionDescription'
> & { tellMeQuestionShortName: string };
