import { TestRequirements } from '@dvsa/mes-test-schema/categories/B';

export interface DebriefCardModel {
  legalRequirements: TestRequirements;
  manoeuvres: string[];
  controlledStop: boolean;
  ecoControl: boolean;
  ecoPlanning: boolean;
  eta: string[];
}
