import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IJournal, IJournalResp } from './journal-model';
import { DateTimeUtility } from '../../shared/utils/datetime';
import { AppConfigProvider } from '../app-config/app-config';
import 'rxjs/Rx';

/*
  Generated class for the JournalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JournalProvider {
  journalResp: IJournalResp;

  private apiUrl: string;

  constructor(
    private httpClient: HttpClient,
    private dateTimeUtil: DateTimeUtility,
    private appConfig: AppConfigProvider
  ) {
    this.apiUrl = this.appConfig.getJournalApiUrl();
  }

  transformSlotData(slots) {
    return slots.reduce((curr: IJournal[], next) => {
      const {
        details,
        slot: { testCentreName = '', start = '', vehicleSlotType: slotType = null },
        booking: {
          candidate: { candidateName = '', _candidateId: candidateId = 0 },
          application: { checkMarker = false, _applicationId: appId = '' }
        }
      } = next;

      let journalEntry: IJournal = {
        candidateId,
        candidateName,
        appId,
        testCentreName,
        checkMarker,
        slotType,
        startTime: this.dateTimeUtil.getTime(start)
      };

      if (details) {
        journalEntry = { ...journalEntry, details };
      }

      return curr.concat(journalEntry);
    }, []);
  }

  getData(email: string) {
    const endpoint = `${this.apiUrl}?email=${email}`;
    return this.httpClient.get<any>(endpoint).map((res) => {
      const { testSlots } = JSON.parse(res.body.data).data;
      return this.transformSlotData(testSlots);
    });
  }
}
