var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DelegatedRekeySearchPage } from './delegated-rekey-search';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../components/common/common-components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { DelegatedRekeySearchEffects } from './delegated-rekey-search.effects';
import { StoreModule } from '@ngrx/store';
import { delegatedSearchReducer } from './delegated-rekey-search.reducer';
import { DelegatedRekeySearchProvider } from '../../providers/delegated-rekey-search/delegated-rekey-search';
import { CompressionProvider } from '../../providers/compression/compression';
import { TestSlotComponentsModule } from '../../components/test-slot/test-slot-components.module';
import { SlotProvider } from '../../providers/slot/slot';
import { SearchProvider } from '../../providers/search/search';
var DelegatedRekeySearchPageModule = /** @class */ (function () {
    function DelegatedRekeySearchPageModule() {
    }
    DelegatedRekeySearchPageModule = __decorate([
        NgModule({
            declarations: [
                DelegatedRekeySearchPage,
            ],
            imports: [
                IonicPageModule.forChild(DelegatedRekeySearchPage),
                StoreModule.forFeature('delegatedRekeySearch', delegatedSearchReducer),
                EffectsModule.forFeature([
                    DelegatedRekeySearchEffects,
                ]),
                ComponentsModule,
                TestSlotComponentsModule,
                DirectivesModule,
            ],
            providers: [
                DelegatedRekeySearchProvider,
                SearchProvider,
                CompressionProvider,
                SlotProvider,
            ],
        })
    ], DelegatedRekeySearchPageModule);
    return DelegatedRekeySearchPageModule;
}());
export { DelegatedRekeySearchPageModule };
//# sourceMappingURL=delegated-rekey-search.module.js.map