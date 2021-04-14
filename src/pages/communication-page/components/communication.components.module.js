var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ProvidedEmailComponent } from './provided-email/provided-email';
import { NewEmailComponent } from './new-email/new-email';
import { PostalAddressComponent } from './postal-address/postal-address';
import { PrivacyNoticeComponent } from './privacy-notice/privacy-notice';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/common/common-components.module';
var CommunicationComponentsModule = /** @class */ (function () {
    function CommunicationComponentsModule() {
    }
    CommunicationComponentsModule = __decorate([
        NgModule({
            declarations: [
                ProvidedEmailComponent,
                NewEmailComponent,
                PostalAddressComponent,
                PrivacyNoticeComponent,
            ],
            imports: [
                CommonModule,
                ComponentsModule,
                IonicModule,
                TranslateModule,
            ],
            exports: [
                ProvidedEmailComponent,
                NewEmailComponent,
                PostalAddressComponent,
                PrivacyNoticeComponent,
            ],
        })
    ], CommunicationComponentsModule);
    return CommunicationComponentsModule;
}());
export { CommunicationComponentsModule };
//# sourceMappingURL=communication.components.module.js.map