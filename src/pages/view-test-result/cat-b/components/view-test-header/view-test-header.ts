import { Component, Input } from '@angular/core';
import { ViewTestHeaderModel } from './view-test-header.model';
import { ActivityCodes } from '../../../../../shared/models/activity-codes';

@Component({
  selector: 'view-test-header',
  templateUrl: 'view-test-header.html',
})
export class ViewTestHeaderComponent {

  @Input()
  data: ViewTestHeaderModel;

  constructor() {}

  isPassed(): boolean {
    return this.data.activityCode === ActivityCodes.PASS;
  }
}
