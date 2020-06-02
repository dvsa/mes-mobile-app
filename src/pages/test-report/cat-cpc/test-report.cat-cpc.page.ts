import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  Modal,
} from 'ionic-angular';
import { select, Store } from '@ngrx/store';
import { Question } from '@dvsa/mes-test-schema/categories/CPC';
import { Observable, Subscription } from 'rxjs';

import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { StoreModel } from '../../../shared/models/store.model';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { CombinationCodes } from '../../../shared/constants/cpc-questions/cpc-question-combinations.constants';
import { getTestData } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.reducer';
import { getCombination, getQuestion1 } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.selector';

interface TestReportPageState {
  candidateUntitledName$: Observable<string>;
  combinationCode$: Observable<CombinationCodes>;
  question1$: Observable<Question>;
}

@IonicPage()
@Component({
  selector: '.test-report-cat-cpc-page',
  templateUrl: 'test-report.cat-cpc.page.html',
})
export class TestReportCatCPCPage extends BasePageComponent {
  pageState: TestReportPageState;
  subscription: Subscription;
  modal: Modal;

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider) {

    super(platform, navController, authenticationProvider);
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.pageState = {
      candidateUntitledName$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      combinationCode$: currentTest$.pipe(
        select(getTestData),
        select(getCombination),
      ),
      question1$: currentTest$.pipe(
        select(getTestData),
        select(getQuestion1),
      ),
    }
  }
}
