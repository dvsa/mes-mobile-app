import { isEmpty } from 'lodash';

import { JournalModel } from '../journal/journal.model';
import { Details, SlotTypeView } from './candidate-details.model';
import { carStandardSlotType, carSpecialNeedsSlotType } from './candidate-details.constants';

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

export const getPhoneNumber = (candidate: any): string => {
  if (!isEmpty(candidate.mobileTelephone)) return candidate.mobileTelephone;
  if (!isEmpty(candidate.primaryTelephone)) return candidate.primaryTelephone;
  if (!isEmpty(candidate.secondaryTelephone)) return candidate.secondaryTelephone;
  return 'No phone number provided';
};

export const getSlotTypeView = (slot: any): SlotTypeView => {
  return isEmpty(slot.booking.application.specialNeeds) ? carStandardSlotType : carSpecialNeedsSlotType;
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
    testCategory: {
      text: `Category ${slot.booking.application.testCategory}`,
      icon: slot.booking.application.testCategory,
    },
    slotType: getSlotTypeView(slot),
    driverNumber: slot.booking.candidate.driverNumber,
    applicationRef: slot.booking.application.applicationId,
    candidateComments: {
      isSectionEmpty: isCandidateCommentsEmpty(slot),
      specialNeeds: slot.booking.application.specialNeeds,
      previousCancellations: slot.booking.previousCancellation,
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
