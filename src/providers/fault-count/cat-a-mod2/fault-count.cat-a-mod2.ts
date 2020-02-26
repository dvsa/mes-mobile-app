import { get, pickBy } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { SafetyQuestionsScore } from '../../../shared/models/safety-questions-score.model';
import { TestData, SafetyAndBalanceQuestions, QuestionResult } from '@dvsa/mes-test-schema/categories/AM2';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';

export class FaultCountAM2Helper {

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

  public static getRidingFaultSumCountCatAM2 = (data: TestData): number => {

    // The way how we store the driving faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { drivingFaults } = data;
    let faultTotal: number = 0;
    getCompetencyFaults(drivingFaults).forEach(fault => faultTotal = faultTotal + fault.faultCount);

    return faultTotal;
  }

  public static getSeriousFaultSumCountCatAM2 = (data: TestData): number => {

    const { seriousFaults, safetyAndBalanceQuestions, eyesightTest } = data;

    const seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;

    const safetyQuestionsSeriousFaults =
      safetyAndBalanceQuestions && safetyAndBalanceQuestions.safetyQuestions.filter((question) => {
        return question.outcome === CompetencyOutcome.D;
      });

    const balanceQuestionsSeriousFaults =
      safetyAndBalanceQuestions && safetyAndBalanceQuestions.balanceQuestions.filter((question) => {
        return question.outcome === CompetencyOutcome.D;
      });

    const eyesightTestSeriousFaults = (eyesightTest && eyesightTest.seriousFault) ? 1 : 0;

    const result =
      seriousFaultSumOfSimpleCompetencies +
      safetyQuestionsSeriousFaults.length +
      balanceQuestionsSeriousFaults.length +
      eyesightTestSeriousFaults;

    return result;
  }

  public static getDangerousFaultSumCountCatAM2 = (data: TestData): number => {

    const { dangerousFaults, safetyAndBalanceQuestions } = data;

    const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;

    const safetyQuestionsDangerousFaults =
      safetyAndBalanceQuestions && safetyAndBalanceQuestions.safetyQuestions.filter((question) => {
        return question.outcome === CompetencyOutcome.D;
      });

    const balanceQuestionsDangerousFaults =
      safetyAndBalanceQuestions && safetyAndBalanceQuestions.balanceQuestions.filter((question) => {
        return question.outcome === CompetencyOutcome.D;
      });

    const result =
      dangerousFaultSumOfSimpleCompetencies +
      safetyQuestionsDangerousFaults.length +
      balanceQuestionsDangerousFaults.length;

    return result;
  }
}
