var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { DirectivesModule } from '../../../directives/directives.module';
import { IpadIssueComponent } from './ipad-issue/ipad-issue';
import { TransferComponent } from './transfer/transfer';
import { OtherReasonComponent } from './other-reason/other-reason';
var RekeyReasonComponentsModule = /** @class */ (function () {
    function RekeyReasonComponentsModule() {
    }
    RekeyReasonComponentsModule = __decorate([
        NgModule({
            declarations: [
                IpadIssueComponent,
                TransferComponent,
                OtherReasonComponent,
            ],
            imports: [
                CommonModule,
                ComponentsModule,
                IonicModule,
                DirectivesModule,
            ],
            exports: [
                IpadIssueComponent,
                TransferComponent,
                OtherReasonComponent,
            ],
        })
    ], RekeyReasonComponentsModule);
    return RekeyReasonComponentsModule;
}());
export { RekeyReasonComponentsModule };
//# sourceMappingURL=rekey-reason.components.module.js.map