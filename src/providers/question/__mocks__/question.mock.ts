import { VehicleChecksQuestion } from '../vehicle-checks-question.model';
import { TestCategory } from '../../../shared/models/test-category';

export class QuestionProviderMock {
  getTellMeQuestions(testCategory: TestCategory): VehicleChecksQuestion[] {
    return [
      { code: 'T1', description: 'What time is it?',  shortName: 'Time' },
      { code: 'T2', description: 'Where are we?', shortName: 'Where' },
    ];
  }
}
