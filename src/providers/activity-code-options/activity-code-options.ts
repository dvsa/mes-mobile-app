import { Injectable } from '@angular/core';
import {
  ActivityCodeModel, activityCodeModelList,
  activityCodeModelListDelegatedExaminer,
} from '../../pages/office/components/activity-code/activity-code.constants';

@Injectable()
export class ActivityCodeOptionsProvider {
  public getActivityCode(delegatedExaminer: boolean): ActivityCodeModel[] {
    if (delegatedExaminer) return activityCodeModelListDelegatedExaminer;
    return activityCodeModelList;
  }
}
