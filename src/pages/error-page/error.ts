import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ErrorTypes } from '../../shared/models/error-message';

@IonicPage()
@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
})
export class ErrorPage {

  private errorType: string;
  public errorLink: string;
  public showAdditionalText: boolean;

  constructor(public navController: NavController, public navParams: NavParams) { }

  ngOnInit(): void {
    this.errorType = this.navParams.get('type');
    this.errorLink = ErrorTypes[this.errorType];
    this.showAdditionalText = this.errorType === 'SEARCH';
  }

  goBack = (): void => {
    this.navController.pop();
  }

}
