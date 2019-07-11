import { Component, Input } from '@angular/core';
import { ViewTestHeader } from './view-test-header.model';
import { ActivityCodes } from '../../../../shared/models/activity-codes';

@Component({
  selector: 'view-test-header',
  templateUrl: 'view-test-header.html',
})
export class ViewTestHeaderComponent {

  @Input()
  data: ViewTestHeader;

  constructor() {}

  isPassed(): boolean {
    return this.data.activityCode === ActivityCodes.PASS;
  }
}
