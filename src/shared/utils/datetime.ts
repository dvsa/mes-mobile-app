import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeUtility {
  constructor() {}

  /**
   * extract time from date time stamp
   *
   * @param {string} datetimeStamp
   * @memberof dateTimeUtility
   */
  getTime(timeStamp) {
    return new Date(timeStamp).toISOString().slice(-13, -8);
  }
}
