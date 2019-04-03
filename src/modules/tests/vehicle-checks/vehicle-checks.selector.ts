import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';

export const isTellMeQuestionSelected = (state: VehicleChecks) => state.tellMeQuestionCode !== undefined;
