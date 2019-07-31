import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ErrorTypes } from '../../shared/models/error-message';

@IonicPage()
@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
})
export class ErrorPage {

  public errorType: ErrorTypes;

  constructor(public navController: NavController, public navParams: NavParams) { }

  ngOnInit(): void {
    this.errorType = this.navParams.get('type');
  }

  goBack = (): void => {
    this.navController.pop();
  }

}
