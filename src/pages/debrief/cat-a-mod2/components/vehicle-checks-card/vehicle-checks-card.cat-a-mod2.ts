import { Component, OnInit } from '@angular/core';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';

// TODO - PREP-AMOD2 - Implement category specific reducer
import { getTestData } from '../../../../../modules/tests/test-data/cat-be/test-data.cat-be.reducer';

// TODO - PREP-AMOD2 - Implement category specific selector
import { getVehicleChecks } from '../../../../../modules/tests/test-data/cat-be/test-data.cat-be.selector';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { map } from 'rxjs/operators';

@Component({
  selector: 'vehicle-checks-card-cat-a-mod2',
  templateUrl: 'vehicle-checks-card.cat-a-mod2.html',
})
export class VehicleChecksCardCatAMod2Component implements OnInit {

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
