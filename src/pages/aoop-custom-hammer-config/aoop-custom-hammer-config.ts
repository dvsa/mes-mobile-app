import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CustomHammerConfigProvider } from '../../providers/custom-hammer-config/custom-hammer-config';

/**
 * Generated class for the AoopCustomHammerConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-aoop-custom-hammer-config',
  templateUrl: 'aoop-custom-hammer-config.html'
})
export class AoopCustomHammerConfigPage {
  duration: number;
  durationInSeconds: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customHammerService: CustomHammerConfigProvider,
    public viewCtrl: ViewController
  ) {
    this.duration = this.customHammerService.pressDuration;
    this.getDurationInSeconds(this.duration);
  }

  onChange($event) {
    this.getDurationInSeconds(this.duration);
  }

  confirm() {
    this.customHammerService.setPressDuration(this.duration);
    this.closeModal();
  }

  cancel() {
    this.closeModal();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  getDurationInSeconds(ms: number) {
    const s = ms / 1000;
    this.durationInSeconds = s;
  }
}
