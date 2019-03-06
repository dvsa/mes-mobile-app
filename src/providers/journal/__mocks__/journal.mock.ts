import { ExaminerWorkSchedule } from './../../../shared/models/DJournal';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

const localJournalJson = require('../../../../mock/local-journal.json');

export class JournalProviderMock {

  static mockJournal: ExaminerWorkSchedule = localJournalJson;

  public getJournal(): Observable<ExaminerWorkSchedule> {
    return of(JournalProviderMock.mockJournal);
  }

}
