import { isEmpty } from 'lodash';

import { JournalModel } from '../journal/journal.model';
import { Details } from './candidate-details.model';

import { SpecialNeedsCode } from './candidate-details.constants';
import { SlotTypes } from '../../shared/models/slot-types';
import { Application } from '../../shared/models/DJournal';

export const getSlots = (journal: JournalModel) => {
  return journal.slots[journal.selectedDate].map(slotItem => slotItem.slotData);
};

// TODO: replace any with Slot types when we have the data structure
export const getSlotById = (slots: any[], slotId: number): any => slots.find(slot => slot.slotDetail.slotId === slotId);

export const getCandidateName = (slot: any): string => {
  const { title, firstName, lastName } = slot.booking.candidate.candidateName;
  return `${title} ${firstName} ${lastName}`;
};

export const getTime = (slot: any): string => slot.slotDetail.start;

export const isCandidateCommentsEmpty = (slot: any): boolean => {
  return isEmpty(slot.booking.previousCancellation);
};

export const getCandidateId = (slot: any): string => slot.booking.candidate.candidateId;
export const isCandidateSpecialNeeds = (slot: any): boolean => !isEmpty(slot.booking.application.specialNeeds);
export const isCandidateCheckNeeded = (slot: any): boolean => slot.booking.application.entitlementCheck;
export const getEntitlementCheckText = (): string => 'Entitlement check is required. Call deployment';
export const getSlotChanged = (slot: any): boolean => slot.hasSlotChanged;

export const getPhoneNumber = (candidate: any): string => {
  if (!isEmpty(candidate.mobileTelephone)) return candidate.mobileTelephone;
  if (!isEmpty(candidate.primaryTelephone)) return candidate.primaryTelephone;
  if (!isEmpty(candidate.secondaryTelephone)) return candidate.secondaryTelephone;
  return 'No phone number provided';
};

export const getSlotType = (slot: any): string => {
  const specialNeedsExtendedTest = slot.booking.application.specialNeedsExtendedTest;
  const specialNeedsCode = slot.booking.application.specialNeedsCode;
  const vehicleSlotTypeCode = slot.vehicleSlotTypeCode;

  // Check special case
  // Jira ticket is available here for more details: https://jira.i-env.net/browse/MES-1698
  if (vehicleSlotTypeCode === 6) {
    if (specialNeedsCode !== SpecialNeedsCode.NONE) {
      return SlotTypes.SINGLE_SLOT_SPECIAL_NEEDS;
    }
  }

  if (vehicleSlotTypeCode === 14) {
    if (specialNeedsCode !== SpecialNeedsCode.NONE) {
      return SlotTypes.SINGLE_SLOT_SPECIAL_NEEDS;
    }
  }

  // These are the non special cases

  if (specialNeedsExtendedTest) {
    if (specialNeedsCode === SpecialNeedsCode.NONE) {
      return SlotTypes.EXTENDED_TEST;
    }
    return SlotTypes.EXTENDED_TEST_SPECIAL_NEEDS;
  }

  if (specialNeedsCode === SpecialNeedsCode.NONE) {
    return SlotTypes.STANDARD_TEST;
  }
  if (specialNeedsCode === SpecialNeedsCode.YES) {
    return SlotTypes.STANDARD_TEST;
  }
  return SlotTypes.SPECIAL_NEEDS_EXTRA_TIME;
};

export const getDetails = (slot: any): Details => {
  const details: Details = {
    testCategory: `Category ${slot.booking.application.testCategory}`,
    slotType: getSlotType(slot),
    meetingPlace: slot.booking.application.meetingPlace,
    driverNumber: slot.booking.candidate.driverNumber,
    applicationRef: getApplicationRef(slot.booking.application),
    specialNeeds: processSpecialNeeds(slot),
    candidateComments: {
      isSectionEmpty: isCandidateCommentsEmpty(slot),
      previousCancellations: slot.booking.previousCancellation,
    },
    entitlementCheck: {
      show: isCandidateCheckNeeded(slot),
    },
    phoneNumber: getPhoneNumber(slot.booking.candidate),

    // TODO: remove the string literal when e-mail address is configured in the service
    email: slot.booking.candidate.emailAddress || 'e-mail unavailable',
    address: slot.booking.candidate.candidateAddress,
  };
  return details;
};
export const processSpecialNeeds = (slot: any): string | string[] => {
  return slot.booking.application.specialNeeds ? slot.booking.application.specialNeeds.split(';') : 'None';
};

export const getBusiness = (slot: any) => slot.booking.business;

export const getApplicationRef = (application: Application) : string =>
  `${application.applicationId}${application.bookingSequence}${application.checkDigit}`;
