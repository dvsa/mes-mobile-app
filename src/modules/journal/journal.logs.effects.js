var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as journalActions from './journal.actions';
import * as logsActions from '../../modules/logs/logs.actions';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LogType } from '../../shared/models/log.model';
var JournalLogsEffects = /** @class */ (function () {
    function JournalLogsEffects(actions$, authenticationProvider) {
        var _this = this;
        this.actions$ = actions$;
        this.authenticationProvider = authenticationProvider;
        this.loadJournalFailureLogEffect$ = this.actions$.pipe(ofType(journalActions.LOAD_JOURNAL_FAILURE), switchMap(function (action) {
            var log = _this.createLog(LogType.ERROR, action.type);
            return of(new logsActions.SaveLog(log));
        }));
        this.loadJournalSilentFailureLogEffect$ = this.actions$.pipe(ofType(journalActions.LOAD_JOURNAL_SILENT_FAILURE), switchMap(function (action) {
            var log = _this.createLog(LogType.WARNING, action.type);
            return of(new logsActions.SaveLog(log));
        }));
    }
    JournalLogsEffects.prototype.createLog = function (logType, actionType) {
        var employeeId = this.authenticationProvider.getEmployeeId();
        return {
            type: logType,
            message: "DE with id: " + employeeId + " - " + actionType,
            timestamp: Date.now(),
            drivingExaminerId: employeeId,
        };
    };
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalLogsEffects.prototype, "loadJournalFailureLogEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], JournalLogsEffects.prototype, "loadJournalSilentFailureLogEffect$", void 0);
    JournalLogsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions,
            AuthenticationProvider])
    ], JournalLogsEffects);
    return JournalLogsEffects;
}());
export { JournalLogsEffects };
//# sourceMappingURL=journal.logs.effects.js.map