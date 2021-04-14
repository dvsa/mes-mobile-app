var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { LicenseProvidedComponent } from './license-provided/license-provided';
import { PassCertificateNumberComponent } from './pass-certificate-number/pass-certificate-number';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { DirectivesModule } from '../../../directives/directives.module';
import { Code78Component } from './code-78/code-78';
import { LicenceProvidedWarningBannerComponent } from './licence-provided-warning-banner/licence-provided-warning-banner';
var PassFinalisationComponentsModule = /** @class */ (function () {
    function PassFinalisationComponentsModule() {
    }
    PassFinalisationComponentsModule = __decorate([
        NgModule({
            declarations: [
                LicenseProvidedComponent,
                PassCertificateNumberComponent,
                Code78Component,
                LicenceProvidedWarningBannerComponent,
            ],
            imports: [
                CommonModule,
                ComponentsModule,
                IonicModule,
                DirectivesModule,
            ],
            exports: [
                LicenseProvidedComponent,
                PassCertificateNumberComponent,
                Code78Component,
                LicenceProvidedWarningBannerComponent,
            ],
        })
    ], PassFinalisationComponentsModule);
    return PassFinalisationComponentsModule;
}());
export { PassFinalisationComponentsModule };
//# sourceMappingURL=pass-finalisation-components.module.js.map