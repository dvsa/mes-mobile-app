import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { BACK_TO_OFFICE_PAGE } from '../page-names.constants';
import { Observable } from 'rxjs/Observable';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest, getJournalData } from '../../modules/tests/tests.selector';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../modules/tests/candidate/candidate.selector';
import { NonPassFinalisationViewDidEnter } from './non-pass-finalisation.actions';

interface NonPassFinalisationPageState {
  candidateName$: Observable<string>;
}

@IonicPage()
@Component({
  selector: 'non-pass-finalisation',
  templateUrl: 'non-pass-finalisation.html',
})
export class NonPassFinalisationPage extends PracticeableBasePageComponent {

  pageState: NonPassFinalisationPageState;

  constructor(
    store$: Store<StoreModel>,
    navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navController, authenticationProvider, store$);
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
    };
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new NonPassFinalisationViewDidEnter());
  }

  continue() {
    this.navController.push(BACK_TO_OFFICE_PAGE);
  }

}
