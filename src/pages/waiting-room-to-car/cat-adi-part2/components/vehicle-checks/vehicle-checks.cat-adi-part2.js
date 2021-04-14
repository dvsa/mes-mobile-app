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
import { CAT_ADI_PART2 } from '../../../../page-names.constants';
import { ModalController } from 'ionic-angular';
import { App } from '../../../../../app/app.component';
import { get } from 'lodash';
var VehicleChecksCatADIPart2Component = /** @class */ (function () {
    function VehicleChecksCatADIPart2Component(modalController, app) {
        this.modalController = modalController;
        this.app = app;
    }
    VehicleChecksCatADIPart2Component.prototype.openVehicleChecksModal = function () {
        var _this = this;
        var zoomClass = "modal-fullscreen " + this.app.getTextZoomClass();
        var modal = this.modalController.create(CAT_ADI_PART2.VEHICLE_CHECKS_MODAL, {}, { cssClass: zoomClass });
        modal.onDidDismiss(function () {
            _this.onCloseVehicleChecksModal();
        });
        modal.present();
    };
    VehicleChecksCatADIPart2Component.prototype.everyQuestionHasOutcome = function () {
        var hasOutcome = function (question) {
            var outcome = get(question, 'outcome', undefined);
            return outcome !== undefined;
        };
        if (!this.vehicleChecks.tellMeQuestions) {
            return false;
        }
        return this.vehicleChecks.tellMeQuestions.reduce(function (res, question) { return res && hasOutcome(question); }, true);
    };
    VehicleChecksCatADIPart2Component.prototype.hasSeriousFault = function () {
        return this.vehicleChecksScore.seriousFaults > 0;
    };
    VehicleChecksCatADIPart2Component.prototype.hasDrivingFault = function () {
        return this.vehicleChecksScore.drivingFaults > 0;
    };
    VehicleChecksCatADIPart2Component.prototype.incompleteVehicleChecks = function () {
        return { vehicleChecks: false };
    };
    VehicleChecksCatADIPart2Component.prototype.validateVehicleChecks = function (c) {
        return this.everyQuestionHasOutcome() ? null : this.incompleteVehicleChecks();
    };
    VehicleChecksCatADIPart2Component.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl({
                value: 'Select questions',
                disabled: false,
            }, [this.validateVehicleChecks.bind(this)]);
            this.formGroup.addControl('vehicleChecksSelectQuestions', this.formControl);
        }
        this.formControl.patchValue('Select questions');
    };
    Object.defineProperty(VehicleChecksCatADIPart2Component.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], VehicleChecksCatADIPart2Component.prototype, "onCloseVehicleChecksModal", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleChecksCatADIPart2Component.prototype, "vehicleChecksScore", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleChecksCatADIPart2Component.prototype, "vehicleChecks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], VehicleChecksCatADIPart2Component.prototype, "vehicleChecksSelectQuestions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], VehicleChecksCatADIPart2Component.prototype, "formGroup", void 0);
    VehicleChecksCatADIPart2Component = __decorate([
        Component({
            selector: 'vehicle-checks-cat-adi-part-2',
            templateUrl: 'vehicle-checks.cat-adi-part2.html',
        }),
        __metadata("design:paramtypes", [ModalController,
            App])
    ], VehicleChecksCatADIPart2Component);
    return VehicleChecksCatADIPart2Component;
}());
export { VehicleChecksCatADIPart2Component };
//# sourceMappingURL=vehicle-checks.cat-adi-part2.js.map