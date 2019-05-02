import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'legal-requirements-modal',
  templateUrl: 'legal-requirements-modal.html',
})
export class LegalRequirementsModal {

  onCancel: Function;
  onTerminate: Function;

  legalRequirements: string[] = [];

  constructor(
    private navParams: NavParams,
  ) {
    this.onCancel = this.navParams.get('onCancel');
    this.onTerminate = this.navParams.get('onTerminate');
    this.legalRequirements = this.navParams.get('legalRequirements');
  }

}
