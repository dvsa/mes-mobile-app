import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

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
  ) {
    super(platform, navController, authenticationProvider);
  }

  searchByChanged(val) {
    this.searchBy = val;
  }

  candidateInfoChanged(val) {
    this.candidateInfo = val;
    console.log('candidate info', this.candidateInfo);
  }

  searchTests() {
    console.log('search tests pressed', this.candidateInfo);
  }

}
