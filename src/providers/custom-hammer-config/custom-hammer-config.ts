import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the HazardRecorderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomHammerConfigProvider {
  pressDuration: number = 300;
  change: Subject<any> = new Subject();

  constructor() {}

  getPressDuration() {
    return this.pressDuration;
  }

  setPressDuration(newDuration: number) {
    this.pressDuration = newDuration;
    this.change.next(this.pressDuration);
  }
}
