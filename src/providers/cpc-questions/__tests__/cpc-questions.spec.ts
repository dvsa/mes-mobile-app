import { CPCQuestionProvider } from '../cpc-questions';
import { configureTestSuite } from 'ng-bullet';
import { TestBed } from '@angular/core/testing';
import { lgvQuestion5 } from '../../../shared/constants/cpc-questions/cpc-lgv-questions.constants';
import { pcvQuestion5 } from '../../../shared/constants/cpc-questions/cpc-pcv-questions.constants';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { Combination } from '../../../shared/constants/cpc-questions/cpc-question-combinations.constants';

describe('CPC Question Provider', () => {
  let cpcQuestionProvider: CPCQuestionProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        CPCQuestionProvider,
      ],
    });
  });

  beforeEach(() => {
    cpcQuestionProvider = TestBed.get(CPCQuestionProvider);
  });
  describe('getQuestionsBank', () => {
    it('should return 4 questions for given lgv combination code', () => {
      const questions = cpcQuestionProvider.getQuestionsBank('LGV1');
      expect(questions.length).toEqual(4);
    });
    it('should return 4 questions for given pcv combination code', () => {
      const questions = cpcQuestionProvider.getQuestionsBank('PCV8');
      expect(questions.length).toEqual(4);
    });
  });

  describe('getQuestion5ByVehicleType', () => {
    it('should return the question 5 for the LGV', () => {
      const question5 = cpcQuestionProvider.getQuestion5ByVehicleType('LGV1');
      expect(question5).toEqual(lgvQuestion5);
    });
    it('should return the question 5 for the PSV', () => {
      const question5 = cpcQuestionProvider.getQuestion5ByVehicleType('PCV8');
      expect(question5).toEqual(pcvQuestion5);
    });
  });

  describe('getCombinations', () => {
    it('should return a list of only LGV codes for CCPC', () => {
      const combinations = cpcQuestionProvider.getCombinations(TestCategory.CCPC);
      const allCodesLGV = combinations
        .every((combination: Combination) => combination.code.indexOf('LGV') > -1);
      const shortCodes = combinations.map((combinations: Combination) => combinations.code);
      expect(allCodesLGV).toBe(true);
      expect(shortCodes).toEqual(['LGV1', 'LGV2', 'LGV3', 'LGV4', 'LGV5', 'LGV6', 'LGV7', 'LGV8']);
    });
    it('should return a list of only PCV codes for DCPC', () => {
      const combinations = cpcQuestionProvider.getCombinations(TestCategory.DCPC);
      const allCodesPCV = combinations
        .every((combination: Combination) => combination.code.indexOf('PCV') > -1);
      const shortCodes = combinations.map((combinations: Combination) => combinations.code);
      expect(allCodesPCV).toBe(true);
      expect(shortCodes).toEqual(['PCV1', 'PCV2', 'PCV3', 'PCV4', 'PCV5', 'PCV6', 'PCV7', 'PCV8']);
    });
  });
});
