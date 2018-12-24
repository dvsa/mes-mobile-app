export interface TestSlot {
  booking: any,
  slotDetail: any,
  testCentre: any,
  vehicleSlotType: string,
}

// TODO: This need to come out to it's own model file. But let's have a think about where and how.
export interface MesError {
  message: string,
  status: number,
  statusText: string,
}

export interface JournalModel {
  isLoading: boolean,
  testSlot: TestSlot[],
  error?: MesError,
}