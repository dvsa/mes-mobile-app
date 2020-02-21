import { Component, Input, OnInit } from '@angular/core';
import { CategoryCode, QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';

@Component({
  selector: 'vehicle-checks-card',
  templateUrl: 'vehicle-checks-card.html',
})
export class VehicleChecksCardComponent implements OnInit {

  @Input()
  category: CategoryCode;

  @Input()
  tellMeShowMeQuestions: QuestionResult[];

  constructor() { }

  questionHasFault = (result: QuestionResult): boolean => result.outcome !== CompetencyOutcome.P;

  ngOnInit(): void {
    this.tellMeShowMeQuestions.forEach((value: QuestionResult, index: number, array: QuestionResult[]): void => {
      if (!value.hasOwnProperty('outcome')) {
        this.tellMeShowMeQuestions.splice(index, 1);
      }
    });
  }
}
