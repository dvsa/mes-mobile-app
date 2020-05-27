import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreModel } from '../store/store.model';
import { ResetRaisedAlertState } from '../store/raised-alert/raised-alert.actions';

@Injectable()
export class RaisedAlertProvider {

  constructor(
      private store$: Store<StoreModel>,
  ) { }

  resetRaisedAlertState() :void {
    this.store$.dispatch(new ResetRaisedAlertState());
  }
}
