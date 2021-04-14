var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { select, Store } from '@ngrx/store';
import { getAppInfoState } from '../../modules/app-info/app-info.reducer';
import { getVersionNumber, getEmployeeId } from '../../modules/app-info/app-info.selector';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { Device } from '@ionic-native/device';
import { Injectable } from '@angular/core';
var LogHelper = /** @class */ (function () {
    function LogHelper(device, store$) {
        var _this = this;
        this.device = device;
        this.store$ = store$;
        var versionNumber$ = this.store$.pipe(select(getAppInfoState), map(getVersionNumber), map(function (appVersion) { return _this.appVersion = appVersion; }));
        var employeeId$ = this.store$.pipe(select(getAppInfoState), map(getEmployeeId), map(function (employeeId) { return _this.employeeId = employeeId; }));
        merge(versionNumber$, employeeId$).subscribe();
    }
    LogHelper.prototype.createLog = function (logType, desc, error) {
        return {
            message: error,
            type: logType,
            timestamp: Date.now(),
            description: desc,
            appVersion: this.appVersion,
            iosVersion: this.device.version,
            deviceId: this.device.uuid,
            drivingExaminerId: this.employeeId,
        };
    };
    LogHelper = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Device,
            Store])
    ], LogHelper);
    return LogHelper;
}());
export { LogHelper };
//# sourceMappingURL=logsHelper.js.map