import * as moment from 'moment';

import { SlotItem } from '../../../../../providers/slot-selector/slot-item';

// In order for the navigation to work we just need 3 days in slots
// The days can be empty because we don't care about the actual slots

const emptyDays = {
  [moment().add(0, 'day').format('YYYY-MM-DD')]: [],
  [moment().add(1, 'day').format('YYYY-MM-DD')]: [],
  [moment().add(2, 'day').format('YYYY-MM-DD')]: [],
};

const slots: {[k: string]: SlotItem[]} = emptyDays;

export default slots;
