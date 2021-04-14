var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { SpeedCheckDebriefCardComponent } from './speed-check-debrief-card/speed-check-debrief-card';
var DebriefCatAMod1ComponentsModule = /** @class */ (function () {
    function DebriefCatAMod1ComponentsModule() {
    }
    DebriefCatAMod1ComponentsModule = __decorate([
        NgModule({
            declarations: [
                SpeedCheckDebriefCardComponent,
            ],
            imports: [
                ComponentsModule,
                CommonModule,
                IonicModule,
                TranslateModule,
            ],
            exports: [
                SpeedCheckDebriefCardComponent,
            ],
        })
    ], DebriefCatAMod1ComponentsModule);
    return DebriefCatAMod1ComponentsModule;
}());
export { DebriefCatAMod1ComponentsModule };
//# sourceMappingURL=debrief.cat-a-mod1.components.module.js.map