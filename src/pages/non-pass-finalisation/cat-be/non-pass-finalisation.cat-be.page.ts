import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { CAT_BE } from '../../page-names.constants';
import { Observable } from 'rxjs';
import { getTests } from '../../../modules/tests/tests.reducer';
import {
  getCurrentTest,
  getJournalData,
  getActivityCode,
  getTestOutcome,
  isTestOutcomeSet,
  getTestOutcomeText,
} from '../../../modules/tests/tests.selector';
import { getCandidate } from '../../../modules/tests/journal-data/cat-be/candidate/candidate.cat-be.reducer';
import {
  getUntitledCandidateName,
  getCandidateDriverNumber,
  formatDriverNumber,
} from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import {
  NonPassFinalisationViewDidEnter,
  NonPassFinalisationValidationError,
} from '../non-pass-finalisation.actions';
import { map, withLatestFrom } from 'rxjs/operators';
import { getTestSummary } from '../../../modules/tests/test-summary/common/test-summary.reducer';
import { isDebriefWitnessed, getD255 } from '../../../modules/tests/test-summary/common/test-summary.selector';
import {
  getTestSlotAttributes,
} from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { isWelshTest }
  from '../../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import {
  ActivityCodeModel,
  populateActivityCodeModelList,
} from '../../office/components/activity-code/activity-code.constants';
import { FormGroup } from '@angular/forms';
import { PersistTests } from '../../../modules/tests/tests.actions';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../../office/office-behaviour-map.cat-be';
import {
  DebriefWitnessed,
  DebriefUnwitnessed,
  D255Yes,
  D255No,
} from '../../../modules/tests/test-summary/common/test-summary.actions';
import {
  CandidateChoseToProceedWithTestInWelsh,
  CandidateChoseToProceedWithTestInEnglish,
} from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { SetTestStatusWriteUp } from '../../../modules/tests/test-status/test-status.actions';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { BasePageComponent } from '../../../shared/classes/base-page';
// import { ExaminerRole } from '../../../providers/app-config/constants/examiner-role.constants';
import { AppConfigProvider } from '../../../providers/app-config/app-config';

interface NonPassFinalisationPageState {
  candidateName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  isTestOutcomeSet$: Observable<boolean>;
  testOutcome$: Observable<string>;
  testOutcomeText$: Observable<string>;
  activityCode$: Observable<ActivityCodeModel>;
  displayDebriefWitnessed$: Observable<boolean>;
  debriefWitnessed$: Observable<boolean>;
  displayD255$: Observable<boolean>;
  d255$: Observable<boolean>;
  isWelshTest$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: '.non-pass-finalisation-cat-be-page',
  templateUrl: 'non-pass-finalisation.cat-be.page.html',
})
export class NonPassFinalisationCatBEPage extends BasePageComponent implements OnInit {

  pageState: NonPassFinalisationPageState;
  form: FormGroup;
  activityCodeOptions: ActivityCodeModel[];
  slotId: string;

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private outcomeBehaviourProvider: OutcomeBehaviourMapProvider,
    public appConfig: AppConfigProvider,
  ) {
    super(platform, navController, authenticationProvider);
    this.form = new FormGroup({});
    this.activityCodeOptions = populateActivityCodeModelList(true);
    this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
  }

  ngOnInit() {
    this.store$.pipe(
      select(getTests),
      map(tests => tests.currentTest.slotId),
    ).subscribe(slotId => this.slotId = slotId);

    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );
    this.pageState = {
      candidateName$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      candidateDriverNumber$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getCandidateDriverNumber),
        map(formatDriverNumber),
      ),
      isTestOutcomeSet$: currentTest$.pipe(
        select(isTestOutcomeSet),
      ),
      testOutcome$: currentTest$.pipe(
        select(getTestOutcome),
      ),
      testOutcomeText$: currentTest$.pipe(
        select(getTestOutcomeText),
      ),
      activityCode$: currentTest$.pipe(
        select(getActivityCode),
      ),
      displayDebriefWitnessed$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(isDebriefWitnessed))),
        map(([outcome, debrief]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'debriefWitnessed', debrief)),
      ),
      debriefWitnessed$: currentTest$.pipe(
        select(getTestSummary),
        select(isDebriefWitnessed),
      ),
      displayD255$: currentTest$.pipe(
        select(getTestOutcome),
        withLatestFrom(currentTest$.pipe(
          select(getTestSummary),
          select(getD255))),
        map(([outcome, d255]) =>
          this.outcomeBehaviourProvider.isVisible(outcome, 'd255', d255)),
      ),
      d255$: currentTest$.pipe(
        select(getTestSummary),
        select(getD255),
      ),
      isWelshTest$: currentTest$.pipe(
        select(getJournalData),
        select(getTestSlotAttributes),
        select(isWelshTest),
      ),
    };
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new NonPassFinalisationViewDidEnter());
  }

  continue() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.store$.dispatch(new SetTestStatusWriteUp(this.slotId));
      this.store$.dispatch(new PersistTests());
      this.navController.push(CAT_BE.BACK_TO_OFFICE_PAGE);
      return;
    }
    Object.keys(this.form.controls).forEach((controlName) => {
      if (this.form.controls[controlName].invalid) {
        this.store$.dispatch(new NonPassFinalisationValidationError(`${controlName} is blank`));
      }
    });
  }

  activityCodeChanged(activityCodeModel: ActivityCodeModel) {
    this.store$.dispatch(new SetActivityCode(activityCodeModel.activityCode));
  }

  debriefWitnessedChanged(debriefWitnessed: boolean) {
    this.store$.dispatch(debriefWitnessed ? new DebriefWitnessed() : new DebriefUnwitnessed());
  }

  d255Changed(d255: boolean): void {
    this.store$.dispatch(d255 ? new D255Yes() : new D255No());
  }

  isWelshChanged(isWelsh: boolean) {
    this.store$.dispatch(
      isWelsh ?
        new CandidateChoseToProceedWithTestInWelsh('Cymraeg')
        : new CandidateChoseToProceedWithTestInEnglish('English'),
    );
  }
}
