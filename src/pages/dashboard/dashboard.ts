import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Navbar, AlertController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
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
import { DateTime } from '../../shared/helpers/date-time';

interface DashboardPageState {
  appVersion$: Observable<string>;
  todaysDate$: Date | DateTime | string;
}

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage extends PracticeableBasePageComponent {

  static readonly welshLanguage: string = 'Cymraeg';

  @ViewChild(Navbar) navBar: Navbar;

  pageState: DashboardPageState;
  licenseProvided: boolean;
  healthDeclarationAccepted: boolean;
  subscription: Subscription;
  inputSubscriptions: Subscription[] = [];
  isBookedInWelsh: boolean;
  conductedLanguage: string;
  merged$: Observable<boolean | string>;

  public myDashboard: string;

  constructor(
    store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private deviceAuthenticationProvider: DeviceAuthenticationProvider,
    public alertController: AlertController,
    public appConfigProvider: AppConfigProvider,
    private dateTimeProvider: DateTimeProvider,
  ) {
    super(platform, navController, authenticationProvider, store$);
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new DashboardViewDidEnter());
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.clickBack();
    };
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
    this.myDashboard = 'Marlon';

    this.pageState = {
      appVersion$: this.store$.pipe(
        select(getAppInfoState),
        map(getVersionNumber),
      ),
      todaysDate$: this.dateTimeProvider.now().format('dddd Do MMMM YYYY'),
    };
  }

  ionViewWillEnter(): boolean {
    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
    }

    return true;
  }

  ionViewDidLeave(): void {
    super.ionViewDidLeave();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.inputSubscriptions) {
      this.inputSubscriptions.forEach(sub => sub.unsubscribe());
    }
  }

  showTestReportPracticeMode = (): boolean =>
    this.appConfigProvider.getAppConfig().journal.enableTestReportPracticeMode

  showEndToEndPracticeMode = (): boolean =>
    this.appConfigProvider.getAppConfig().journal.enableEndToEndPracticeMode
}
