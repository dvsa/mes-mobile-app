import { VehicleChecksQuestion } from '../vehicle-checks-question.model';

export class QuestionProviderMock {
  getTellMeQuestions(): VehicleChecksQuestion[] {
    return [
      { code: 'T1', description: 'What time is it?',  shortName: 'Time' },
      { code: 'T2', description: 'Where are we?', shortName: 'Where' },
    ];
  }
}
