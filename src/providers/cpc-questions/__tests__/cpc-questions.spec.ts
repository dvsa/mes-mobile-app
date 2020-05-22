import { CPCQuestionProvider } from '../cpc-questions';
import { configureTestSuite } from 'ng-bullet';
import { TestBed } from '@angular/core/testing';

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
  describe('getQuestionsByCombinationCode', () => {
    it('should return 4 questions for given lgv combination code', () => {
      const questions = cpcQuestionProvider.getQuestionsByCombinationCode('LGV1');
      expect(questions.length).toEqual(4);
    });
    it('should return 4 questions for given pcv combination code', () => {
      const questions = cpcQuestionProvider.getQuestionsByCombinationCode('PCV8');
      expect(questions.length).toEqual(4);
    });
  });
});
