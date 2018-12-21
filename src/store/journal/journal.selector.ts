
import { JournalModel } from './journal.model';

export const getTestSlots = (journal: JournalModel) => {

  // console.log('journal', journal);

  return journal.testSlot;
}

// store.select(state => state.journal).subscribe(journal => journal.isLoading ? this.loader.present() : this.loader.dismiss());
// store.select(state => state.journal.testSlot).subscribe(testSlot => this.journalSlot = testSlot);
// store.select(state => state.journal.error).subscribe(error => error.message ? this.showError(error.message) : this.hasError = false);