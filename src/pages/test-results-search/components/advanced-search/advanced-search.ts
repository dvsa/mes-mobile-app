
import { Component } from '@angular/core';
import { SearchProvider } from '../../../../providers/search/search';
import { AdvancedSearchParams } from '../../../../providers/search/search.models';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as moment from 'moment';

@Component({
  selector: 'advanced-search',
  templateUrl: 'advanced-search.html',
})
export class AdvancedSearchComponent {

  dtcNumber: string = '';
  staffNumber: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private searchProvider: SearchProvider) {}

  dtcNumberChanged(val: string) {
    this.dtcNumber = val;
  }

  staffNumberChanged(val: string) {
    this.staffNumber = val;
  }

  startDateChanged(date: any) {
    this.startDate = this.dateToString(date);
  }

  endDateChanged(date: any) {
    this.endDate = this.dateToString(date);
  }

  searchTests() {
    const advancedSearchParams: AdvancedSearchParams = {
      isLDTM: true,
      startDate: this.startDate,
      endDate: this.endDate,
      staffNumber: this.staffNumber,
      costCode: this.dtcNumber,
    };

    this.searchProvider.advancedSearch(advancedSearchParams)
      .pipe(
        tap(data => console.log('Advanced Search', JSON.stringify(data))),
        catchError(err => of(console.log('ERROR', JSON.stringify(err)))),
      )
      .subscribe();
  }

  private dateToString(date: any) {
    return moment().year(date.year).month(date.month).day(date.day).format('YYYY-MM-DD');
  }
}
