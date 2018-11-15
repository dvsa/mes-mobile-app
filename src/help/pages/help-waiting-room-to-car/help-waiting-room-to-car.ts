import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-help-waiting-room-to-car',
  templateUrl: 'help-waiting-room-to-car.html'
})
export class HelpWaitingRoomToCarPage {
  title: string = 'Waiting room to car - Help';
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpWaitingRoomToCarPage');
  }
}
