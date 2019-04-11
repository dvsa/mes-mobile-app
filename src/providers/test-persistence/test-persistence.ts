import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TestPersistenceProvider {

  constructor(
  ) {}

  persistAllTests(): Observable<string> {
    console.log('I will persist it for you...');
    return of('');
  }

}
