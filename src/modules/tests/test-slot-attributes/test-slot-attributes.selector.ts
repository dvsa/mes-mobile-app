import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/B';
import { DateTime } from '../../../shared/helpers/date-time';

export const getTestTime = (attributes: TestSlotAttributes) => DateTime.at(attributes.start).format('HH:mm');
export const getVehicleSlotType = (attributes: TestSlotAttributes) => attributes.vehicleSlotType || '';
export const getExtendedTest = (attributes: TestSlotAttributes) => attributes.extendedTest || false;
export const getSpecialNeeds = (attributes: TestSlotAttributes) => attributes.specialNeeds || '';
export const getSlotId = (attributes: TestSlotAttributes) => attributes.specialNeeds || '';
