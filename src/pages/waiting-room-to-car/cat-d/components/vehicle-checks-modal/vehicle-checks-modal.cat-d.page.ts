import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../../../../modules/tests/tests.selector';
import { getCandidate } from '../../../../../modules/tests/journal-data/cat-d/candidate/candidate.cat-d.reducer';
import { getUntitledCandidateName }
  from '../../../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { Observable, merge, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../../../providers/question/question';
import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';
import { SafetyQuestion } from '../../../../../providers/question/safety-question.model';
import { QuestionResult, QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

import { getTestData } from '../../../../../modules/tests/test-data/cat-d/test-data.cat-d.reducer';

import {
  ShowMeQuestionSelected,
  ShowMeQuestionOutcomeChanged,
  TellMeQuestionSelected,
  TellMeQuestionOutcomeChanged,
} from '../../../../../modules/tests/test-data/cat-d/vehicle-checks/vehicle-checks.cat-d.action';

import {
  NUMBER_OF_TELL_ME_QUESTIONS as NUMBER_OF_TELL_ME_QUESTIONS_NON_TRAILER,
} from '../../../../../shared/constants/tell-me-questions/tell-me-questions.vocational.constants';

import {
  NUMBER_OF_SHOW_ME_QUESTIONS as NUMBER_OF_SHOW_ME_QUESTIONS_NON_TRAILER,
} from '../../../../../shared/constants/show-me-questions/show-me-questions.vocational.constants';

import {
  NUMBER_OF_TELL_ME_QUESTIONS as NUMBER_OF_TELL_ME_QUESTIONS_TRAILER,
} from '../../../../../shared/constants/tell-me-questions/tell-me-questions.vocational-trailer.constants';

import {
  NUMBER_OF_SHOW_ME_QUESTIONS as NUMBER_OF_SHOW_ME_QUESTIONS_TRAILER,
} from '../../../../../shared/constants/show-me-questions/show-me-questions.vocational-trailer.constants';

import {
  NUMBER_OF_SAFETY_QUESTIONS,
} from '../../../../../shared/constants/safety-questions.cat-d.constants';

import { VehicleChecksScore } from '../../../../../shared/models/vehicle-checks-score.model';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { map } from 'rxjs/operators';
import * as vehicleChecksModalActions from './vehicle-checks-modal.cat-d.actions';
import {
  getVehicleChecksCatD,
  getSelectedShowMeQuestions,
  getSelectedTellMeQuestions,
} from '../../../../../modules/tests/test-data/cat-d/vehicle-checks/vehicle-checks.cat-d.selector';

interface VehicleChecksModalCatDState {
  candidateName$: Observable<string>;
  showMeQuestions$: Observable<QuestionResult[]>;
  tellMeQuestions$: Observable<QuestionResult[]>;
  vehicleChecksScore$: Observable<VehicleChecksScore>;
}

@IonicPage()
@Component({
  selector: 'vehicle-checks-modal-cat-d',
  templateUrl: 'vehicle-checks-modal.cat-d.page.html',
})
export class VehicleChecksCatDModal {
  pageState: VehicleChecksModalCatDState;
  formGroup: FormGroup;

  showMeQuestions: VehicleChecksQuestion[];
  tellMeQuestions: VehicleChecksQuestion[];
  safetyQuestions: SafetyQuestion[];

  category : TestCategory;

  showMeQuestionsNumberArray: number[];
  tellMeQuestionsNumberArray: number[];
  safetyQuestionsNumberArray: number[];

  vehicleChecksScore: VehicleChecksScore;

  subscription: Subscription;

  constructor(
    public store$: Store<StoreModel>,
    private navController: NavController,
    private faultCountProvider: FaultCountProvider,
    questionProvider: QuestionProvider,
    params: NavParams,
  ) {
    this.category = params.get('category');
    this.setNumberOfShowMeTellMeQuestions();
    this.safetyQuestionsNumberArray = Array(NUMBER_OF_SAFETY_QUESTIONS);
    this.formGroup = new FormGroup({});

    this.showMeQuestions = questionProvider.getShowMeQuestions(this.category);
    this.tellMeQuestions = questionProvider.getTellMeQuestions(this.category);
    this.safetyQuestions = questionProvider.getVocationalSafetyQuestions(this.category);
  }

  setNumberOfShowMeTellMeQuestions() {
    let numberOfShowMeQuestions: number;
    let numberOfTellMeQuestions: number;

    switch (this.category) {
      case TestCategory.D:
      case TestCategory.D1:
        numberOfShowMeQuestions = NUMBER_OF_SHOW_ME_QUESTIONS_NON_TRAILER;
        numberOfTellMeQuestions = NUMBER_OF_TELL_ME_QUESTIONS_NON_TRAILER;
        break;
      case TestCategory.DE:
      case TestCategory.D1E:
        numberOfShowMeQuestions = NUMBER_OF_SHOW_ME_QUESTIONS_TRAILER;
        numberOfTellMeQuestions = NUMBER_OF_TELL_ME_QUESTIONS_TRAILER;
    }
    this.showMeQuestionsNumberArray = Array(numberOfShowMeQuestions);
    this.tellMeQuestionsNumberArray = Array(numberOfTellMeQuestions);
  }

  ngOnInit(): void {
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
      showMeQuestions$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatD),
        select(getSelectedShowMeQuestions),
      ),
      tellMeQuestions$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatD),
        select(getSelectedTellMeQuestions),
      ),
      vehicleChecksScore$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatD),
        map((vehicleChecks) => {
          return this.faultCountProvider.getVehicleChecksFaultCount(this.category, vehicleChecks);
        }),
      ),
    };

    const { vehicleChecksScore$ } = this.pageState;

    const merged$ = merge(
      vehicleChecksScore$.pipe(map(score => (this.vehicleChecksScore = score))),
    );

    this.subscription = merged$.subscribe();
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    this.navController.pop();
  }

  ionViewDidEnter() {
    this.store$.dispatch(
      new vehicleChecksModalActions.VehicleChecksViewDidEnter(),
    );
  }

  showMeQuestionChanged(result: QuestionResult, index: number): void {
    this.store$.dispatch(new ShowMeQuestionSelected(result, index));
  }

  showMeQuestionOutcomeChanged(result: QuestionOutcome, index: number): void {
    this.store$.dispatch(new ShowMeQuestionOutcomeChanged(result, index));
  }

  tellMeQuestionChanged(result: QuestionResult, index: number): void {
    this.store$.dispatch(new TellMeQuestionSelected(result, index));
  }

  tellMeQuestionOutcomeChanged(result: QuestionOutcome, index: number): void {
    this.store$.dispatch(new TellMeQuestionOutcomeChanged(result, index));
  }

  isNonTrailerBanner(): boolean {
    return (
      this.vehicleChecksScore.drivingFaults === 4 &&
      this.vehicleChecksScore.seriousFaults === 1 &&
      (this.category === TestCategory.D || this.category === TestCategory.D1)
    );
  }

  isTrailerBanner(): boolean {
    return (
      this.vehicleChecksScore.drivingFaults === 1 &&
      this.vehicleChecksScore.seriousFaults === 1 &&
      (this.category === TestCategory.DE || this.category === TestCategory.D1E)
    );
  }

  shouldDisplayBanner = (): boolean => {
    return this.isTrailerBanner() || this.isNonTrailerBanner();
  }
}
