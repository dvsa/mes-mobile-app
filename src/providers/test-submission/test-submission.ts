import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';

@Injectable()
export class TestSubmissionProvider {

  submitTests = (data: StandardCarTestCATBSchema[]): Observable<boolean> => {
    // TODO - Write in seperate sub task
    return of(true);
  }
}
