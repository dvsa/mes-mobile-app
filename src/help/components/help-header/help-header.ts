import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'help-header',
  templateUrl: 'help-header.html'
})
export class HelpHeader {
  @Input()
  title: string;

  constructor(public navCtrl: NavController) {}

  closePopup(): void {
    this.navCtrl.pop();
  }
}
