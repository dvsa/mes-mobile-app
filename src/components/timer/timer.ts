import { Component } from '@angular/core';

/**
 * Generated class for the TimerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class TimerComponent {
  secondsCounter: number;
  date: Date = new Date(null);
  timer: string;

  constructor() {
    this.secondsCounter = 0;
    this.date.setSeconds(this.secondsCounter);
    this.timer = '';
  }

  ngOnInit() {
    setInterval(() => {
      this.date = new Date(null);
      this.secondsCounter += 1;
      this.date.setSeconds(this.secondsCounter);
      const showExtraZeroMins = this.date.getMinutes() < 10;
      const showExtraZeroSecs = this.date.getSeconds() < 10;
      this.timer = `${showExtraZeroMins ? '0' : ''}${this.date.getMinutes()}:${
        showExtraZeroSecs ? '0' : ''
      }${this.date.getSeconds()}`;
    }, 1000);
  }
}
