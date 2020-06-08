import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Modal, ModalController } from 'ionic-angular';
import { select, Store } from '@ngrx/store';
import { Question, Question5, TestData } from '@dvsa/mes-test-schema/categories/CPC';
import { Observable, Subscription } from 'rxjs';

import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { StoreModel } from '../../../shared/models/store.model';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { getCurrentTest, getJournalData } from '../../../modules/tests/tests.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import {
  CombinationCodes,
  QuestionNumber,
} from '../../../shared/constants/cpc-questions/cpc-question-combinations.constants';
import { getTestData } from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.reducer';
import {
  getCombination,
  getQuestion1,
  getQuestion2,
  getQuestion3,
  getQuestion4,
  getQuestion5,
  getTotalPercent,
} from '../../../modules/tests/test-data/cat-cpc/test-data.cat-cpc.selector';
import {
  AnswerToggled,
  PopulateQuestionScore,
} from '../../../modules/tests/test-data/cat-cpc/questions/questions.action';
import { PopulateTestScore } from '../../../modules/tests/test-data/cat-cpc/overall-score/total-percentage.action';
import { CPCQuestionProvider } from '../../../providers/cpc-questions/cpc-questions';
import { CAT_CPC } from '../../page-names.constants';
import { ModalEvent } from '../test-report.constants';
import { CalculateTestResult, TerminateTestFromTestReport } from '../test-report.actions';
import { withLatestFrom } from 'rxjs/operators';

interface TestReportPageState {
  candidateUntitledName$: Observable<string>;
  combinationCode$: Observable<CombinationCodes>;
  question1$: Observable<Question>;
  question2$: Observable<Question>;
  question3$: Observable<Question>;
  question4$: Observable<Question>;
  question5$: Observable<Question5>;
  overallPercentage$: Observable<number>;
}

type ToggleEvent = {
  answer: {
    label: string;
    selected: boolean;
  };
  questionNumber: number;
  answerNumber: string;
  score: number;
};

@IonicPage()
@Component({
  selector: '.test-report-cat-cpc-page',
  templateUrl: 'test-report.cat-cpc.page.html',
})
export class TestReportCatCPCPage extends BasePageComponent {

  pageState: TestReportPageState;
  subscription: Subscription;
  testData: TestData;
  pageNumber: number = 1;
  modal: Modal;

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private modalController: ModalController,
    public cpcQuestionProvider: CPCQuestionProvider) {

    super(platform, navController, authenticationProvider);
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    currentTest$.pipe(
      select(getTestData),
    ).subscribe((result: TestData) => this.testData = result);

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
      overallPercentage$: currentTest$.pipe(
        select(getTestData),
        select(getTotalPercent),
      ),
    };
  }

  questionPageChanged = (pageNumber: number): void => {
    this.pageNumber = pageNumber;
  }

  populateAnswer = (event: ToggleEvent): void => {
    const { questionNumber, answerNumber, answer } = event;
    const { selected } = answer;

    // Update question answered selected value
    const questionNum: QuestionNumber = this.translateToQuestionNumberInterface(questionNumber);
    this.store$.dispatch(new AnswerToggled(selected, questionNum, answerNumber));

    // Update question score
    const question: Question | Question5 = this.testData[`question${questionNumber}`];
    const questionScore: number = this.cpcQuestionProvider.getQuestionScore(question, questionNum);
    this.store$.dispatch(new PopulateQuestionScore(questionNum, questionScore));

    // Update total score
    const totalScore: number = this.cpcQuestionProvider.getTotalQuestionScore(this.testData);
    this.store$.dispatch(new PopulateTestScore(totalScore));
  }

  private translateToQuestionNumberInterface = (questionNumber: number): QuestionNumber => {
    return new Map<number, QuestionNumber>([
      [1, QuestionNumber.ONE],
      [2, QuestionNumber.TWO],
      [3, QuestionNumber.THREE],
      [4, QuestionNumber.FOUR],
      [5, QuestionNumber.FIVE],
    ]).get(questionNumber);
  }

  onEndTestClick = (): void => {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    this.pageState.question1$.pipe(
      withLatestFrom(
        this.pageState.question2$,
        this.pageState.question3$,
        this.pageState.question4$,
        this.pageState.question5$,
      ),
    ).subscribe((questions) => {
      this.modal = this.modalController.create('CpcEndTestModal', {
        cpcQuestions: questions,
      }, options);
      this.modal.onDidDismiss(this.onModalDismiss);
      this.modal.present();
    });
  }

  onModalDismiss = (event: ModalEvent): void => {
    switch (event) {
      case ModalEvent.CONTINUE:
        this.store$.dispatch(new CalculateTestResult());
        this.navController.push(CAT_CPC.DEBRIEF_PAGE);
        break;
      case ModalEvent.TERMINATE:
        this.store$.dispatch(new TerminateTestFromTestReport());
        this.navController.push(CAT_CPC.DEBRIEF_PAGE);
        break;
    }
  }


}
