var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatCPCPage } from './office.cat-cpc.page';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { OfficeEffects } from '../office.effects';
import { AssessmentReportComponent } from './components/assessment-report/assessment-report';
import { CombinationComponent } from './components/combination/combination';
import { TestFinalisationComponentsModule } from '../../../components/test-finalisation/test-finalisation-component.module';
import { PassFinalisationComponentsModule } from '../../pass-finalisation/components/pass-finalisation-components.module';
import { PassCertificateDeclarationComponent } from './components/pass-certificate-declaration/pass-certificate-declaration';
var OfficeCatCPCPageModule = /** @class */ (function () {
    function OfficeCatCPCPageModule() {
    }
    OfficeCatCPCPageModule = __decorate([
        NgModule({
            declarations: [
                OfficeCatCPCPage,
                AssessmentReportComponent,
                CombinationComponent,
                PassCertificateDeclarationComponent,
            ],
            imports: [
                IonicPageModule.forChild(OfficeCatCPCPage),
                EffectsModule.forFeature([
                    OfficeAnalyticsEffects,
                    OfficeEffects,
                ]),
                ComponentsModule,
                OfficeComponentsModule,
                TestFinalisationComponentsModule,
                PassFinalisationComponentsModule,
            ],
            providers: [],
        })
    ], OfficeCatCPCPageModule);
    return OfficeCatCPCPageModule;
}());
export { OfficeCatCPCPageModule };
//# sourceMappingURL=office.cat-cpc.page.module.js.map