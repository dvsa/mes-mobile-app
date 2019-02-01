import * as moment from 'moment';
import { groupBy } from 'lodash';

import { SlotItem } from '../../../providers/slot-selector/slot-item';

const localJournalJson = require('../../../../mock/local-journal.json');

const slotItems: SlotItem[] = localJournalJson.testSlots.map(testSlot => {
  return {
    hasSlotChanged: false,
    slotData: testSlot,
  }
});

const emptyDays = {
  [moment().add(0, 'day').format('YYYY-MM-DD')]: [],
  [moment().add(1, 'day').format('YYYY-MM-DD')]: [],
  [moment().add(2, 'day').format('YYYY-MM-DD')]: [],
  [moment().add(3, 'day').format('YYYY-MM-DD')]: [],
  [moment().add(4, 'day').format('YYYY-MM-DD')]: [],
  [moment().add(5, 'day').format('YYYY-MM-DD')]: [],
  [moment().add(6, 'day').format('YYYY-MM-DD')]: [],
};

const slots: {[k: string]: SlotItem[]} = {
  ...emptyDays,
  ...groupBy(slotItems, (slot: SlotItem) => moment(slot.slotData.slotDetail.start).format('YYYY-MM-DD')),
};

export default slots;