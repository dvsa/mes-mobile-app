var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CAT_A_MOD2 } from '../../../../page-names.constants';
import { ModalController } from 'ionic-angular';
import { App } from '../../../../../app/app.component';
import { get } from 'lodash';
var VehicleChecksCatAMod2Component = /** @class */ (function () {
    function VehicleChecksCatAMod2Component(modalController, app) {
        this.modalController = modalController;
        this.app = app;
    }
    VehicleChecksCatAMod2Component.prototype.openVehicleChecksModal = function () {
        var _this = this;
        var zoomClass = "modal-fullscreen " + this.app.getTextZoomClass();
        var modal = this.modalController.create(CAT_A_MOD2.VEHICLE_CHECKS_MODAL, {}, { cssClass: zoomClass });
        modal.onDidDismiss(function () {
            _this.onCloseVehicleChecksModal();
        });
        modal.present();
    };
    VehicleChecksCatAMod2Component.prototype.everyQuestionHasOutcome = function () {
        var hasOutcome = function (question) {
            var outcome = get(question, 'outcome', undefined);
            return outcome !== undefined;
        };
        return this.safetyAndBalanceQuestions.safetyQuestions.reduce(function (res, question) { return res && hasOutcome(question); }, true)
            && this.safetyAndBalanceQuestions.balanceQuestions.reduce(function (res, question) { return res && hasOutcome(question); }, true);
    };
    VehicleChecksCatAMod2Component.prototype.hasDrivingFault = function () {
        return this.safetyAndBalanceQuestionsScore.drivingFaults > 0;
    };
    VehicleChecksCatAMod2Component.prototype.incompleteVehicleChecks = function () {
        return { vehicleChecks: false };
    };
    VehicleChecksCatAMod2Component.prototype.validateVehicleChecks = function (c) {
        return this.everyQuestionHasOutcome() ? null : this.incompleteVehicleChecks();
    };
    VehicleChecksCatAMod2Component.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl({
                value: 'Select questions',
                disabled: false,
            }, [this.validateVehicleChecks.bind(this)]);
            this.formGroup.addControl('safetyAndBalanceSelectQuestions', this.formControl);
        }
        this.formControl.patchValue('Select questions');
    };
    Object.defineProperty(VehicleChecksCatAMod2Component.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], VehicleChecksCatAMod2Component.prototype, "onCloseVehicleChecksModal", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleChecksCatAMod2Component.prototype, "safetyAndBalanceQuestionsScore", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleChecksCatAMod2Component.prototype, "safetyAndBalanceQuestions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], VehicleChecksCatAMod2Component.prototype, "safetyAndBalanceSelectQuestions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], VehicleChecksCatAMod2Component.prototype, "formGroup", void 0);
    VehicleChecksCatAMod2Component = __decorate([
        Component({
            selector: 'vehicle-checks-cat-a-mod2',
            templateUrl: 'vehicle-checks.html',
        }),
        __metadata("design:paramtypes", [ModalController,
            App])
    ], VehicleChecksCatAMod2Component);
    return VehicleChecksCatAMod2Component;
}());
export { VehicleChecksCatAMod2Component };
//# sourceMappingURL=vehicle-checks.js.map