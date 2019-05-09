import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { StartPracticeTest } from '../../../../modules/tests/tests.actions';
import { TellMeQuestionDrivingFault, TellMeQuestionCorrect }
  from '../../../../modules/tests/test-data/test-data.actions';

@Component({
  selector: 'practice',
  templateUrl: 'practice.html',
})

export class PracticeCardComponent {

  slotId: number = 1;

  constructor(
    private store$: Store<StoreModel>,
    public alertController: AlertController,
    public navController: NavController,
  ) { }

  showDrivingFaultModal() {
    const alert = this.alertController.create({
      title: 'Record a driving fault?',
      message: 'Do you want to start this practice test with a driving fault recorded against the tell me question?',
      cssClass: 'text-zoom-regular',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.startPracticeTest(true),
        },
        {
          text: 'No',
          handler: () => this.startPracticeTest(false),
        },
      ],
    });
    alert.present();
  }

  startPracticeTest = (addFault: boolean) => {
    this.store$.dispatch(new StartPracticeTest(this.slotId));
    if (addFault) {
      this.store$.dispatch(new TellMeQuestionDrivingFault());
    } else {
      this.store$.dispatch(new TellMeQuestionCorrect());
    }
    this.navController.push('TestReportPage');
  }

}
