import { SlotItem } from '../../../../../providers/slot-selector/slot-item';
import { now, Duration } from '../../../../../common/date-time';

// In order for the navigation to work we just need 3 days in slots
// The days can be empty because we don't care about the actual slots

const emptyDays = {
  [now().add(0, Duration.DAY).format('YYYY-MM-DD')]: [],
  [now().add(1, Duration.DAY).format('YYYY-MM-DD')]: [],
  [now().add(2, Duration.DAY).format('YYYY-MM-DD')]: [],
};

const slots: {[k: string]: SlotItem[]} = emptyDays;

export default slots;
