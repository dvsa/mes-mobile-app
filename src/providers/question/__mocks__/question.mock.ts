import { TellMeQuestion } from '../tell-me-question.model';

export class QuestionProviderMock {
  getTellMeQuestions(): TellMeQuestion[] {
    return [
      { tellMeQuestionCode: 'T1', tellMeQuestionDescription: 'What time is it?',  tellMeQuestionShortName: 'Time' },
      { tellMeQuestionCode: 'T2', tellMeQuestionDescription: 'Where are we?', tellMeQuestionShortName: 'Where' },
    ];
  }
}
