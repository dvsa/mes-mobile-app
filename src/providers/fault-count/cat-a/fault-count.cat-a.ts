import { TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { pickBy } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';

export class FaultCountAHelper {

  public static getDangerousFaultSumCountCatAM1 = (data: TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { dangerousFaults, controlledStop } = data;
    console.log(`Object destructured`);
    const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
    const controlledStopDangerousFaults = (controlledStop && controlledStop === CompetencyOutcome.D) ? 1 : 0;

    const result =
      dangerousFaultSumOfSimpleCompetencies +
      controlledStopDangerousFaults;
    console.log(`Number of dangerous faults ${result}`);
    return result;
  }
}
