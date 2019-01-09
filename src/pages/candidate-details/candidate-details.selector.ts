import { isEmpty } from 'lodash';

import { JournalModel } from '../journal/journal.model';
import { Details } from './candidate-details.model';

export const getTestSlots = (journal: JournalModel) => journal.data.testSlot;

// TODO: replace any with TestSlot types when we have the data structure
export const getSlotById = (testSlots: any[], slotId: number): any => testSlots.find(testSlot => testSlot.slotDetail.slotId === slotId);

export const getCandidateName = (testSlot: any): string => `${testSlot.booking.candidate.candidateName.title} ${testSlot.booking.candidate.candidateName.firstName} ${testSlot.booking.candidate.candidateName.lastName}`;

export const getTime = (testSlot: any): string => testSlot.slotDetail.start;

export const getPhoneNumber = (testSlot: any): string => {
  if (!isEmpty(testSlot.booking.candidate.mobileTelephone)) return testSlot.booking.candidate.mobileTelephone;
  if (!isEmpty(testSlot.booking.candidate.primaryTelephone)) return testSlot.booking.candidate.primaryTelephone;
  if (!isEmpty(testSlot.booking.candidate.secondaryTelephone)) return testSlot.booking.candidate.secondaryTelephone;
  return 'No phone number provided';
}

export const getSlotType = (testSlot: any): { text: string, icon: string } => {
  return isEmpty(testSlot.booking.application.specialNeeds) ? { 
    text: 'Single slot',
    icon: 'exclamation mark',
   } : {
    text: 'Double slot (special needs)',
    icon: 'no icon',
   };
}

export const getCity = (address: any): string => {
  let city = '';
  if (!isEmpty(address.addressLine2)) city += address.addressLine2;
  if (!isEmpty(address.addressLine3)) city += `, ${address.addressLine3}`;
  if (!isEmpty(address.addressLine4)) city += `, ${address.addressLine4}`;
  if (!isEmpty(address.addressLine5)) city += `, ${address.addressLine5}`;

  return city
}

export const getDetails = (testSlot: any): Details => {
  console.log('testSlot', testSlot);
  const details: Details = {
    testCategory: {
      text: `Category ${testSlot.booking.application.testCategory}`,
      icon: testSlot.booking.application.testCategory,
    },
    slotType: getSlotType(testSlot),
    driverNumber: testSlot.booking.candidate.driverNumber,
    applicationRef: testSlot.booking.application.applicationId,
    candidateComments: {
      specialNeeds: testSlot.booking.application.specialNeeds,
      previousCancellations: testSlot.booking.previousCancellation
    },
    phoneNumber: getPhoneNumber(testSlot),
    email: 'emailaddress@generic.info',
    address: {
      street: testSlot.booking.candidate.candidateAddress.addressLine1,
      city: getCity(testSlot.booking.candidate.candidateAddress),
      postcode: testSlot.booking.candidate.candidateAddress.postcode,
    }
  };
  return details;
}