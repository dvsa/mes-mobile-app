import { FaultSummary } from '../../../../../shared/models/fault-marking.model';
import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

export interface DebriefCardModel {
  legalRequirements?: CatBEUniqueTypes.TestRequirements;
  manoeuvres?: string[];
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
