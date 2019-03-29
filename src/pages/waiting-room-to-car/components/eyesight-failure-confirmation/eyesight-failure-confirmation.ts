import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import {
  EyesightFailCancelPressed,
  EyesightFailConfirmed,
} from '../../waiting-room-to-car.actions';

@Component({
  selector: 'eyesight-failure-confirmation',
  templateUrl: 'eyesight-failure-confirmation.html',
})
export class EyesightFailureConfirmationComponent {
  constructor(private store$: Store<StoreModel>) {}

  onConfirm(): void {
    this.store$.dispatch(new EyesightFailConfirmed());
  }

  onCancel(): void {
    this.store$.dispatch(new EyesightFailCancelPressed());
  }
}
