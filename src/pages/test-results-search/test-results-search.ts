import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SearchProvider } from '../../providers/search/search';
import { tap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';

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

  constructor(
    public navController: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public authenticationProvider: AuthenticationProvider,
    public searchProvider: SearchProvider,
  ) {
    super(platform, navController, authenticationProvider);
  }

  searchByChanged(val: SearchBy) {
    this.searchBy = val;
  }

  candidateInfoChanged(val: string) {
    this.candidateInfo = val;
  }

  searchTests() {
    if (this.searchBy === SearchBy.DriverNumber) {
      this.searchProvider.driverNumberSearch(this.candidateInfo)
      .pipe(
        tap(data => console.log('Driver Number', JSON.stringify(data))),
        map(results => this.searchResults = results),
        catchError(err => of(console.log('ERROR', JSON.stringify(err)))),
      )
      .subscribe();
    }

    if (this.searchBy === SearchBy.ApplicationReferenece) {
      this.searchProvider.applicationReferenceSearch(this.candidateInfo)
      .pipe(
        tap(data => console.log('App Ref', JSON.stringify(data))),
        map(results => this.searchResults = results),
        catchError(err => of(console.log('ERROR', JSON.stringify(err)))),
      )
      .subscribe();
    }
  }

}
