import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import {
  EyesightFailCancelPressed,
} from '../../../../modules/ui-state/waiting-room-to-car/waiting-room-to-car.actions';

@Component({
  selector: 'eyesight-failure-confirmation',
  templateUrl: 'eyesight-failure-confirmation.html',
})
export class EyesightFailureConfirmationComponent {
  constructor(private store$: Store<StoreModel>) {
  }
  onCancel(): void {
    this.store$.dispatch(new EyesightFailCancelPressed());
  }
}
