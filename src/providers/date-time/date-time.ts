import { Injectable } from '@angular/core';

import { DateTime } from '../../shared/helpers/date-time';
import { AppConfigProvider } from '../app-config/app-config';

@Injectable()
export class DateTimeProvider {

  constructor(private appConfigProvider: AppConfigProvider) {}

  public now(): DateTime {
    const timeTravelDate = this.appConfigProvider.getAppConfig().timeTravelDate;
    if (timeTravelDate) {
      return DateTime.at(timeTravelDate);
    }
    return DateTime.now();
  }

}
