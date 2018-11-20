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
        activityCode,
        details,
        slot: { testCentreName = '', start = '', vehicleSlotType: slotType = null },
        booking: {
          candidate: {
            candidateName = {
              firstName: '',
              lastName: '',
              secondName: '',
              thirdName: '',
              title: ''
            },
            _candidateId: candidateId = 0,
            driverNumber = '',
            candidateAddress = {
              line1: '',
              line2: '',
              line3: '',
              line4: '',
              line5: '',
              postcode: ''
            },
            email = '',
            mobileTelephone = ''
          },
          application: { checkMarker = false, _applicationId: appId = '', specialNeeds = null }
        }
      } = next;

      let journalEntry: IJournal = {
        candidateId,
        candidateName,
        candidateAddress,
        email,
        mobileTelephone,
        driverNumber,
        appId,
        testCentreName,
        checkMarker,
        specialNeeds,
        slotType,
        startTime: this.dateTimeUtil.getTime(start)
      };

      if (details) {
        journalEntry = { ...journalEntry, details };
      }

      if (activityCode) {
        journalEntry = { ...journalEntry, activityCode };
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
