import { Component, Input } from '@angular/core';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import { DateTime } from '../../../../shared/helpers/date-time';

@Component({
  selector: 'search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultComponent {

  @Input()
  searchResult: SearchResultTestSchema;

  getDate(): string {
    return new DateTime(this.searchResult.testDate).format('DD/MM/YYYY');
  }

  getTime(): string {
    return new DateTime(this.searchResult.testDate).format('HH:mm');
  }

  // TODO - Get name when it works
  getName(): string {
    console.log('NAME', this.searchResult.candidateName);
    // const name: Name = this.searchResult.candidateName;
    // return `${name.title} ${name.firstName} ${name.lastName}`;
    return 'name';
  }
}
