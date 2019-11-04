import { VehicleChecksQuestion } from '../vehicle-checks-question.model';
import { TestCategory } from '../../../shared/models/test-category';

export class QuestionProviderMock {
  getTellMeQuestions(testCategory: TestCategory): VehicleChecksQuestion[] {
    return [
      { code: 'T1', description: 'What time is it?',  shortName: 'What' },
      { code: 'T2', description: 'Where are we?', shortName: 'Where' },
    ];
  }

  getShowMeQuestions(testCategory: TestCategory): VehicleChecksQuestion[] {
    return [
      { code: 'S1', description: 'Who are we?',  shortName: 'Who' },
      { code: 'S2', description: 'Why are we here?', shortName: 'Why' },
    ];
  }
}
