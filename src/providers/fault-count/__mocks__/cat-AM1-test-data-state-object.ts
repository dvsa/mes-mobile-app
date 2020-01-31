import { TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';

export const catAM1TestDataStateObject: TestData = {
  useOfStand: CompetencyOutcome.D,
  manualHandling: CompetencyOutcome.D,
  slalom: CompetencyOutcome.D,
  slowControl: CompetencyOutcome.S,
  uTurn: CompetencyOutcome.D,
  controlledStop: CompetencyOutcome.S,
  // todo: Add emergency stop and avoidance
  drivingFaults: {
  },
  seriousFaults: {
    precautions: true,
  },
  dangerousFaults: {
    moveOffControl: true,
  },
  ETA: {
    physical: false,
    verbal: false,
  },
};
