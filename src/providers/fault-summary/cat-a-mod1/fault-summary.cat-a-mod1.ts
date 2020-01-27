import { FaultSummary } from '../../../shared/models/fault-marking.model';
import { TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { getCompetencyFaults } from '../../../shared/helpers/competency';

export class FaultSummaryCatAM1Helper {

  public static getDrivingFaultsCatAM1(data: TestData): FaultSummary[] {
    return [
      ...getCompetencyFaults(data.drivingFaults),
    ];
  }

  public static getSeriousFaultsCatAM1(data: TestData): FaultSummary[] {
    return [
      ...getCompetencyFaults(data.seriousFaults),
    ];
  }

  public static getDangerousFaultsCatAM1(data: TestData): FaultSummary[] {
    return [
      ...getCompetencyFaults(data.dangerousFaults),
    ];
  }
}
