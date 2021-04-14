var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appInfoReducer } from './app-info.reducer';
import { AppInfoEffects } from './app-info.effects';
var AppInfoModule = /** @class */ (function () {
    function AppInfoModule() {
    }
    AppInfoModule = __decorate([
        NgModule({
            imports: [
                StoreModule.forFeature('appInfo', appInfoReducer),
                EffectsModule.forFeature([AppInfoEffects]),
            ],
            providers: [
                AppVersion,
            ],
        })
    ], AppInfoModule);
    return AppInfoModule;
}());
export { AppInfoModule };
//# sourceMappingURL=app-info.module.js.map