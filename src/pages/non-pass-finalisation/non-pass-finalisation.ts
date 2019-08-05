import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { BACK_TO_OFFICE_PAGE } from '../page-names.constants';
import { Observable } from 'rxjs/Observable';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData, getActivityCode } from '../../modules/tests/tests.selector';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../modules/tests/candidate/candidate.selector';
import { NonPassFinalisationViewDidEnter } from './non-pass-finalisation.actions';
import { ActivityCodeModel, activityCodeModelList } from '../office/components/activity-code/activity-code.constants';
import { FormGroup } from '@angular/forms';
import { OutcomeBehaviourMapProvider } from '../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { behaviourMap } from '../office/office-behaviour-map';

interface NonPassFinalisationPageState {
  candidateName$: Observable<string>;
  activityCode$: Observable<ActivityCodeModel>;
}

@IonicPage()
@Component({
  selector: 'non-pass-finalisation',
  templateUrl: 'non-pass-finalisation.html',
})
export class NonPassFinalisationPage extends PracticeableBasePageComponent {

  pageState: NonPassFinalisationPageState;
  form: FormGroup;
  activityCodeOptions: ActivityCodeModel[];

  constructor(
    store$: Store<StoreModel>,
    navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private outcomeBehaviourProvider: OutcomeBehaviourMapProvider,
  ) {
    super(platform, navController, authenticationProvider, store$);
    this.outcomeBehaviourProvider.setBehaviourMap(behaviourMap);
    this.activityCodeOptions = activityCodeModelList;
  }

  ngOnInit() {
    const candidateName$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getJournalData),
      select(getCandidate),
      select(getUntitledCandidateName),
    );
    this.pageState = {
      candidateName$,
      activityCode$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getActivityCode),
      ),
    };
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new NonPassFinalisationViewDidEnter());
  }

  continue() {
    this.navController.push(BACK_TO_OFFICE_PAGE);
  }

}
