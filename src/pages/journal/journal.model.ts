import { MesError } from '../../common/mes-error.model';
import { ExaminerWorkSchedule } from '../../common/domain/DJournal';

export type TestSlot = {
  booking: any,
  slotDetail: any,
  testCentre: any,
  vehicleSlotType: string,
}

export type JournalModel = {
  isLoading: boolean,
  lastRefreshed: Date,
  data: ExaminerWorkSchedule,
  slotChanges: boolean[],
  error?: MesError,
}