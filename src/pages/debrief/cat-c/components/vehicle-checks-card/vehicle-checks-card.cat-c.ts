import { Component, OnInit } from '@angular/core';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-c/test-data.cat-c.reducer';
import { getVehicleChecks } from '../../../../../modules/tests/test-data/cat-c/test-data.cat-c.selector';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { map } from 'rxjs/operators';

@Component({
  selector: 'vehicle-checks-card-cat-c',
  templateUrl: 'vehicle-checks-card.cat-c.html',
})
export class VehicleChecksCardCatCComponent implements OnInit {

  tellMeShowMeQuestions$: Observable<QuestionResult[]>;
  constructor(private store$: Store<StoreModel>) { }

  ngOnInit(): void {
    this.tellMeShowMeQuestions$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getVehicleChecks),
      map(checks => [...checks.tellMeQuestions, ...checks.showMeQuestions]),
      map(checks => checks.filter(c => c.code !== undefined)),
    );
  }

  questionHasFault = (result: QuestionResult): boolean => result.outcome !== CompetencyOutcome.P;
}
