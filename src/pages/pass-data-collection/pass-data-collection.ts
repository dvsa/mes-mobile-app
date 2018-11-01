import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HealthDeclarationPage } from '../health-declaration/health-declaration';
import { Page } from 'ionic-angular/navigation/nav-util';
import { isNil } from 'lodash';

@Component({
  selector: 'page-pass-data-collection',
  templateUrl: 'pass-data-collection.html'
})
export class PassDataCollectionPage {
  healthDeclarationPage: Page = HealthDeclarationPage;
  passCertificateNumber: string;
  provisionalProvidedSelection: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  provisionalInputChanged(event, secondInput) {
    secondInput.checked = false;
    this.provisionalProvidedSelection = event.target.checked;
  }

  validation() {
    const passCertNumberValid = !isNil(this.passCertificateNumber) && this.passCertificateNumber.trim().length > 0;
    return [
      passCertNumberValid,
      this.provisionalProvidedSelection
    ].some((p) => !p);
  }
}
