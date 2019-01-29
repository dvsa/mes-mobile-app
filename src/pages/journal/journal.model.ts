import { MesError } from '../../common/mes-error.model';
import { SlotItem } from '../../providers/slot-selector/slot-item';

export type Slot = {
  booking: any,
  slotDetail: any,
  testCentre: any,
  vehicleSlotType: string,
  activityCode?: string,
}

export type JournalModel = {
  isLoading: boolean,
  isPolling: boolean,
  lastRefreshed: Date,
  slots: {[k: string]: SlotItem[]},
  error?: MesError,
  selectedDate: string,
}
