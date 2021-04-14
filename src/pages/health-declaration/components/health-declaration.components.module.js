var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { SignatureComponent } from './signature/signature';
import { HealthDeclarationComponent } from './health-declaration/health-declaration';
import { ReceiptDeclarationComponent } from './receipt-declaration/receipt-declaration';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/common/common-components.module';
var HealthDeclarationComponentsModule = /** @class */ (function () {
    function HealthDeclarationComponentsModule() {
    }
    HealthDeclarationComponentsModule = __decorate([
        NgModule({
            declarations: [
                SignatureComponent,
                HealthDeclarationComponent,
                ReceiptDeclarationComponent,
            ],
            imports: [
                IonicModule,
                TranslateModule,
                ComponentsModule,
            ],
            exports: [
                SignatureComponent,
                HealthDeclarationComponent,
                ReceiptDeclarationComponent,
            ],
        })
    ], HealthDeclarationComponentsModule);
    return HealthDeclarationComponentsModule;
}());
export { HealthDeclarationComponentsModule };
//# sourceMappingURL=health-declaration.components.module.js.map