import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JOURNAL_PAGE } from '../../../page-names.constants';

@Component({
  selector: 'delegated-examiner-rekey',
  templateUrl: 'start-delegated-examiner-rekey.html',
})

export class StartDelegatedExaminerRekeyComponent {

  constructor(private navController: NavController) { }

  navigateToDelegatedRekey = () => {
    this.navController.push(JOURNAL_PAGE);
  }
}
