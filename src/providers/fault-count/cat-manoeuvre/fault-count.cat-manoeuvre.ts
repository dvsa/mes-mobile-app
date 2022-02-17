import { pickBy, get, has } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { sumManoeuvreFaults } from '../../../shared/helpers/faults';

export class FaultCountManoeuvreTestHelper {

  public static getManoeuvreCountIfAny(data: any, competencyType: CompetencyOutcome): number {
    let manoeuvreCount: number = 0;
    const hasManoeuvre: boolean = has(data, 'manoeuvres');
    if (hasManoeuvre) {
      const manoeuvres = get(data, 'manoeuvres', {});
      manoeuvreCount = sumManoeuvreFaults(manoeuvres, competencyType);
    }
    return manoeuvreCount;
  }

  public static getSeriousFaultSumCountManoeuvreTest = (data: any): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { uncoupleRecouple } = data;

    const seriousFaultSumOfSimpleCompetencies =
      Object.keys(pickBy((get(data, 'seriousFaults', {})))).length;

    const uncoupleRecoupleSeriousFaults = (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.S) ? 1 : 0;

    const result = seriousFaultSumOfSimpleCompetencies
      + uncoupleRecoupleSeriousFaults
      + FaultCountManoeuvreTestHelper.getManoeuvreCountIfAny(data, CompetencyOutcome.S);

    return result;
  }

  public static getDangerousFaultSumCountManoeuvreTest = (data: any): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { uncoupleRecouple } = data;

    const dangerousFaultSumOfSimpleCompetencies =
      Object.keys(pickBy(get(data, 'dangerousFaults', {}))).length;

    const uncoupleRecoupleDangerousFaults =
      (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.D) ? 1 : 0;

    const result = dangerousFaultSumOfSimpleCompetencies
      + uncoupleRecoupleDangerousFaults
      + FaultCountManoeuvreTestHelper.getManoeuvreCountIfAny(data, CompetencyOutcome.D);

    return result;
  }

}
