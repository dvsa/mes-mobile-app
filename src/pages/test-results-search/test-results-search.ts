import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SearchProvider } from '../../providers/search/search';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const SEARCH_BY_DRIVER_NUMBER = 'driverNumber';
const SEARCH_BY_APPLICATION_REFERENCE = 'appReference';

@IonicPage()
@Component({
  selector: 'page-test-results-search',
  templateUrl: 'test-results-search.html',
})
export class TestResultsSearchPage extends BasePageComponent {

  searchBy: string;
  candidateInfo: string = '';

  constructor(
    public navController: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public authenticationProvider: AuthenticationProvider,
    public searchProvider: SearchProvider,
  ) {
    super(platform, navController, authenticationProvider);
  }

  searchByChanged(val: string) {
    this.searchBy = val;
  }

  candidateInfoChanged(val: string) {
    this.candidateInfo = val;
  }

  searchTests() {
    console.log('SEARCH Request');
    if (this.searchBy === SEARCH_BY_DRIVER_NUMBER) {
      this.searchProvider.driverNumberSearch(this.candidateInfo)
      .pipe(
        tap(data => console.log('Driver Number', JSON.stringify(data))),
        catchError(err => of(console.log('ERROR', JSON.stringify(err)))),
      )
      .subscribe();
    }

    if (this.searchBy === SEARCH_BY_APPLICATION_REFERENCE) {
      this.searchProvider.applicationReferenceSearch(this.candidateInfo)
      .pipe(
        tap(data => console.log('App Ref', JSON.stringify(data))),
        catchError(err => of(console.log('ERROR', JSON.stringify(err)))),
      )
      .subscribe();
    }
  }

}
