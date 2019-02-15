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

  static now(): DateTime {
    return new DateTime();
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

  daysDiff(targetDateTime: string): number {
    const today = this.moment.startOf('day');
    const startOfDay = moment(targetDateTime, 'YYYY-MM-DD').startOf('day');
    return(moment.duration(startOfDay.diff(today)).asDays());
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

  daysUntil(targetDate: DateTime | string | Date): number {
    const date = new DateTime(targetDate);
    return date.moment.startOf(Duration.DAY).diff(this.moment.startOf(Duration.DAY), Duration.DAY);
  }
}

export enum Duration {
  DAY    = 'day',
  HOUR   = 'hour',
  MINUTE = 'minute',
  SECOND = 'second',
}
