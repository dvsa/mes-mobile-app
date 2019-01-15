import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

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
    public navController: NavController,
  ) {}

  startTest() {
    this.navController.push('WaitingRoomPage');
  }
}
