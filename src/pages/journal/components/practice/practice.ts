import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'practice',
  templateUrl: 'practice.html',
})

export class PracticeComponent {

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
  ) { }

  startPracticeTest() {
    const alert = this.alertCtrl.create({
      title: 'Record a driving fault?',
      message: 'Do you want to start this practice test with a driving fault recorded against the tell me question?',
      cssClass: 'text-zoom-regular',
      buttons: [
        {
          text: 'Yes',
          handler: this.recordFault,
        },
        {
          text: 'No',
          handler: this.noFault,
        },
      ],
    });
    alert.present();
  }

  noFault = () => {
    console.log('noFault');
    // this.store$.dispatch(new StartTest(this.slotId));
    // this.navController.push('TestReportPage');
  }

  recordFault = () => {
    console.log('recordFault');
    // this.store$.dispatch(new StartTest(this.slotId));
    // this.navController.push('TestReportPage');
  }

}
