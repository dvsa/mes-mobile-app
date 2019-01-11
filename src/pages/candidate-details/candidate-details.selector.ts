import { isEmpty } from 'lodash';

import { JournalModel } from '../journal/journal.model';
import { Details, SlotTypeView } from './candidate-details.model';
import { singleSlotType, doubleSlotType } from './candidate-details.constants';

export const getTestSlots = (journal: JournalModel) => journal.data.testSlot;

// TODO: replace any with TestSlot types when we have the data structure
export const getSlotById = (testSlots: any[], slotId: number): any => testSlots.find(testSlot => testSlot.slotDetail.slotId === slotId);

export const getCandidateName = (testSlot: any): string => `${testSlot.booking.candidate.candidateName.title} ${testSlot.booking.candidate.candidateName.firstName} ${testSlot.booking.candidate.candidateName.lastName}`;

export const getTime = (testSlot: any): string => testSlot.slotDetail.start;

export const getPhoneNumber = (candidate: any): string => {
  if (!isEmpty(candidate.mobileTelephone)) return candidate.mobileTelephone;
  if (!isEmpty(candidate.primaryTelephone)) return candidate.primaryTelephone;
  if (!isEmpty(candidate.secondaryTelephone)) return candidate.secondaryTelephone;
  return 'No phone number provided';
}

export const getSlotTypeView = (testSlot: any): SlotTypeView => isEmpty(testSlot.booking.application.specialNeeds) ? singleSlotType : doubleSlotType;

export const getCity = (address: any): string => {
  let city = '';
  if (!isEmpty(address.addressLine2)) city += address.addressLine2;
  if (!isEmpty(address.addressLine3)) city += `, ${address.addressLine3}`;
  if (!isEmpty(address.addressLine4)) city += `, ${address.addressLine4}`;
  if (!isEmpty(address.addressLine5)) city += `, ${address.addressLine5}`;

  return city
}

export const getDetails = (testSlot: any): Details => {
  const details: Details = {
    testCategory: {
      text: `Category ${testSlot.booking.application.testCategory}`,
      icon: testSlot.booking.application.testCategory,
    },
    slotType: getSlotTypeView(testSlot),
    driverNumber: testSlot.booking.candidate.driverNumber,
    applicationRef: testSlot.booking.application.applicationId,
    candidateComments: {
      specialNeeds: testSlot.booking.application.specialNeeds,
      previousCancellations: testSlot.booking.previousCancellation
    },
    phoneNumber: getPhoneNumber(testSlot.booking.candidate),

    // TODO: remove the string literal when e-mail address is configured in the service
    email: testSlot.booking.candidate.emailAddress || 'e-mail unavailable',
    address: {
      street: testSlot.booking.candidate.candidateAddress.addressLine1,
      city: getCity(testSlot.booking.candidate.candidateAddress),
      postcode: testSlot.booking.candidate.candidateAddress.postcode,
    }
  };
  return details;
}