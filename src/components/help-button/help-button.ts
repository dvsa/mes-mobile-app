import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Page } from 'ionic-angular/umd/navigation/nav-util';

@Component({
  selector: 'help-button',
  templateUrl: 'help-button.html'
})
export class HelpButtonComponent {
  @Input()
  helpPage: Page;

  constructor(public modalCtrl: ModalController) {}

  openModal() {
    const modal = this.modalCtrl.create(this.helpPage);
    modal.present();
  }
}
