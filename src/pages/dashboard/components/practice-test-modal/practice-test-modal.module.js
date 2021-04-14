var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PracticeTestModal } from './practice-test-modal';
var PracticeTestModalModule = /** @class */ (function () {
    function PracticeTestModalModule() {
    }
    PracticeTestModalModule = __decorate([
        NgModule({
            declarations: [
                PracticeTestModal,
            ],
            imports: [
                IonicPageModule.forChild(PracticeTestModal),
            ],
            exports: [
                PracticeTestModal,
            ],
        })
    ], PracticeTestModalModule);
    return PracticeTestModalModule;
}());
export { PracticeTestModalModule };
//# sourceMappingURL=practice-test-modal.module.js.map