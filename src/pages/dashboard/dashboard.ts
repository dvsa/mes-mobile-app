import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Navbar } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { DashboardViewDidEnter } from './dashboard.actions';
import { Observable } from 'rxjs/Observable';
import { DeviceAuthenticationProvider } from '../../providers/device-authentication/device-authentication';
import { Subscription } from 'rxjs/Subscription';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { map } from 'rxjs/operators';
import { getAppInfoState } from '../../modules/app-info/app-info.reducer';
import { getVersionNumber } from '../../modules/app-info/app-info.selector';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { DeviceProvider } from '../../providers/device/device';
import { Insomnia } from '@ionic-native/insomnia';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ExaminerRoleDescription } from '../../providers/app-config/constants/examiner-role.constants';
import { BasePageComponent } from '../../shared/classes/base-page';
import { getTests } from '../../modules/tests/tests.reducer';
import { getUnsubmittedTestsCount, getOldestUnsubmittedTest } from '../../modules/tests/tests.selector';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { DateTime } from '../../shared/helpers/date-time';
import { get } from 'lodash';

interface DashboardPageState {
  appVersion$: Observable<string>;
  unsubmittedTestsCount$: Observable<number>;
  oldestUnsubmittedTestDate$: Observable<string>;
}

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage extends BasePageComponent {

  @ViewChild(Navbar) navBar: Navbar;

  pageState: DashboardPageState;
  subscription: Subscription;
  merged$: Observable<boolean | string>;
  employeeId: string;
  name: string;
  role: string;
  todaysDate: string;

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
    this.name = this.authenticationProvider.getEmployeeName() || 'Unknown Name';
    this.role = ExaminerRoleDescription[this.appConfigProvider.getAppConfig().role] || 'Unknown Role';
    this.todaysDate = this.dateTimeProvider.now().format('dddd Do MMMM YYYY');
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
      unsubmittedTestsCount$: this.store$.pipe(
        select(getTests),
        select(getUnsubmittedTestsCount),
      ),
      oldestUnsubmittedTestDate$: this.store$.pipe(
        select(getTests),
        select(getOldestUnsubmittedTest),
        map((test: StandardCarTestCATBSchema) =>
          new DateTime(get(test, 'journalData.testSlotAttributes.start', '')).format('YYYY-MM-DD')),
      ),
    };
  }

  ionViewWillEnter(): boolean {
    super.ionViewWillEnter();
    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
    }

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
