import { TestRequirements } from '@dvsa/mes-test-schema/categories/Common';
import { CommentedCompetency, MultiFaultAssignableCompetency } from '../../../../shared/models/fault-marking.model';
import { VehicleChecksQuestion } from '../../../../providers/question/vehicle-checks-question.model';

export interface DebriefCardModel {
  legalRequirements?: TestRequirements;
  manoeuvres?: string[];
  controlledStop?: boolean;
  ecoControl?: boolean;
  ecoPlanning?: boolean;
  eta?: string[];
  showMeQuestion?: VehicleChecksQuestion;
  tellMeQuestion?: VehicleChecksQuestion;
  dangerousFaults?: (CommentedCompetency & MultiFaultAssignableCompetency)[];
  seriousFaults?: (CommentedCompetency & MultiFaultAssignableCompetency)[];
  drivingFaults?: (CommentedCompetency & MultiFaultAssignableCompetency)[];
  drivingFaultCount?: number;
}
