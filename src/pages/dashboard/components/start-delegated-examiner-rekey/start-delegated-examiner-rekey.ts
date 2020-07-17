import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DELEGATED_REKEY_SEARCH_PAGE } from '../../../page-names.constants';

@Component({
  selector: 'delegated-examiner-rekey',
  templateUrl: 'start-delegated-examiner-rekey.html',
})

export class StartDelegatedExaminerRekeyComponent {

  constructor(private navController: NavController) { }

  public async navigateToDelegatedRekeySearch() {
    await this.navController.push(DELEGATED_REKEY_SEARCH_PAGE);
  }

}
