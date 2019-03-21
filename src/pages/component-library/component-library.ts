import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignatureAreaComponent } from './../../components/signature-area/signature-area';

@IonicPage()
@Component({
  selector: 'page-component-library',
  templateUrl: 'component-library.html',
})
export class ComponentLibraryPage {
  @ViewChild(SignatureAreaComponent)
  signatureArea: SignatureAreaComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ngAfterViewInit() {
    this.signatureArea.actionLess = true;
    this.signatureArea.signHereText = 'Sign here';
    this.signatureArea.retryButtonText = 'Retry';
    this.signatureArea.notValidHeaderText = 'Enter a signature';
  }
  toggleIsValid() {
    this.signatureArea.isvalid = !this.signatureArea.isvalid;
  }
}
