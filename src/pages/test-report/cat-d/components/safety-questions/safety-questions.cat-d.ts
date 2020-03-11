import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { StoreModel } from '../../../../../shared/models/store.model';
import { map } from 'rxjs/operators';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { Observable } from 'rxjs';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { TestDataByCategoryProvider } from '../../../../../providers/test-data-by-category/test-data-by-category';
import  { getSafetyQuestionsCatD,
} from '../../../../../modules/tests/test-data/cat-d/safety-questions/safety-questions.cat-d.selector';

interface ComponentState {
  safetyQuestionsDrivingFaultCount$: Observable<number>;
}

@Component({
  selector: 'safety-questions-cat-d',
  templateUrl: 'safety-questions.cat-d.html',
})
export class SafetyQuestionsCatDComponent implements OnInit {

  @Input()
  testCategory: TestCategory;

  componentState: ComponentState;

  constructor(
    private store$: Store<StoreModel>,
    public faultCountProvider: FaultCountProvider,
    private testDataByCategory: TestDataByCategoryProvider,
  ) {}

  ngOnInit(): void {

    this.componentState = {
      safetyQuestionsDrivingFaultCount$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        map(data => this.testDataByCategory.getTestDataByCategoryCode(this.testCategory)(data)),
        select(getSafetyQuestionsCatD),
        map((safetyQuestions) => {
          return this.faultCountProvider.getSafetyQuestionsFaultCount(this.testCategory, safetyQuestions).drivingFaults;
        }),
      ),
    };
  }
}
