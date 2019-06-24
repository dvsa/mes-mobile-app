import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'test-results-search-card',
  templateUrl: 'test-results-search-card.html',
})

export class TestResultsSearchCardComponent {

  constructor(private navController: NavController) { }

  navigateToTestResultsSearch = () => {
    this.navController.push('TestResultsSearchPage');
  }

}
