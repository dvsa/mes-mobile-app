import { Injectable } from '@angular/core';
import { TellMeQuestion } from './tell-me-question.model';
import { ShowMeQuestion } from './show-me-question.model';
import { default as tellMeQuestions } from './tell-me-question.constants';
import { default as showMeQuestions } from './show-me-question.constants';

@Injectable()
export class QuestionProvider {
  getTellMeQuestions(): TellMeQuestion[] {
    return tellMeQuestions;
  }
  getShowMeQuestions(): ShowMeQuestion[] {
    return showMeQuestions;
  }
}
