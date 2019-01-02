import { MesError } from '../../common/mes-error.model';

export type TestSlot = {
  booking: any,
  slotDetail: any,
  testCentre: any,
  vehicleSlotType: string,
}

export type JournalModel = {
  isLoading: boolean,
  testSlot: TestSlot[],
  error?: MesError,
}