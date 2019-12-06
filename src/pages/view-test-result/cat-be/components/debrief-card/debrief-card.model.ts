import { FaultSummary } from '../../../../../shared/models/fault-marking.model';
import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';

export interface DebriefCardModel {
  legalRequirements?: CatBUniqueTypes.TestRequirements;
  manoeuvres?: string[];
  controlledStop?: boolean;
  ecoControl?: boolean;
  ecoPlanning?: boolean;
  eta?: string[];
  showMeQuestion?: VehicleChecksQuestion;
  tellMeQuestion?: VehicleChecksQuestion;
  dangerousFaults?: FaultSummary[];
  seriousFaults?: FaultSummary[];
  drivingFaults?: FaultSummary[];
  drivingFaultCount?: number;
}
