import { TestSlot } from '../../../common/domain/DJournal';

export class JournalSlot {
  constructor(
    public lastUpdated: Date,
    public slot: any
  ) { }
}
