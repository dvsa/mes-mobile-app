import { Component, Input } from '@angular/core';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import { DateTime } from '../../../../shared/helpers/date-time';
import { Name } from '@dvsa/mes-test-schema/categories/B';

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

  getName(): string {
    const name: Name = this.searchResult.candidateName;
    return `${name.title} ${name.firstName} ${name.lastName}`;
  }
}
