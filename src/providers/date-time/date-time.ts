import { Injectable } from '@angular/core';

import { DateTime } from '../../shared/helpers/date-time';
import { AppConfigProvider } from '../app-config/app-config';
import { isEmpty } from 'lodash';

@Injectable()
export class DateTimeProvider {

  constructor(private appConfigProvider: AppConfigProvider) {}

  public now(): DateTime {
    const timeTravelDate = this.appConfigProvider.getAppConfig().timeTravelDate;
    if (isEmpty(timeTravelDate)) {
      return DateTime.now();
    }
    return DateTime.at(timeTravelDate);
  }

}
