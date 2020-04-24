import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@IonicPage()
@Component({
  selector: 'lw-sos-alert-modal',
  templateUrl: 'lw-sos-alert-modal.page.html',
})
export class LWSosAlertModal {

  constructor(private navController: NavController) {}

  close(): void {
    this.navController.pop();
  }
}
