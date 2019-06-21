import { MesError } from '../../shared/models/mes-error.model';
import { SlotItem } from '../../providers/slot-selector/slot-item';
import { Examiner } from '@dvsa/mes-test-schema/categories/B';

export type Slot = {
  booking: any,
  slotDetail: any,
  testCentre: any,
  vehicleSlotType: string,
  activityCode?: string,
};

export type JournalModel = {
  isLoading: boolean,
  lastRefreshed: Date,
  slots: { [k: string]: SlotItem[] },
  error?: MesError,
  selectedDate: string,
  examiner: Examiner,
};

export interface ExaminerSlotItems {
  examiner: Examiner;
  slotItems: SlotItem[];
}

export interface ExaminerSlotItemsByDate {
  examiner: Examiner;
  slotItemsByDate: { [date: string]: SlotItem[] };
}
