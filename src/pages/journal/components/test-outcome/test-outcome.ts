import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../common/store.model';
import { TestOutcomeStartTest } from './test-outcome.actions';


@Component({
  selector: 'test-outcome',
  templateUrl: 'test-outcome.html'
})
export class TestOutcomeComponent {
  @Input()
  slot: any;

  canStartTest: boolean = true;
  canSubmitTest: boolean = false
  outcome: string = '0';

  constructor(
    private store$: Store<StoreModel>,
    public navController: NavController
  ) {}

  startTest() {
    this.store$.dispatch(new TestOutcomeStartTest());
    this.navController.push('WaitingRoomPage');
  }
}
