var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ReverseDiagramPage } from './reverse-diagram-modal';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ReverseDiagramModalAnalyticsEffects } from './reverse-diagram-modal.analytics.effects';
import { ReversingDistancesProvider } from '../../../../providers/reversing-distances/reversing-distances';
import { NgModule } from '@angular/core';
var ReverseDiagramPageModule = /** @class */ (function () {
    function ReverseDiagramPageModule() {
    }
    ReverseDiagramPageModule = __decorate([
        NgModule({
            declarations: [
                ReverseDiagramPage,
            ],
            imports: [
                IonicPageModule.forChild(ReverseDiagramPage),
                EffectsModule.forFeature([ReverseDiagramModalAnalyticsEffects]),
            ],
            providers: [
                ReversingDistancesProvider,
            ],
        })
    ], ReverseDiagramPageModule);
    return ReverseDiagramPageModule;
}());
export { ReverseDiagramPageModule };
//# sourceMappingURL=reverse-diagram-modal.module.js.map