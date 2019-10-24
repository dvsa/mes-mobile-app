import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { ShowMeQuestion } from '../../../../providers/question/show-me-question.model';
import { TellMeQuestion } from '../../../../providers/question/tell-me-question.model';
import { CommentedCompetency, MultiFaultAssignableCompetency } from '../../../../shared/models/fault-marking.model';

export interface DebriefCardModel {
  legalRequirements?: CatBUniqueTypes.TestRequirements;
  manoeuvres?: string[];
  controlledStop?: boolean;
  ecoControl?: boolean;
  ecoPlanning?: boolean;
  eta?: string[];
  showMeQuestion?: ShowMeQuestion;
  tellMeQuestion?: TellMeQuestion;
  dangerousFaults?: (CommentedCompetency & MultiFaultAssignableCompetency)[];
  seriousFaults?: (CommentedCompetency & MultiFaultAssignableCompetency)[];
  drivingFaults?: (CommentedCompetency & MultiFaultAssignableCompetency)[];
  drivingFaultCount?: number;
}
