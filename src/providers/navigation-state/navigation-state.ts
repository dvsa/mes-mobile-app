import { Injectable } from '@angular/core';
import { REKEY_SEARCH_PAGE } from '../../pages/page-names.constants';
import { NavigationHelper } from './navigation-helper';

@Injectable()
export class NavigationStateProvider {

  constructor(private navigation: NavigationHelper) {}

  public isRekeySearch(): boolean {
    return this.navigation.getActive().id === REKEY_SEARCH_PAGE;
  }

}
