var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { logsReducer } from './logs.reducer';
import { LogsEffects } from './logs.effects';
import { DateTimeProvider } from '../../providers/date-time/date-time';
var LogsModule = /** @class */ (function () {
    function LogsModule() {
    }
    LogsModule = __decorate([
        NgModule({
            imports: [
                StoreModule.forFeature('logs', logsReducer),
                EffectsModule.forFeature([LogsEffects]),
            ],
            providers: [
                DateTimeProvider,
            ],
        })
    ], LogsModule);
    return LogsModule;
}());
export { LogsModule };
//# sourceMappingURL=logs.module.js.map