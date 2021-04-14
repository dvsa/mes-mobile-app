var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RekeySearchPage } from './rekey-search';
import { EffectsModule } from '@ngrx/effects';
import { RekeySearchAnalyticsEffects } from './rekey-search.analytics.effects';
import { ComponentsModule } from '../../components/common/common-components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { RekeySearchEffects } from './rekey-search.effects';
import { StoreModule } from '@ngrx/store';
import { rekeySearchReducer } from './rekey-search.reducer';
import { RekeySearchProvider } from '../../providers/rekey-search/rekey-search';
import { CompressionProvider } from '../../providers/compression/compression';
import { TestSlotComponentsModule } from '../../components/test-slot/test-slot-components.module';
import { SlotProvider } from '../../providers/slot/slot';
import { SearchProvider } from '../../providers/search/search';
var RekeySearchPageModule = /** @class */ (function () {
    function RekeySearchPageModule() {
    }
    RekeySearchPageModule = __decorate([
        NgModule({
            declarations: [
                RekeySearchPage,
            ],
            imports: [
                IonicPageModule.forChild(RekeySearchPage),
                StoreModule.forFeature('rekeySearch', rekeySearchReducer),
                EffectsModule.forFeature([
                    RekeySearchEffects,
                    RekeySearchAnalyticsEffects,
                ]),
                ComponentsModule,
                TestSlotComponentsModule,
                DirectivesModule,
            ],
            providers: [
                RekeySearchProvider,
                SearchProvider,
                CompressionProvider,
                SlotProvider,
            ],
        })
    ], RekeySearchPageModule);
    return RekeySearchPageModule;
}());
export { RekeySearchPageModule };
//# sourceMappingURL=rekey-search.module.js.map