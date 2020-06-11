import { NavController, NavParams, Platform, IonicPage } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { DebriefViewDidEnter, EndDebrief } from '../debrief.actions';
import { Observable, Subscription, merge } from 'rxjs';
import { getTests } from '../../../modules/tests/tests.reducer';
import { map, tap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { TranslateService } from '@ngx-translate/core';
import {
  getCommunicationPreference,
} from '../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage } from
  '../../../modules/tests/communication-preferences/communication-preferences.selector';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { configureI18N } from '../../../shared/helpers/translation.helpers';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { getCandidate } from '../../../modules/tests/journal-data/cat-c/candidate/candidate.cat-c.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTestOutcome } from '../debrief.selector';
import { Question, Question5 } from '@dvsa/mes-test-schema/categories/CPC';
import {
  getQuestion1,
  getQuestion2,
  getQuestion3, getQuestion4, getQuestion5, getTotalPercent,
} from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.selector';
import { getTestData } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.reducer';
import { TestOutcome } from '../../../shared/models/test-outcome';
import { CAT_CPC } from '../../page-names.constants';

interface DebriefPageState {
  conductedLanguage$: Observable<string>;
  candidateName$: Observable<string>;
  testResult$: Observable<string>;
  question1$: Observable<Question>;
  question2$: Observable<Question>;
  question3$: Observable<Question>;
  question4$: Observable<Question>;
  question5$: Observable<Question5>;
  overallScore$: Observable<number>;
}

@IonicPage()
@Component({
  selector: '.debrief-cat-cpc-page',
  templateUrl: 'debrief.cat-cpc.page.html',
})

export class DebriefCatCPCPage extends BasePageComponent {

  pageState: DebriefPageState;
  subscription: Subscription;
  isPassed: boolean;

  // Used for now to test displaying pass/fail/terminated messages
  public outcome: string;

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,
    private translate: TranslateService,
  ) {
    super(platform, navController, authenticationProvider);
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );
    this.pageState = {
      conductedLanguage$: currentTest$.pipe(
        select(getCommunicationPreference),
        select(getConductedLanguage),
      ),
      candidateName$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      testResult$: currentTest$.pipe(
        select(getTestOutcome),
      ),
      question1$: currentTest$.pipe(
        select(getTestData),
        select(getQuestion1),
      ),
      question2$: currentTest$.pipe(
        select(getTestData),
        select(getQuestion2),
      ),
      question3$: currentTest$.pipe(
        select(getTestData),
        select(getQuestion3),
      ),
      question4$: currentTest$.pipe(
        select(getTestData),
        select(getQuestion4),
      ),
      question5$: currentTest$.pipe(
        select(getTestData),
        select(getQuestion5),
      ),
      overallScore$: currentTest$.pipe(
        select(getTestData),
        select(getTotalPercent),
      ),
    };

    const { testResult$, conductedLanguage$ } = this.pageState;

    this.subscription = merge(
      testResult$.pipe(map(result => this.outcome = result)),
      conductedLanguage$.pipe(tap(value => configureI18N(value as Language, this.translate))),
    ).subscribe();
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new DebriefViewDidEnter());
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();

    }
  }

  endDebrief(): void {
    this.store$.dispatch(new EndDebrief());

    if (this.outcome === TestOutcome.PASS) {
      this.navController.push(CAT_CPC.PASS_FINALISATION_PAGE);
      return;
    }
    this.navController.push(CAT_CPC.POST_DEBRIEF_HOLDING_PAGE).then(() => {
      const testReportPage = this.navController.getViews().find(view => view.id === CAT_CPC.TEST_REPORT_PAGE);
      if (testReportPage) {
        this.navController.removeView(testReportPage);
      }
      const debriefPage = this.navController.getViews().find(view => view.id === CAT_CPC.DEBRIEF_PAGE);
      if (debriefPage) {
        this.navController.removeView(debriefPage);
      }
    });
  }

}
