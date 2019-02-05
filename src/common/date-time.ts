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

  add(amount: number, unit: Duration): DateTime {
    const momentUnit = unit.valueOf() as moment.unitOfTime.DurationConstructor;
    this.moment.add(amount, momentUnit);
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
}

export enum Duration {
  DAY    = 'day',
  HOUR   = 'hour',
  MINUTE = 'minute',
  SECOND = 'second',
}

export const now = () => new DateTime();
export const at = (sourceDateTime: DateTime | string | Date) => new DateTime(sourceDateTime);

export default {
  DateTime,
  Duration,
  now,
  at,
};
