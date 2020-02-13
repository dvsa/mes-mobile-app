import { get } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { SafetyQuestionsScore } from '../../../shared/models/safety-questions-score.model';
import { SafetyAndBalanceQuestions, QuestionResult } from '@dvsa/mes-test-schema/categories/AM2';

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
}
