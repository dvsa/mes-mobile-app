var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { RekeyReasonCatHomeTestPage } from './rekey-reason.cat-home-test.page';
import { RekeyReasonComponentsModule } from '../components/rekey-reason.components.module';
import { RekeyReasonAnalyticsEffects } from '../rekey-reason.analytics.effects';
import { StoreModule } from '@ngrx/store';
import { RekeyReasonEffects } from '../rekey-reason.effects';
import { DirectivesModule } from '../../../directives/directives.module';
import { FindUserProvider } from '../../../providers/find-user/find-user';
import { rekeyReasonReducer } from '../rekey-reason.reducer';
var RekeyReasonCatHomeTestPageModule = /** @class */ (function () {
    function RekeyReasonCatHomeTestPageModule() {
    }
    RekeyReasonCatHomeTestPageModule = __decorate([
        NgModule({
            declarations: [
                RekeyReasonCatHomeTestPage,
            ],
            imports: [
                IonicPageModule.forChild(RekeyReasonCatHomeTestPage),
                StoreModule.forFeature('rekeyReason', rekeyReasonReducer),
                EffectsModule.forFeature([
                    RekeyReasonAnalyticsEffects,
                    RekeyReasonEffects,
                ]),
                DirectivesModule,
                ComponentsModule,
                RekeyReasonComponentsModule,
            ],
            providers: [
                FindUserProvider,
            ],
        })
    ], RekeyReasonCatHomeTestPageModule);
    return RekeyReasonCatHomeTestPageModule;
}());
export { RekeyReasonCatHomeTestPageModule };
//# sourceMappingURL=rekey-reason.cat-home-test.page.module.js.map