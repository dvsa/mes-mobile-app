import { of } from 'rxjs/observable/of';
import { searchResultsMock } from './search-results.mock';

export class SearchProviderMock {

  driverNumberSearch =
    jasmine.createSpy('driverNumberSearch').and.returnValue(of(searchResultsMock));

  applicationReferenceSearch =
    jasmine.createSpy('applicationReferenceSearch').and.returnValue(of(searchResultsMock));

  advancedSearch =
    jasmine.createSpy('advancedSearch').and.returnValue(of(searchResultsMock));
}
