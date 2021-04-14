var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecialLegalRequirementModal } from './special-legal-requirement-modal';
import { ComponentsModule } from '../../../../components/common/common-components.module';
var SpecialLegalRequirementModalModule = /** @class */ (function () {
    function SpecialLegalRequirementModalModule() {
    }
    SpecialLegalRequirementModalModule = __decorate([
        NgModule({
            declarations: [
                SpecialLegalRequirementModal,
            ],
            imports: [
                IonicPageModule.forChild(SpecialLegalRequirementModal),
                ComponentsModule,
            ],
            exports: [
                SpecialLegalRequirementModal,
            ],
        })
    ], SpecialLegalRequirementModalModule);
    return SpecialLegalRequirementModalModule;
}());
export { SpecialLegalRequirementModalModule };
//# sourceMappingURL=special-legal-requirement-modal.module.js.map