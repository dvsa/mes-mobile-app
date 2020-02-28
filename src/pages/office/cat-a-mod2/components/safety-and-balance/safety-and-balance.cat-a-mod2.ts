import { Component, OnInit } from '@angular/core';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.reducer';
import {
  getSafetyAndBalanceQuestions,
} from '../../../../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.selector';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { map } from 'rxjs/operators';

@Component({
  selector: 'safety-and-balance-cat-a-mod2',
  templateUrl: 'safety-and-balance.cat-a-mod2.html',
})
export class SafetyAndBalanceCardCatAMod2Component implements OnInit {
  safetyAndBalanceQuestions$: Observable<QuestionResult[]>;

  constructor(private store$: Store<StoreModel>) { }

  ngOnInit(): void {
    this.safetyAndBalanceQuestions$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getSafetyAndBalanceQuestions),
      map(questions => [...questions.safetyQuestions, ...questions.balanceQuestions]),
      map(checks => checks.filter(c => c.code !== undefined)),
    );
  }

  questionHasFault = (result: QuestionResult): boolean => result.outcome !== CompetencyOutcome.P;
}
