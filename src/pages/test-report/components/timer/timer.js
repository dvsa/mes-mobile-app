var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StartTimer } from '../../test-report.actions';
var TimerComponent = /** @class */ (function () {
    function TimerComponent(store$) {
        var _this = this;
        this.store$ = store$;
        this.isPaused = true;
        this.toggleTimer = function () {
            _this.isPaused = !_this.isPaused;
            return _this.interval ? _this.pauseTimer() : _this.startTimer();
        };
        this.startTimer = function () {
            _this.showStartTimerButton = false;
            _this.interval = setInterval(function () {
                _this.seconds += 1;
                _this.generateTimerString();
            }, 1000);
            _this.store$.dispatch(new StartTimer());
        };
        this.pauseTimer = function () {
            clearInterval(_this.interval);
            _this.interval = undefined;
        };
        this.generateTimerString = function () {
            var date = new Date(1970, 0, 1, 0, 0, 0);
            date.setSeconds(_this.seconds);
            var showExtraZeroHours = date.getHours() < 10;
            var showExtraZeroMinutes = date.getMinutes() < 10;
            var showExtraZeroSeconds = date.getSeconds() < 10;
            _this.timerString = "" + (showExtraZeroHours ? '0' : '') + date.getHours() + ":" + (showExtraZeroMinutes ? '0' : '') + date.getMinutes() + ":" + (showExtraZeroSeconds ? '0' : '') + date.getSeconds();
        };
        this.showStartTimerButton = true;
        this.seconds = 0;
        this.generateTimerString();
    }
    TimerComponent = __decorate([
        Component({
            selector: 'timer',
            templateUrl: 'timer.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], TimerComponent);
    return TimerComponent;
}());
export { TimerComponent };
//# sourceMappingURL=timer.js.map