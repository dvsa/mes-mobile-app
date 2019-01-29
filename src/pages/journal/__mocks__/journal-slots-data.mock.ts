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

const slots:{[k: string]: SlotItem[]} = groupBy(slotItems, (slot: SlotItem) => moment(slot.slotData.slotDetail.start).format('YYYY-MM-DD'));

export default slots;