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
import { VehicleChecksCardCatBComponent } from './vehicle-checks-card-cat-b/vehicle-checks-card.cat-b';
import { ComponentsModule } from '../../../../components/common/common-components.module';
var DebriefCatBComponentsModule = /** @class */ (function () {
    function DebriefCatBComponentsModule() {
    }
    DebriefCatBComponentsModule = __decorate([
        NgModule({
            declarations: [
                VehicleChecksCardCatBComponent,
            ],
            imports: [
                ComponentsModule,
                CommonModule,
                IonicModule,
                TranslateModule,
            ],
            exports: [
                VehicleChecksCardCatBComponent,
            ],
        })
    ], DebriefCatBComponentsModule);
    return DebriefCatBComponentsModule;
}());
export { DebriefCatBComponentsModule };
//# sourceMappingURL=debrief.cat-b.components.module.js.map