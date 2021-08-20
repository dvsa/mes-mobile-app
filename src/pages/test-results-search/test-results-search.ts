import { ErrorTypes } from './../../shared/models/error-message';
import { Subscription, of } from 'rxjs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, ViewController } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SearchProvider } from '../../providers/search/search';
import { tap, catchError, map } from 'rxjs/operators';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import { AdvancedSearchParams } from '../../providers/search/search.models';
import { ExaminerRole } from '../../providers/app-config/constants/examiner-role.constants';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import {
  TestResultSearchViewDidEnter, PerformApplicationReferenceSearch, PerformDriverNumberSearch, PerformLDTMSearch,

} from './test-results-search.actions';
import { Log, LogType } from '../../shared/models/log.model';
import { SaveLog } from '../../modules/logs/logs.actions';
import { LogHelper } from '../../providers/logs/logsHelper';
import { ERROR_PAGE } from '../page-names.constants';
import { MesError } from '../../shared/models/mes-error.model';
import { App } from '../../app/app.component';
import { HttpErrorResponse } from '@angular/common/http';

enum SearchBy {
  DriverNumber = 'driverNumber',
  ApplicationReference = 'appReference',
}

@IonicPage()
@Component({
  selector: 'page-test-results-search',
  templateUrl: 'test-results-search.html',
})
export class TestResultsSearchPage extends BasePageComponent {

  searchBy: SearchBy = SearchBy.ApplicationReference;
  candidateInfo: string = '';
  searchResults: SearchResultTestSchema[] = [];
  hasSearched: boolean = false;
  showSearchSpinner: boolean = false;
  showAdvancedSearchSpinner: boolean = false;
  subscription: Subscription = Subscription.EMPTY;

  constructor(
    public modalController: ModalController,
    public viewController: ViewController,
    public navController: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public authenticationProvider: AuthenticationProvider,
    public searchProvider: SearchProvider,
    private appConfig: AppConfigProvider,
    private store$: Store<StoreModel>,
    private logHelper: LogHelper,
    private app: App,
  ) {
    super(platform, navController, authenticationProvider);
  }

  ionViewDidEnter() {
    this.store$.dispatch(new TestResultSearchViewDidEnter());
  }

  searchByChanged(val: SearchBy) {
    this.searchBy = val;
  }

  displayAdvancedSearch() {
    const role: ExaminerRole = this.appConfig.getAppConfig().role as ExaminerRole;
    return [ExaminerRole.DLG, ExaminerRole.LDTM].includes(role);
  }

  candidateInfoChanged(val: string) {
    this.candidateInfo = val;
  }

  searchTests() {
    if (this.searchBy === SearchBy.DriverNumber) {
      this.subscription.unsubscribe();
      this.store$.dispatch(new PerformDriverNumberSearch());
      this.showSearchSpinner = true;
      this.subscription = this.searchProvider.driverNumberSearch(this.candidateInfo)
        .pipe(
          tap(() => this.hasSearched = true),
          map((results) => {
            this.searchResults = results;
            this.showSearchSpinner = false;
          }),
          catchError((err: HttpErrorResponse) => {
            const log: Log = this.logHelper
              .createLog(LogType.ERROR, `Searching tests by driver number`, err.message);
            this.store$.dispatch(new SaveLog(log));
            this.searchResults = [];
            this.showSearchSpinner = false;

            if (err) {
              this.showError(err);
              this.hasSearched = false;
              return of();
            }

            return of(this.hasSearched = true);
          }),
        )
        .subscribe();
    }

    if (this.searchBy === SearchBy.ApplicationReference) {
      this.subscription.unsubscribe();
      this.store$.dispatch(new PerformApplicationReferenceSearch());
      this.showSearchSpinner = true;
      this.subscription = this.searchProvider.applicationReferenceSearch(this.candidateInfo)
        .pipe(
          tap(() => this.hasSearched = true),
          map((results) => {
            this.searchResults = results;
            this.showSearchSpinner = false;
          }),
          catchError((err: HttpErrorResponse) => {
            this.store$.dispatch(new SaveLog(this.logHelper
              .createLog(
                LogType.ERROR, `Searching tests by app ref (${this.candidateInfo})`, err.message,
              )));
            this.searchResults = [];
            this.showSearchSpinner = false;

            if (err) {
              this.showError(err);
              this.hasSearched = false;
              return of();
            }

            return of(this.hasSearched = true);
          }),
        )
        .subscribe();
    }
  }

  advancedSearch(advancedSearchParams: AdvancedSearchParams): void {
    this.subscription.unsubscribe();
    this.store$.dispatch(new PerformLDTMSearch(advancedSearchParams));
    this.showAdvancedSearchSpinner = true;
    this.subscription = this.searchProvider.advancedSearch(advancedSearchParams)
      .pipe(
        tap(() => this.hasSearched = true),
        map((results) => {
          this.searchResults = results;
          this.showAdvancedSearchSpinner = false;
        }),
        catchError((err: HttpErrorResponse) => {
          const log: Log = this.logHelper
            .createLog(
              LogType.ERROR, `Advanced search with params (${advancedSearchParams})`, err.message,
            );
          this.store$.dispatch(new SaveLog(log));
          this.searchResults = [];
          this.showAdvancedSearchSpinner = false;
          if (err) {
            this.showError(err);
            this.hasSearched = false;
          }
          return of(console.log('ERROR', JSON.stringify(err)));
        }),
      )
      .subscribe();
  }

  myHeaderFn(record: any, recordIndex: any): string {
    if (recordIndex === 0) {
      return '';
    }
    return null;
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showError = (error: MesError): void => {
    if (error === undefined || error.message === '') return;

    // Modals are at the same level as the ion-nav so are not getting the zoom level class,
    // this needs to be passed in the create options.
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const errorModal = this.modalController.create(
      ERROR_PAGE,
      { type: ErrorTypes.SEARCH },
      { cssClass: zoomClass });
    errorModal.present();
  }

}
