import { Injectable } from '@angular/core';
import { default as tellMeQuestions } from './tell-me-question.constants';
import { default as showMeQuestions } from './show-me-question.constants';
import { VehicleChecksQuestion } from './vehicle-checks-question.model';

@Injectable()
export class QuestionProvider {
  getTellMeQuestions(): VehicleChecksQuestion[] {
    return tellMeQuestions;
  }
  getShowMeQuestions(): VehicleChecksQuestion[] {
    return showMeQuestions;
  }
}
