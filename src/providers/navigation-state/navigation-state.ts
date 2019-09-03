import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { REKEY_SEARCH_PAGE } from '../../pages/page-names.constants';

@Injectable()
export class NavigationStateProvider {

  constructor(private navController: NavController) { }

  public isRekeySearch(): boolean {
    return this.navController.getActive().id === REKEY_SEARCH_PAGE;
  }

}
