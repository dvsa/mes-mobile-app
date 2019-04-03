import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';

export const isTellMeQuestionSelected = (state: VehicleChecks) => state.tellMeQuestionCode !== undefined;
export const isTellMeQuestionCorrect = (state: VehicleChecks) => state.tellMeQuestionOutcome === 'P';
export const isTellMeQuestionDrivingFault = (state: VehicleChecks) => state.tellMeQuestionOutcome === 'DF';
