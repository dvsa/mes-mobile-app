import { TestBed } from '@angular/core/testing';
import { QuestionProvider } from '../question';
import { TestCategory } from '../../../shared/models/test-category';

import tellMeQuestionsCatBConstants
  from '../../../shared/constants/tell-me-questions/tell-me-questions.cat-b.constants';
import showMeQuestionsCatBConstants
  from '../../../shared/constants/show-me-questions/show-me-questions.cat-b.constants';
// tslint:disable-next-line: import-name
import tellMeQuestionsCatBEConstants
  from '../../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';
// tslint:disable-next-line: import-name
import showMeQuestionsCatBEConstants
  from '../../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';
import {
  getCatBeVehicleChecks4Faults,
  generateVehicleChecksScoring,
  getCatBeVehicleChecks5Faults,
  getCatBeVehicleChecksNoFaults,
} from '../__mocks__/question.mock';

describe('question provider', () => {

  let questionProvider: QuestionProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuestionProvider,
      ],
    });
    questionProvider = TestBed.get(QuestionProvider);
  });

  describe('getTellMeQuestions', () => {
    it('should return the correct questions for a category B test', () => {
      expect(questionProvider.getTellMeQuestions(TestCategory.B)).toEqual(tellMeQuestionsCatBConstants);
    });
    it('should return the correct questions for a category B+E test', () => {
      expect(questionProvider.getTellMeQuestions(TestCategory.BE)).toEqual(tellMeQuestionsCatBEConstants);
    });
    it('should return no questions for a non-supported category', () => {
      expect(questionProvider.getTellMeQuestions(TestCategory.B1)).toEqual([]);
    });
  });

  describe('getShowMeQuestions', () => {
    it('should return the correct questions for a category B test', () => {
      expect(questionProvider.getShowMeQuestions(TestCategory.B)).toEqual(showMeQuestionsCatBConstants);
    });
    it('should return the correct questions for a category B+E test', () => {
      expect(questionProvider.getShowMeQuestions(TestCategory.BE)).toEqual(showMeQuestionsCatBEConstants);
    });
    it('should return no questions for a non-supported category', () => {
      expect(questionProvider.getShowMeQuestions(TestCategory.B1)).toEqual([]);
    });
  });

  describe('calculateFaults', () => {
    it('should return 4 dangerous faults if only 4 are failed', () => {
      expect(questionProvider.calculateFaults(getCatBeVehicleChecks4Faults()))
        .toEqual(generateVehicleChecksScoring(4, 0));
    });
    it('should return 4 dangerous faults and 1 serious if only 5 are failed', () => {
      expect(questionProvider.calculateFaults(getCatBeVehicleChecks5Faults()))
        .toEqual(generateVehicleChecksScoring(4, 1));
    });
    it('should return 0 dangerous faults if all passed', () => {
      expect(questionProvider.calculateFaults(getCatBeVehicleChecksNoFaults()))
        .toEqual(generateVehicleChecksScoring(0, 0));
    });
  });
});
