import { isEmpty } from 'lodash';

import { JournalModel } from "../journal/journal.model";
import { Details } from "./candidate-details.model";

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

export const getDetails = (testSlot: any): Details => {
  console.log('testSlot', testSlot);
  const details: Details = {
    testCategory: {
      text: `Category ${testSlot.booking.application.testCategory}`,
      icon: testSlot.booking.application.testCategory,
    },
    slotType: {
      text: 'Double slot (special needs)',
      icon: 'excalmation mark',
    },
    driverNumber: testSlot.booking.candidate.driverNumber,
    applicationRef: testSlot.booking.application.applicationId,
    candidateComments: 'none',
    phoneNumber: getPhoneNumber(testSlot),
    email: 'florencepearson@gmail.com',
    address: {
      street: testSlot.booking.candidate.candidateAddress.addressLine1,
      city: testSlot.booking.candidate.candidateAddress.addressLine2,
      postcode: testSlot.booking.candidate.candidateAddress.postcode,
    }
  };
  return details;
}