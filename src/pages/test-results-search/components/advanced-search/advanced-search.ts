import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AdvancedSearchParams } from '../../../../providers/search/search.models';
import * as moment from 'moment';

@Component({
  selector: 'advanced-search',
  templateUrl: 'advanced-search.html',
})
export class AdvancedSearchComponent {

  @Input()
  showSpinner: boolean;

  @Output()
  onSearchTests = new EventEmitter<AdvancedSearchParams>();

  dtcNumber: string = '';
  staffNumber: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor() {}

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

    this.onSearchTests.emit(advancedSearchParams);
  }

  private dateToString(date: any) {
    return moment().year(date.year).month(date.month - 1).date(date.day).format('YYYY-MM-DD');
  }
}
