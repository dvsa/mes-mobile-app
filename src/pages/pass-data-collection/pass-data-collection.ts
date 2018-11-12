import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HealthDeclarationPage } from '../health-declaration/health-declaration';
import { Page } from 'ionic-angular/navigation/nav-util';
import { isNil } from 'lodash';
import { IJournal, ICandidateName } from '../../providers/journal/journal-model';

@Component({
  selector: 'page-pass-data-collection',
  templateUrl: 'pass-data-collection.html'
})
export class PassDataCollectionPage {
  healthDeclarationPage: Page = HealthDeclarationPage;
  passCertificateNumber: string;
  provisionalProvidedSelection: string = '0';
  slotDetail: IJournal;

  // Validation Flags
  showPassCertificateNumberValidation: boolean = false;
  showProvisionalProvidedValidation: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.slotDetail = this.navParams.get('slotDetail');
  }

  continue() {
    this.showPassCertificateNumberValidation =
      isNil(this.passCertificateNumber) || this.passCertificateNumber.trim().length === 0;

    this.showProvisionalProvidedValidation = this.provisionalProvidedSelection === '0';

    if (!this.showPassCertificateNumberValidation && !this.showProvisionalProvidedValidation) {
      this.navCtrl.push(this.healthDeclarationPage, { slotDetail: this.slotDetail });
    }
  }

  getTitle(): string {
    const name: ICandidateName = this.slotDetail.candidateName;
    return `${name.firstName} ${name.lastName} - Test debrief`;
  }

  getAppRef(): string {
    return this.slotDetail.appId;
  }
}
