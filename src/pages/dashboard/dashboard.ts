import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Navbar } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { DashboardViewDidEnter } from './dashboard.actions';
import { Observable, Subscription } from 'rxjs';
import { DeviceAuthenticationProvider } from '../../providers/device-authentication/device-authentication';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { map } from 'rxjs/operators';
import { getAppInfoState } from '../../modules/app-info/app-info.reducer';
import { getVersionNumber, getEmployeeName } from '../../modules/app-info/app-info.selector';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { DeviceProvider } from '../../providers/device/device';
import { Insomnia } from '@ionic-native/insomnia';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ExaminerRoleDescription } from '../../providers/app-config/constants/examiner-role.constants';
import { BasePageComponent } from '../../shared/classes/base-page';
import { IncompleteTestsBanner } from '../../components/common/incomplete-tests-banner/incomplete-tests-banner';
import * as journalActions from './../../modules/journal/journal.actions';
import { DateTime } from '../../shared/helpers/date-time';

interface DashboardPageState {
  appVersion$: Observable<string>;
  employeeName$: Observable<string>;
}

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage extends BasePageComponent {

  @ViewChild(Navbar) navBar: Navbar;

  @ViewChild(IncompleteTestsBanner)
  incompleteTestsBanner: IncompleteTestsBanner;

  pageState: DashboardPageState;
  subscription: Subscription;
  merged$: Observable<boolean | string>;
  employeeId: string;
  name: string;
  role: string;
  todaysDate: DateTime;
  todaysDateFormatted: string;

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private deviceAuthenticationProvider: DeviceAuthenticationProvider,
    public appConfigProvider: AppConfigProvider,
    private dateTimeProvider: DateTimeProvider,
    private deviceProvider: DeviceProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,
  ) {
    super(platform, navController, authenticationProvider);
    this.employeeId = this.authenticationProvider.getEmployeeId() || 'NOT_KNOWN';
    this.role = ExaminerRoleDescription[this.appConfigProvider.getAppConfig().role] || 'Unknown Role';
    this.todaysDate = this.dateTimeProvider.now();
    this.todaysDateFormatted = this.dateTimeProvider.now().format('dddd Do MMMM YYYY');

  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new DashboardViewDidEnter());
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.clickBack();
    };
    if (super.isIos()) {
      this.screenOrientation.unlock();
      this.insomnia.allowSleepAgain();
      this.deviceProvider.disableSingleAppMode();
    }
    this.store$.dispatch(new journalActions.LoadJournalSilent());
  }

  clickBack(): void {
    this.deviceAuthenticationProvider.triggerLockScreen()
      .then(() => {
        this.navController.pop();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit(): void {
    this.pageState = {
      appVersion$: this.store$.pipe(
        select(getAppInfoState),
        map(getVersionNumber),
      ),
      employeeName$: this.store$.pipe(
        select(getAppInfoState),
        map(getEmployeeName),
      ),
    };
  }

  ionViewWillEnter(): boolean {
    super.ionViewWillEnter();
    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
    }
    this.todaysDate = this.dateTimeProvider.now();
    this.todaysDateFormatted = this.dateTimeProvider.now().format('dddd Do MMMM YYYY');

    return true;
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showTestReportPracticeMode = (): boolean =>
    this.appConfigProvider.getAppConfig().journal.enableTestReportPracticeMode

  showEndToEndPracticeMode = (): boolean =>
    this.appConfigProvider.getAppConfig().journal.enableEndToEndPracticeMode

  isLogoutEnabled = (): boolean =>
    this.authenticationProvider.logoutEnabled()
}
