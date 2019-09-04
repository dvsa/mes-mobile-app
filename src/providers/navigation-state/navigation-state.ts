import { Injectable } from '@angular/core';
import { REKEY_SEARCH_PAGE } from '../../pages/page-names.constants';
import { NavigationProvider } from './../navigation/navigation';

@Injectable()
export class NavigationStateProvider {

  constructor(private navigation: NavigationProvider) {}

  public isRekeySearch(): boolean {
    return this.navigation.getActive().id === REKEY_SEARCH_PAGE;
  }

}
