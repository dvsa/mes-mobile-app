import { MesError } from '../../common/mes-error.model';
import { ExaminerWorkSchedule } from '../../common/domain/DJournal';
import { SlotItem } from '../../providers/slot-selector/slot-item';

export type TestSlot = {
  booking: any,
  slotDetail: any,
  testCentre: any,
  vehicleSlotType: string,
  activityCode?: string,
}

export type JournalModel = {
  isLoading: boolean,
  lastRefreshed: Date,
  data: ExaminerWorkSchedule,
  slots: SlotItem[],
  error?: MesError,
}