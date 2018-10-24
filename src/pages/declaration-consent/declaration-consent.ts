import { DeviceAuthentication } from '../../types/device-authentication';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppConfigProvider } from '../../providers/app-config/app-config';
import { PretestChecksPage } from '../pretest-checks/pretest-checks';
import { EndTestReasonPage } from '../end-test-reason/end-test-reason';
import { Page } from 'ionic-angular/navigation/nav-util';
import { FaultStoreProvider } from '../../providers/fault-store/fault-store';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';

/**
 * Generated class for the DeclarationConsentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-declaration-consent',
  templateUrl: 'declaration-consent.html'
})
export class DeclarationConsentPage {
  pretestChecksPage: Page = PretestChecksPage;
  endTestReasonPage: Page = EndTestReasonPage;
  signaturePadOptions: any;
  signature: any;

  checkInsurance: boolean = false;
  checkResidence: boolean = false;
  checkDebrief: boolean = false;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configService: AppConfigProvider,
    private deviceAuth: DeviceAuthentication,
    private faultStore: FaultStoreProvider
  ) {
    this.signaturePadOptions = configService.getSignaturePadOptions();
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    this.signature = this.signaturePad.toDataURL();
    this.validation();
  }

  clearSignaturePad() {
    this.signaturePad.clear();
  }

  drawStart() {}

  ionViewDidLoad() {
    this.signaturePad.resizeCanvas();
  }

  updateValidation(prop: string) {
    this[prop] = !this[prop];
  }

  validation() {
    if (this.checkInsurance && this.checkResidence && this.signature) {
      return false;
    }
    return true;
  }

  continue() {
    this.deviceAuth
      .runAuthentication('Please authenticate yourself to proceed')
      .then((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.faultStore.setDebriefConsentStatus(this.checkDebrief);
          this.navCtrl.push(this.pretestChecksPage);
        }
      })
      .catch((errorMsg: string) => {
        if (errorMsg === 'cordova_not_available' || errorMsg === 'plugin_not_installed') {
          this.faultStore.setDebriefConsentStatus(this.checkDebrief);
          this.navCtrl.push(this.pretestChecksPage);
        }
      });
  }
}
