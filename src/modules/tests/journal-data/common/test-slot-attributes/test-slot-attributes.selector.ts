import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/common';
import { getSlotType } from '../../../../../shared/helpers/get-slot-type';
import moment from 'moment';

export const getTestTime = (attributes: TestSlotAttributes) => moment(attributes.start).format('HH:mm');
export const getTestDate = (attributes: TestSlotAttributes): string => moment(attributes.start).format('DD/MM/YYYY');
export const getTestStartDateTime = (attributes: TestSlotAttributes): string => attributes.start;
export const isExtendedTest = (attributes: TestSlotAttributes) => attributes.extendedTest || false;
export const isSpecialNeeds = (attributes: TestSlotAttributes) => attributes.specialNeeds || false;
export const getSlotId = (attributes: TestSlotAttributes) => attributes.slotId;
export const isWelshTest = (attributes: TestSlotAttributes) => attributes.welshTest;

export const extractTestSlotAttributes = (slotData): TestSlotAttributes => ({
  welshTest: slotData.booking.application.welshTest || false,
  slotId: slotData.slotDetail.slotId,
  start: slotData.slotDetail.start,
  specialNeeds: slotData.booking.application.specialNeeds ? true : false,
  specialNeedsCode: slotData.booking.application.specialNeedsCode,
  specialNeedsArray:
    slotData.booking.application.specialNeeds ? slotData.booking.application.specialNeeds.split(';') : ['None'],
  vehicleTypeCode: slotData.vehicleTypeCode,
  extendedTest: slotData.booking.application.extendedTest || false,
  examinerVisiting: slotData.examinerVisiting,
  previousCancellation: slotData.booking.previousCancellation,
  entitlementCheck: slotData.booking.application.entitlementCheck,
  slotType: getSlotType(slotData),
});
