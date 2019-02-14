import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AnalyticsProvider } from '../../../../providers/analytics/analytics';
import {
  AnalyticsEventCategories,
  AnalyticsEvents,
} from '../../../../providers/analytics/analytics.model';

@Component({
  selector: 'test-outcome',
  templateUrl: 'test-outcome.html',
})
export class TestOutcomeComponent {
  @Input()
  slot: any;

  canStartTest: boolean = true;
  canSubmitTest: boolean = false;
  outcome: string = '0';

  constructor(
    public navController: NavController,
    public analytics: AnalyticsProvider,
  ) {}

  startTest() {
    this.analytics.logEvent(AnalyticsEventCategories.CLICK, AnalyticsEvents.START_TEST);
    this.navController.push('WaitingRoomPage');
  }
}
