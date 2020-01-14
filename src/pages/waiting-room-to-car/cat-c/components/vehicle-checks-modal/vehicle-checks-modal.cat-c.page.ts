import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../../../../modules/tests/tests.selector';
import { getCandidate } from '../../../../../modules/tests/journal-data/cat-c/candidate/candidate.cat-c.reducer';
import { getUntitledCandidateName }
  from '../../../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { QuestionProvider } from '../../../../../providers/question/question';
import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';
import { QuestionResult, QuestionOutcome } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

import { getTestData } from '../../../../../modules/tests/test-data/cat-c/test-data.cat-c.reducer';

import {
  ShowMeQuestionSelected,
  ShowMeQuestionOutcomeChanged,
  TellMeQuestionSelected,
  TellMeQuestionOutcomeChanged,
} from '../../../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.action';

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

import { VehicleChecksScore } from '../../../../../shared/models/vehicle-checks-score.model';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';
import * as vehicleChecksModalActions from './vehicle-checks-modal.cat-c.actions';
import {
  getVehicleChecksCatC,
  getSelectedShowMeQuestions,
  getSelectedTellMeQuestions,
} from '../../../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.selector';

interface VehicleChecksModalCatCState {
  candidateName$: Observable<string>;
  showMeQuestions$: Observable<QuestionResult[]>;
  tellMeQuestions$: Observable<QuestionResult[]>;
  vehicleChecksScore$: Observable<VehicleChecksScore>;
}

@IonicPage()
@Component({
  selector: 'vehicle-checks-modal-cat-c',
  templateUrl: 'vehicle-checks-modal.cat-c.page.html',
})
export class VehicleChecksCatCModal {
  pageState: VehicleChecksModalCatCState;
  formGroup: FormGroup;

  showMeQuestions: VehicleChecksQuestion[];
  tellMeQuestions: VehicleChecksQuestion[];

  category : TestCategory;

  showMeQuestionsNumberArray: number[];
  tellMeQuestionsNumberArray: number[];

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
    this.formGroup = new FormGroup({});

    this.showMeQuestions = questionProvider.getShowMeQuestions(this.category);
    this.tellMeQuestions = questionProvider.getTellMeQuestions(this.category);
  }

  setNumberOfShowMeTellMeQuestions() {
    let numberOfShowMeQuestions: number;
    let numberOfTellMeQuestions: number;

    switch (this.category as TestCategory) {
      case TestCategory.C || TestCategory.C1: {
        numberOfShowMeQuestions = NUMBER_OF_SHOW_ME_QUESTIONS_NON_TRAILER;
        numberOfTellMeQuestions = NUMBER_OF_TELL_ME_QUESTIONS_NON_TRAILER;
        break;
      }
      case TestCategory.CE || TestCategory.C1E: {
        numberOfShowMeQuestions = NUMBER_OF_SHOW_ME_QUESTIONS_TRAILER;
        numberOfTellMeQuestions = NUMBER_OF_TELL_ME_QUESTIONS_TRAILER;
        break;
      }
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
        select(getVehicleChecksCatC),
        select(getSelectedShowMeQuestions),
      ),
      tellMeQuestions$: currentTest$.pipe(
        select(getTestData),
        select(getVehicleChecksCatC),
        select(getSelectedTellMeQuestions),
      ),
      vehicleChecksScore$: currentTest$.pipe(
        select(getTestData),

        select(getVehicleChecksCatC),
        map((vehicleChecks) => {
          return this.faultCountProvider.getVehicleChecksFaultCount(TestCategory.C, vehicleChecks);
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

  shouldDisplayBanner = (): boolean => {
    return (
      this.vehicleChecksScore.drivingFaults === 4 &&
      this.vehicleChecksScore.seriousFaults === 1
    );
  }
}
