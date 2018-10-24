import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-manage-device-debrief-storage',
  templateUrl: 'manage-device-debrief-storage.html'
})
export class ManageDeviceDebriefStoragePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MangeDeviceDebriefStoragePage');
  }
}
