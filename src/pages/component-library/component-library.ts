import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MesSignaturePadComponent } from './components/mes-signature-pad/mes-signature-pad';

@IonicPage()
@Component({
  selector: 'page-component-library',
  templateUrl: 'component-library.html',
})
export class ComponentLibraryPage {
  @ViewChild(MesSignaturePadComponent)
  signaturePad: MesSignaturePadComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ngAfterViewChecked() {
    this.signaturePad.retryImage = '/assets/imgs/waiting-room/retry.png';
    this.signaturePad.signHereImage = '/assets/imgs/waiting-room/sign-here.png';
    this.signaturePad.signHereText = 'Sign Me';
    this.signaturePad.retryButtonText = 'Clear';
  }
}
