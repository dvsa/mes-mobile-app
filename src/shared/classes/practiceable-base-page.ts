import { Platform, NavController } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { Observable, merge, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BasePageComponent } from './base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { StoreModel } from '../models/store.model';
import { getTests } from '../../modules/tests/tests.reducer';
import { isPracticeMode, isTestReportPracticeTest, isEndToEndPracticeTest } from '../../modules/tests/tests.selector';
import { OnInit } from '@angular/core';
import { FAKE_JOURNAL_PAGE } from '../../pages/page-names.constants';

interface PracticeableBasePageState {
  isPracticeMode$: Observable<boolean>;
  isTestReportPracticeMode$: Observable<boolean>;
  isEndToEndPracticeMode$: Observable<boolean>;
}

export abstract class PracticeableBasePageComponent extends BasePageComponent implements OnInit {

  public isPracticeMode: boolean;
  public isTestReportPracticeMode: boolean;
  public isEndToEndPracticeMode: boolean;

  private practiceableBasePageState: PracticeableBasePageState;
  private practiceableBasePageSubscription: Subscription;

  constructor(
    public platform: Platform,
    public navController: NavController,
    public authenticationProvider: AuthenticationProvider,
    public store$: Store<StoreModel>,
    public loginRequired: boolean = true,
  ) {
    super(platform, navController, authenticationProvider, loginRequired);
  }

  ngOnInit(): void {
    this.practiceableBasePageState = {
      isPracticeMode$: this.store$.pipe(
        select(getTests),
        select(isPracticeMode),
      ),
      isTestReportPracticeMode$: this.store$.pipe(
        select(getTests),
        select(isTestReportPracticeTest),
      ),
      isEndToEndPracticeMode$: this.store$.pipe(
        select(getTests),
        select(isEndToEndPracticeTest),
      ),
    };

    const {
      isPracticeMode$,
      isTestReportPracticeMode$,
      isEndToEndPracticeMode$,
    } = this.practiceableBasePageState;

    const merged$ = merge(
      isPracticeMode$.pipe(map(value => this.isPracticeMode = value)),
      isTestReportPracticeMode$.pipe(map(value => this.isTestReportPracticeMode = value)),
      isEndToEndPracticeMode$.pipe(map(value => this.isEndToEndPracticeMode = value)),
    );

    this.practiceableBasePageSubscription = merged$.subscribe();
  }

  ionViewDidLeave(): void {
    if (this.practiceableBasePageSubscription) {
      this.practiceableBasePageSubscription.unsubscribe();
    }
  }

  exitPracticeMode = (): void => {
    // As per bug request for Ionic 3 we need to get and pass in the view controller
    // for the page we want to get back to - https://github.com/ionic-team/ionic/issues/13672
    this.navController.popTo(this.navController.getViews().find(view => view.id === FAKE_JOURNAL_PAGE));
  }

}
