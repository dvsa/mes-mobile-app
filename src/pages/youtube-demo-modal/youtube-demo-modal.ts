import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-youtube-demo-modal',
  templateUrl: 'youtube-demo-modal.html'
})
export class YoutubeDemoModalPage {
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}
}
