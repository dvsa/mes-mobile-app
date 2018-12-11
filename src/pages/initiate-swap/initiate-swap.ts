import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-initiate-swap',
  templateUrl: 'initiate-swap.html'
})
export class InitiateSwapPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitiateSwapPage');
  }
}
