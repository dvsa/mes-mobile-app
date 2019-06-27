import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TEST_RESULTS_SEARCH_PAGE } from '../../../page-names.constants';

@Component({
  selector: 'test-results-search-card',
  templateUrl: 'test-results-search-card.html',
})

export class TestResultsSearchCardComponent {

  constructor(private navController: NavController) { }

  navigateToTestResultsSearch = () => {
    this.navController.push(TEST_RESULTS_SEARCH_PAGE);
  }

}
