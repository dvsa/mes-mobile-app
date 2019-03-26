import { Injectable } from '@angular/core';

import { DateTime } from '../../../shared/helpers/date-time';

@Injectable()
export class DateTimeProviderMock {

  constructor() {}

  public now(): DateTime {
    return DateTime.at('2019-02-01');
  }

}
