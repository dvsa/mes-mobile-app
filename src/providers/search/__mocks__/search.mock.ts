import { Observable } from 'rxjs/Observable';

export class SearchProviderMock {

  driverNumberSearch =
    jasmine.createSpy('driverNumberSearch').and.returnValue(Observable.empty);

  applicationReferenceSearch =
    jasmine.createSpy('applicationReferenceSearch').and.returnValue(Observable.empty);

}
