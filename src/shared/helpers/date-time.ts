import * as moment from 'moment';

export class DateTime {
  moment: moment.Moment;

  constructor(sourceDateTime?: DateTime | string | Date) {
    if (sourceDateTime === undefined) {
      this.moment = moment();
    } else if (typeof sourceDateTime === 'string' || sourceDateTime instanceof Date) {
      this.moment = moment(sourceDateTime);
    } else {
      this.moment = moment(sourceDateTime.moment);
    }
  }

  static at(sourceDateTime: DateTime | string | Date): DateTime {
    return new DateTime(sourceDateTime);
  }

  add(amount: number, unit: Duration): DateTime {
    const momentUnit = unit.valueOf() as moment.unitOfTime.DurationConstructor;
    this.moment.add(amount, momentUnit);
    return this;
  }

  subtract(amount: number, unit: Duration): DateTime {
    const momentUnit = unit.valueOf() as moment.unitOfTime.DurationConstructor;
    this.moment.subtract(amount, momentUnit);
    return this;
  }

  format(formatString: string): string {
    return this.moment.format(formatString);
  }

  day(): number {
    return this.moment.day();
  }

  toString(): string {
    return this.moment.toString();
  }

  daysDiff(targetDate: DateTime | string | Date): number {
    const date = new DateTime(targetDate);
    const today = this.moment.startOf(Duration.DAY);
    return date.moment.startOf(Duration.DAY).diff(today, Duration.DAY);
  }

  static today(): Date {
    return moment().toDate();
  }
}

export enum Duration {
  DAY    = 'day',
  HOUR   = 'hour',
  MINUTE = 'minute',
  SECOND = 'second',
}
