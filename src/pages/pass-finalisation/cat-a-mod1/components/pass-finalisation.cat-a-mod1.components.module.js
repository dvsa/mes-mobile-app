var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { PassCertificateNumberCatAMod1Component } from './pass-certificate-number/pass-certificate-number.cat-a-mod1';
import { ComponentsModule } from '../../../../components/common/common-components.module';
var PassFinalisationCatAMod1ComponentsModule = /** @class */ (function () {
    function PassFinalisationCatAMod1ComponentsModule() {
    }
    PassFinalisationCatAMod1ComponentsModule = __decorate([
        NgModule({
            declarations: [
                PassCertificateNumberCatAMod1Component,
            ],
            imports: [
                IonicModule,
                CommonModule,
                ComponentsModule,
            ],
            exports: [
                PassCertificateNumberCatAMod1Component,
            ],
        })
    ], PassFinalisationCatAMod1ComponentsModule);
    return PassFinalisationCatAMod1ComponentsModule;
}());
export { PassFinalisationCatAMod1ComponentsModule };
//# sourceMappingURL=pass-finalisation.cat-a-mod1.components.module.js.map