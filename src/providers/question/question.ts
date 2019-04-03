import { Injectable } from '@angular/core';
import { TellMeQuestion } from './tell-me-question.model';
import { default as tellMeQuestions } from './tell-me-question.constants';

@Injectable()
export class QuestionProvider {
  getTellMeQuestions(): TellMeQuestion[] {
    return tellMeQuestions;
  }
}
