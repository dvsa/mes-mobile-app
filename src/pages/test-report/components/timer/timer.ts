import { Component } from '@angular/core';

@Component({
  selector: 'timer',
  templateUrl: 'timer.html',
})
export class TimerComponent {

  showStartTimerButton: boolean;

  interval: NodeJS.Timeout;
  seconds: number;
  timerString: string;
  touchTimeout: NodeJS.Timeout;
  touchState: boolean = false;
  touchStateDelay: number = 100;
  isPaused: boolean = true;

  constructor() {
    this.showStartTimerButton = true;
    this.seconds = 0;

    this.generateTimerString();
  }

  toggleTimer = (): void => {
    this.isPaused = !this.isPaused;
    return this.interval ? this.pauseTimer() : this.startTimer();
  }

  startTimer = (): void => {
    this.showStartTimerButton = false;
    this.interval = setInterval(() => {
      this.seconds += 1;
      this.generateTimerString();
    }, 1000);
  }

  pauseTimer = (): void => {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  generateTimerString = (): void => {
    const date: Date = new Date(1970, 0, 1 , 0 , 0, 0);
    date.setSeconds(this.seconds);

    const showExtraZeroHours = date.getHours() < 10;
    const showExtraZeroMinutes = date.getMinutes() < 10;
    const showExtraZeroSeconds = date.getSeconds() < 10;

    this.timerString = `${
        showExtraZeroHours ? '0' : ''}${date.getHours()}:${
        showExtraZeroMinutes ? '0' : ''}${date.getMinutes()}:${
        showExtraZeroSeconds ? '0' : ''}${date.getSeconds()
      }`;
  }

  onTouchStart(): void {
    clearTimeout(this.touchTimeout);
    this.touchState = true;
  }

  onTouchEnd(): void {
    // defer the removal of the touch state to allow the page to render
    this.touchTimeout = setTimeout(() => this.touchState = false, this.touchStateDelay);
  }
}
