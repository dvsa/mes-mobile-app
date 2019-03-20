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
  signaturePad: SignatureAreaComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ngAfterViewInit() {
    this.signaturePad.signHereText = 'Sign here';
    this.signaturePad.retryButtonText = 'Retry';
    this.signaturePad.notValidHeaderText = 'Enter a signature';
    this.signaturePad.required = true;
  }
}
