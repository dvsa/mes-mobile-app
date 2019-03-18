import { SlotItem } from '../../../../../providers/slot-selector/slot-item';
import { DateTime, Duration } from '../../../../../shared/helpers/date-time';

// In order for the navigation to work we just need 3 days in slots
// The days can be empty because we don't care about the actual slots

const emptyDays = {
  [DateTime.at('2019-02-01').add(0, Duration.DAY).format('YYYY-MM-DD')]: [],
  [DateTime.at('2019-02-01').add(1, Duration.DAY).format('YYYY-MM-DD')]: [],
  [DateTime.at('2019-02-01').add(2, Duration.DAY).format('YYYY-MM-DD')]: [],
};

const slots: {[k: string]: SlotItem[]} = emptyDays;

export default slots;
