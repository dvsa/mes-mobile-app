import { TellMeQuestion } from '../tell-me-question.model';

export class QuestionProviderMock {
  getTellMeQuestions(): TellMeQuestion[] {
    return [
      { code: 'T1', description: 'What time is it?',  shortName: 'Time' },
      { code: 'T2', description: 'Where are we?', shortName: 'Where' },
    ];
  }
}
