import { isEmpty } from 'lodash';

import { JournalModel } from '../journal/journal.model';
import { Details } from './candidate-details.model';

import { SpecialNeedsCode } from './candidate-details.constants';

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
  return isEmpty(slot.booking.application.specialNeeds) && isEmpty(slot.booking.previousCancellation);
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
      return 'Single Slot (Special Needs)';
    }
  }

  if (vehicleSlotTypeCode === 14) {
    if (specialNeedsCode !== SpecialNeedsCode.NONE) {
      return 'Single Slot (Special Needs)';
    }
  }

  // These are the non special cases

  if (specialNeedsExtendedTest) {
    if (specialNeedsCode === SpecialNeedsCode.NONE) {
      return 'Extended Test';
    }
    return 'Extended Test Special Needs';
  }

  if (specialNeedsCode === SpecialNeedsCode.NONE) {
    return 'Standard Test';
  }
  if (specialNeedsCode === SpecialNeedsCode.YES) {
    return 'Standard Test';
  }
  return 'Special Needs Extra Time';
};

export const getCity = (address: any): string => {
  let city = '';
  if (!isEmpty(address.addressLine2)) city += address.addressLine2;
  if (!isEmpty(address.addressLine3)) city += `, ${address.addressLine3}`;
  if (!isEmpty(address.addressLine4)) city += `, ${address.addressLine4}`;
  if (!isEmpty(address.addressLine5)) city += `, ${address.addressLine5}`;

  return city;
};

export const getDetails = (slot: any): Details => {
  const details: Details = {
    testCategory: `Category ${slot.booking.application.testCategory}`,
    slotType: getSlotType(slot),
    driverNumber: slot.booking.candidate.driverNumber,
    applicationRef: slot.booking.application.applicationId,
    candidateComments: {
      isSectionEmpty: isCandidateCommentsEmpty(slot),
      specialNeeds: slot.booking.application.specialNeeds,
      previousCancellations: slot.booking.previousCancellation,
    },
    entitlementCheck: {
      show: isCandidateCheckNeeded(slot),
    },
    phoneNumber: getPhoneNumber(slot.booking.candidate),

    // TODO: remove the string literal when e-mail address is configured in the service
    email: slot.booking.candidate.emailAddress || 'e-mail unavailable',
    address: {
      street: slot.booking.candidate.candidateAddress.addressLine1,
      city: getCity(slot.booking.candidate.candidateAddress),
      postcode: slot.booking.candidate.candidateAddress.postcode,
    },
  };
  return details;
};
