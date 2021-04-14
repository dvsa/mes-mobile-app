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
import { CAT_BE } from '../../../../page-names.constants';
import { ModalController } from 'ionic-angular';
import { App } from '../../../../../app/app.component';
import { get } from 'lodash';
var VehicleChecksCatBEComponent = /** @class */ (function () {
    function VehicleChecksCatBEComponent(modalController, app) {
        this.modalController = modalController;
        this.app = app;
    }
    VehicleChecksCatBEComponent.prototype.openVehicleChecksModal = function () {
        var _this = this;
        var zoomClass = "modal-fullscreen " + this.app.getTextZoomClass();
        var modal = this.modalController.create(CAT_BE.VEHICLE_CHECKS_MODAL, {}, { cssClass: zoomClass });
        modal.onDidDismiss(function () {
            _this.onCloseVehicleChecksModal();
        });
        modal.present();
    };
    VehicleChecksCatBEComponent.prototype.everyQuestionHasOutcome = function () {
        var hasOutcome = function (question) {
            var outcome = get(question, 'outcome', undefined);
            return outcome !== undefined;
        };
        return this.vehicleChecks.showMeQuestions.reduce(function (res, question) { return res && hasOutcome(question); }, true)
            && this.vehicleChecks.tellMeQuestions.reduce(function (res, question) { return res && hasOutcome(question); }, true);
    };
    VehicleChecksCatBEComponent.prototype.hasSeriousFault = function () {
        return this.vehicleChecksScore.seriousFaults > 0;
    };
    VehicleChecksCatBEComponent.prototype.hasDrivingFault = function () {
        return this.vehicleChecksScore.drivingFaults > 0;
    };
    VehicleChecksCatBEComponent.prototype.incompleteVehicleChecks = function () {
        return { vehicleChecks: false };
    };
    VehicleChecksCatBEComponent.prototype.validateVehicleChecks = function (c) {
        return this.everyQuestionHasOutcome() ? null : this.incompleteVehicleChecks();
    };
    VehicleChecksCatBEComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl({
                value: 'Select questions',
                disabled: false,
            }, [this.validateVehicleChecks.bind(this)]);
            this.formGroup.addControl('vehicleChecksSelectQuestions', this.formControl);
        }
        this.formControl.patchValue('Select questions');
    };
    Object.defineProperty(VehicleChecksCatBEComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], VehicleChecksCatBEComponent.prototype, "onCloseVehicleChecksModal", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleChecksCatBEComponent.prototype, "vehicleChecksScore", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleChecksCatBEComponent.prototype, "vehicleChecks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], VehicleChecksCatBEComponent.prototype, "vehicleChecksSelectQuestions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], VehicleChecksCatBEComponent.prototype, "formGroup", void 0);
    VehicleChecksCatBEComponent = __decorate([
        Component({
            selector: 'vehicle-checks-cat-be',
            templateUrl: 'vehicle-checks.html',
        }),
        __metadata("design:paramtypes", [ModalController,
            App])
    ], VehicleChecksCatBEComponent);
    return VehicleChecksCatBEComponent;
}());
export { VehicleChecksCatBEComponent };
//# sourceMappingURL=vehicle-checks.js.map