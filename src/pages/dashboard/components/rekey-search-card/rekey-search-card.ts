import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { REKEY_SEARCH_PAGE } from '../../../page-names.constants';

@Component({
  selector: 'rekey-search-card',
  templateUrl: 'rekey-search-card.html',
})

export class RekeySearchCardComponent {

  @Input()
  isDelegated: boolean = false;

  constructor(private navController: NavController) { }

  navigateToRekeySearch = () => {
    this.navController.push(REKEY_SEARCH_PAGE);
  }

}
