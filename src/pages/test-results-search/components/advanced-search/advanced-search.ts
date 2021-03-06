import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AdvancedSearchParams } from '../../../../providers/search/search.models';
import { removeLeadingZeros } from '../../../../shared/helpers/formatters';

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

  customStartDateOptions: any = {
    buttons: [{
      text: 'Clear',
      handler: () => this.startDate = '',
    }],
  };

  customEndDateOptions: any = {
    buttons: [{
      text: 'Clear',
      handler: () => this.endDate = '',
    }],
  };

  constructor() {}

  dtcNumberChanged(val: string) {
    this.dtcNumber = val;
  }

  staffNumberChanged(val: string) {
    this.staffNumber = val;
  }

  searchTests() {
    const advancedSearchParams: AdvancedSearchParams = {
      startDate: this.startDate,
      endDate: this.endDate,
      staffNumber: removeLeadingZeros(this.staffNumber),
      costCode: this.dtcNumber,
    };

    this.onSearchTests.emit(advancedSearchParams);
  }

}
