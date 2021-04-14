var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ConductedLanguageComponent } from './conducted-language/conducted-language';
import { IonicModule } from 'ionic-angular';
import { InsuranceDeclarationComponent } from './insurance-declaration/insurance-declaration';
import { TranslateModule } from '@ngx-translate/core';
import { ResidencyDeclarationComponent } from './residency-declaration/residency-declaration';
import { SignatureComponent } from './signature/signature';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { CBTNumberComponent } from './cbt-number/cbt-number';
import { DirectivesModule } from '../../../directives/directives.module';
var WaitingRoomComponentsModule = /** @class */ (function () {
    function WaitingRoomComponentsModule() {
    }
    WaitingRoomComponentsModule = __decorate([
        NgModule({
            declarations: [
                ConductedLanguageComponent,
                InsuranceDeclarationComponent,
                ResidencyDeclarationComponent,
                SignatureComponent,
                CBTNumberComponent,
            ],
            imports: [
                IonicModule,
                TranslateModule,
                ComponentsModule,
                DirectivesModule,
            ],
            exports: [
                ConductedLanguageComponent,
                InsuranceDeclarationComponent,
                ResidencyDeclarationComponent,
                SignatureComponent,
                CBTNumberComponent,
            ],
        })
    ], WaitingRoomComponentsModule);
    return WaitingRoomComponentsModule;
}());
export { WaitingRoomComponentsModule };
//# sourceMappingURL=waiting-room.components.module.js.map