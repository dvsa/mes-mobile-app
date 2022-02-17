import { Injectable } from '@angular/core';
import { SlotItem } from './slot-item';
import { has, isEmpty, forOwn, isNil, isObject } from 'lodash';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { SearchResultTestSchema, ActivityCode } from '@dvsa/mes-search-schema';
import { ApplicationReference } from '@dvsa/mes-test-schema/categories/common';
import { formatApplicationReference } from '../../shared/helpers/formatters';

@Injectable()
export class SlotSelectorProvider {

  private ignoreBookingProperty: string[] = [
    'entitlementCheck',
    'extendedTest',
    'progressiveAccess',
    'specialNeeds',
    'vehicleSeats',
    'welshTest',
  ];
  constructor() { }

  isBookingEmptyOrNull = (slot: SlotItem): boolean => {
    const { slotData } = slot;
    if (!has(slotData, 'booking')) {
      return true;
    }
    let gotValue: boolean = false;
    if (isEmpty((<TestSlot>slotData).booking)) {
      return true;
    }
    gotValue = this.checkPropertiesHaveValues((<TestSlot>slotData).booking);
    return !gotValue;
  }

  private checkPropertiesHaveValues = (obj: any): boolean => {
    let gotValue: boolean = false;

    forOwn(obj, (value, key) => {
      if (this.ignoreBookingProperty.indexOf(key) < 0) {
        if (isObject(value)) {
          if (this.checkPropertiesHaveValues(value)) {
            gotValue = true;
          }
        } else if (!isNil(value)) {
          gotValue = true;
        }
      }
    });
    return gotValue;
  }

  hasSlotBeenTested(slotData: TestSlot, completedTests: SearchResultTestSchema[]): ActivityCode | null {
    if (isEmpty(completedTests)) {
      return null;
    }

    const applicationReference: ApplicationReference = {
      applicationId: slotData.booking.application.applicationId,
      bookingSequence: slotData.booking.application.bookingSequence,
      checkDigit: slotData.booking.application.checkDigit,
    };

    const completedTest = completedTests.find((compTest) => {
      return compTest.applicationReference === parseInt(formatApplicationReference(applicationReference), 10);
    });

    return completedTest ? completedTest.activityCode : null;
  }
}
