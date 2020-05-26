import { CPCQuestionProvider } from '../cpc-questions';
import { configureTestSuite } from 'ng-bullet';
import { TestBed } from '@angular/core/testing';

fdescribe('CPC Question Provider', () => {
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
});
