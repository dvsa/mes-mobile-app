import { get } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { SafetyQuestionsScore } from '../../../shared/models/safety-questions-score.model';
import { TestData, SafetyAndBalanceQuestions, QuestionResult } from '@dvsa/mes-test-schema/categories/AM2';

export class FaultCountAM2Helper {

  public static getRidingFaultSumCountCatAM2 = (data: TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    // const { drivingFaults, seriousFaults, dangerousFaults, safetyAndBalanceQuestions } = data;

    // const drivingFaultSumOfSimpleCompetencies = getCompetencyFaults(drivingFaults)
    //   .reduce(((res, faultSummary) => res + faultSummary.faultCount), 0);
    // Object.keys(pickBy(drivingFaults)).length;
    // const controlledStopDrivingFaults = (
    //   get(singleFaultCompetencies, 'controlledStop') === CompetencyOutcome.DF) ? 1 : 0;
    // const useOfStandDrivingFaults = (
    //   get(singleFaultCompetencies, 'useOfStand') === CompetencyOutcome.DF) ? 1 : 0;
    // const manualHandlingDrivingFaults = (
    //   get(singleFaultCompetencies, 'manualHandling') === CompetencyOutcome.DF) ? 1 : 0;
    // const slalomDrivingFaults = (
    //   get(singleFaultCompetencies, 'slalom') === CompetencyOutcome.DF) ? 1 : 0;
    // const slowControlDrivingFaults = (
    //   get(singleFaultCompetencies, 'slowControl') === CompetencyOutcome.DF) ? 1 : 0;
    // const uTurnDrivingFaults = (
    //   get(singleFaultCompetencies, 'uTurn') === CompetencyOutcome.DF) ? 1 : 0;
    // const emergencyStopRidingFaults = (
    //   get(emergencyStop, 'outcome') === CompetencyOutcome.DF) ? 1 : 0;
    // const avoidanceRidingFaults = (
    //   get(avoidance, 'outcome') === CompetencyOutcome.DF) ? 1 : 0;

    // const result =
    //   drivingFaultSumOfSimpleCompetencies +
    //   controlledStopDrivingFaults +
    //   useOfStandDrivingFaults +
    //   manualHandlingDrivingFaults +
    //   slalomDrivingFaults +
    //   slowControlDrivingFaults +
    //   uTurnDrivingFaults +
    //   emergencyStopRidingFaults +
    //   avoidanceRidingFaults;

    // return result;
    return 1;
  }

  public static getSafetyAndBalanceFaultCountCatAM2 = (
    safetyAndBalanceQuestions: SafetyAndBalanceQuestions,
    ): SafetyQuestionsScore => {

    if (!safetyAndBalanceQuestions) {
      return { drivingFaults: 0 };
    }

    const safetyQuestions: QuestionResult[] = get(safetyAndBalanceQuestions, 'safetyQuestions', []);
    const balanceQuestions: QuestionResult[] = get(safetyAndBalanceQuestions, 'balanceQuestions', []);

    const numberOfIncorrectSafetyAnswers: number = safetyQuestions.filter((safetyQuestion) => {
      return safetyQuestion.outcome === CompetencyOutcome.DF;
    }).length;
    const numberOfIncorrectBalanceAnswers: number = balanceQuestions.filter((balanceQuestion) => {
      return balanceQuestion.outcome === CompetencyOutcome.DF;
    }).length;

    const totalIncorrectAnswerCount: number = numberOfIncorrectSafetyAnswers + numberOfIncorrectBalanceAnswers;

    return {
      drivingFaults: (totalIncorrectAnswerCount >= 3) ? 1 : 0,
    };
  }
}
