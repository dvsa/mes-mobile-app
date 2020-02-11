
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { TestData } from '@dvsa/mes-test-schema/categories/AM1';

export const catAM1TestDataStateObject: TestData = {
  singleFaultCompetencies: {
    useOfStand: CompetencyOutcome.DF,
    manualHandling: CompetencyOutcome.DF,
    slalom: CompetencyOutcome.D,
    slowControl: CompetencyOutcome.S,
    uTurn: CompetencyOutcome.D,
    controlledStop: CompetencyOutcome.S,
  },
  emergencyStop: {
    outcome: CompetencyOutcome.DF,
  },
  avoidance: {
    outcome: CompetencyOutcome.DF,
  },
  drivingFaults: {
    precautions: 2,
    moveOffSafety: 1,
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
