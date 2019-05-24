import { ExaminerWorkSchedule } from './../../../shared/models/DJournal';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

const localJournalJson = require('../../../../mock/local-journal.json');

export class JournalProviderMock {

  static mockJournal: ExaminerWorkSchedule = localJournalJson;

  private do304ErrorNextCall = false;

  public getJournal(): Observable<ExaminerWorkSchedule> {
    if (this.do304ErrorNextCall) {
      return ErrorObservable.create({ status: 304 });
    }
    return of(JournalProviderMock.mockJournal);
  }
  public saveJournalForOffline = () => { };

  public setupHttp304Error() {
    this.do304ErrorNextCall = true;
  }
}
