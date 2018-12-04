import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { DeviceAuthentication } from '../../types/device-authentication';
import { PostTestSummaryPage } from '../post-test-summary/post-test-summary';
import { Page } from 'ionic-angular/navigation/nav-util';
import { MesSignaturePadComponent } from '../../components/mes-signature-pad/mes-signature-pad';
import { IJournal, ICandidateName } from '../../providers/journal/journal-model';
import { AnalyticsScreenNames } from '../../providers/analytics/analytics.model';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { HelpHealthDeclarationPage } from '../../help/pages/help-health-declaration/help-health-declaration';

@Component({
  selector: 'page-health-declaration',
  templateUrl: 'health-declaration.html'
})
export class HealthDeclarationPage {
  signaturePadOptions: any;
  postTestSummaryPage: Page = PostTestSummaryPage;
  confirmation: boolean;
  slotDetail: IJournal;
  passCertificateNumber: string;
  helpPage: Page = HelpHealthDeclarationPage;

  @ViewChild(MesSignaturePadComponent)
  signaturePad: MesSignaturePadComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configService: AppConfigProvider,
    private deviceAuth: DeviceAuthentication,
    public logging: AnalyticsProvider
  ) {
    this.signaturePadOptions = configService.getSignaturePadOptions();
    this.slotDetail = this.navParams.get('slotDetail');
    this.passCertificateNumber = this.navParams.get('passNumber');
  }

  ionViewDidEnter() {
    this.logging.setCurrentPage(AnalyticsScreenNames.HEALTH_DECLARATION);
  }

  validation() {
    return !this.confirmation || !this.signaturePad.getSignature();
  }

  continue() {
    this.deviceAuth
      .runAuthentication('Please authenticate yourself to proceed')
      .then((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.navCtrl.push(this.postTestSummaryPage, { slotDetail: this.slotDetail });
        }
      })
      .catch((errorMsg: string) => {
        if (errorMsg === 'cordova_not_available' || errorMsg === 'plugin_not_installed') {
          this.navCtrl.push(this.postTestSummaryPage, { slotDetail: this.slotDetail });
        }
      });
  }

  getTitle(): string {
    return `${this.getCandidateName()} - Test debrief`;
  }

  getCandidateName(): string {
    const name: ICandidateName = this.slotDetail.candidateName;
    return `${name.firstName} ${name.lastName}`;
  }

  getDriverNumber(): string {
    return this.slotDetail.driverNumber;
  }

  getCertificateNumber(): string {
    return this.passCertificateNumber;
  }
}
