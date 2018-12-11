import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-trainer-mode',
  templateUrl: 'trainer-mode.html'
})
export class TrainerModePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainerModePage');
  }
}
