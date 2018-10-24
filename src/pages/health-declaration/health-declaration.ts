import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { DeviceAuthentication } from '../../types/device-authentication';
import { PostTestSummaryPage } from '../post-test-summary/post-test-summary';
import { Page } from 'ionic-angular/navigation/nav-util';

@Component({
  selector: 'page-health-declaration',
  templateUrl: 'health-declaration.html'
})
export class HealthDeclarationPage {
  signaturePadOptions: any;
  signature: any;
  postTestSummaryPage: Page = PostTestSummaryPage;
  confirmation: boolean;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configService: AppConfigProvider,
    private deviceAuth: DeviceAuthentication
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

  validation() {
    if (this.confirmation && this.signature) {
      return false;
    }
    return true;
  }

  continue() {
    this.deviceAuth
      .runAuthentication('Please authenticate yourself to proceed')
      .then((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.navCtrl.push(this.postTestSummaryPage);
        }
      })
      .catch((errorMsg: string) => {
        if (errorMsg === 'cordova_not_available' || errorMsg === 'plugin_not_installed') {
          this.navCtrl.push(this.postTestSummaryPage);
        }
      });
  }
}
