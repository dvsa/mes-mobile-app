import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/B';
import { DateTime } from '../../../shared/helpers/date-time';

export const getTestTime = (attributes: TestSlotAttributes) => DateTime.at(attributes.start).format('HH:mm');
export const getVehicleSlotType = (attributes: TestSlotAttributes) => attributes.vehicleSlotType || '';
export const isExtendedTest = (attributes: TestSlotAttributes) => attributes.extendedTest || false;
export const isSpecialNeeds = (attributes: TestSlotAttributes) => attributes.specialNeeds || false;
export const getSlotId = (attributes: TestSlotAttributes) =>  attributes.slotId;
export const isWelshTest = (attributes: TestSlotAttributes) => attributes.welshTest;
export const extractTestSlotAttributes = (slotData): TestSlotAttributes => ({
  welshTest: slotData.booking.application.welshTest,
  slotId: slotData.slotDetail.slotId,
  start: slotData.slotDetail.start,
  specialNeeds: slotData.booking.application.specialNeeds ? true : false,
  vehicleSlotType: slotData.vehicleSlotType,
  extendedTest: slotData.booking.application.extendedTest,
});
