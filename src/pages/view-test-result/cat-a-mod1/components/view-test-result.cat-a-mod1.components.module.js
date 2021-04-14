var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DebriefCardComponent } from './debrief-card/debrief-card';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { ViewTestResultComponentsModule } from '../../components/view-test-result.components.module';
import { SpeedCardComponent } from './speed-card/speed-card';
import { TranslateModule } from '@ngx-translate/core';
var ViewTestResultCatAMod1ComponentsModule = /** @class */ (function () {
    function ViewTestResultCatAMod1ComponentsModule() {
    }
    ViewTestResultCatAMod1ComponentsModule = __decorate([
        NgModule({
            declarations: [
                DebriefCardComponent,
                SpeedCardComponent,
            ],
            imports: [
                CommonModule,
                IonicModule,
                ComponentsModule,
                ViewTestResultComponentsModule,
                TranslateModule,
            ],
            exports: [
                DebriefCardComponent,
                SpeedCardComponent,
            ],
        })
    ], ViewTestResultCatAMod1ComponentsModule);
    return ViewTestResultCatAMod1ComponentsModule;
}());
export { ViewTestResultCatAMod1ComponentsModule };
//# sourceMappingURL=view-test-result.cat-a-mod1.components.module.js.map