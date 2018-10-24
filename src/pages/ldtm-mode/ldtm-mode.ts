import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-ldtm-mode',
  templateUrl: 'ldtm-mode.html'
})
export class LdtmModePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LdtmModePage');
  }
}
