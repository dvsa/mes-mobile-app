import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SearchProvider } from '../../providers/search/search';
import { tap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import { AdvancedSearchParams } from '../../providers/search/search.models';
import { ExaminerRole } from '../../providers/app-config/constants/examiner-role.constants';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import {
  TestResultSearchViewDidEnter,
  PerformAdvancedSearch,
  PerformStandardSearch,
} from './test-results-search.actions';

enum SearchBy {
  DriverNumber = 'driverNumber',
  ApplicationReferenece = 'appReference',
}

@IonicPage()
@Component({
  selector: 'page-test-results-search',
  templateUrl: 'test-results-search.html',
})
export class TestResultsSearchPage extends BasePageComponent {

  searchBy: SearchBy;
  candidateInfo: string = '';
  searchResults: SearchResultTestSchema[] = [];
  hasSearched: boolean = false;
  showSearchSpinner: boolean = false;
  showAdvancedSearchSpinner: boolean = false;

  constructor(
    public navController: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public authenticationProvider: AuthenticationProvider,
    public searchProvider: SearchProvider,
    private appConfig: AppConfigProvider,
    private store$: Store<StoreModel>,
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
    return this.appConfig.getAppConfig().role === ExaminerRole.LDTM;
  }

  candidateInfoChanged(val: string) {
    this.candidateInfo = val;
  }

  searchTests() {
    if (this.searchBy === SearchBy.DriverNumber) {
      this.showSearchSpinner = true;
      this.searchProvider.driverNumberSearch(this.candidateInfo)
      .pipe(
        tap(() => this.hasSearched = true),
        map((results) => {
          this.searchResults = results;

          this.showSearchSpinner = false;
        }),
        catchError(() => {
          this.searchResults = [];
          this.showSearchSpinner = false;
          return of(this.hasSearched = true);
        }),
      )
      .subscribe();
      // TODO - Need to Unsubscribe
    }

    if (this.searchBy === SearchBy.ApplicationReferenece) {
      this.store$.dispatch(new PerformStandardSearch());
      this.showSearchSpinner = true;
      this.searchProvider.applicationReferenceSearch(this.candidateInfo)
      .pipe(
        tap(() => this.hasSearched = true),
        map((results) => {
          this.searchResults = results;
          this.showSearchSpinner = false;
        }),
        catchError(() => {
          this.searchResults = [];
          this.showSearchSpinner = false;
          return of(this.hasSearched = true);
        }),
      )
      .subscribe();
      // TODO - Need to unsubscribe
    }
  }

  advancedSearch(advancedSearchParams: AdvancedSearchParams): void {
    this.store$.dispatch(new PerformAdvancedSearch());
    this.showAdvancedSearchSpinner = true;
    this.searchProvider.advancedSearch(advancedSearchParams)
      .pipe(
        tap(() => this.hasSearched = true),
        map((results) => {
          this.searchResults = results;
          this.showAdvancedSearchSpinner = false;
        }),
        catchError((err) => {
          this.searchResults = [];
          this.showAdvancedSearchSpinner = false;
          return of(console.log('ERROR', JSON.stringify(err)));
        }),
      )
      .subscribe();
      // TODO - Need to Unsubscribe
  }

  myHeaderFn(record: any, recordIndex: any): string {
    if (recordIndex === 0) {
      return '';
    }
    return null;
  }

}
