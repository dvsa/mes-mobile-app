import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ModalEvent } from '../../../test-report.constants';
import { speedCheckLabels } from '../../../../../shared/constants/competencies/cata-mod1-competencies';

@IonicPage()
@Component({
  selector: 'speed-check-modal',
  templateUrl: 'speed-check-modal.html',
})
export class SpeedCheckModal {

  speedCheck: speedCheckLabels[];

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
  ) {
    this.speedCheck = this.navParams.get('speedCheck');
  }

  onCancel() {
    this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }

  onTerminate() {
    this.viewCtrl.dismiss(ModalEvent.TERMINATE);
  }

}
