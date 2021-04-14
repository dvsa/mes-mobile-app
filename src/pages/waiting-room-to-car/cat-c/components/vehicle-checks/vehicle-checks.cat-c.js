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
import { CAT_C } from '../../../../page-names.constants';
import { ModalController } from 'ionic-angular';
import { App } from '../../../../../app/app.component';
import { get } from 'lodash';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestCategory } from '../../../../../modules/tests/category/category.reducer';
var VehicleChecksCatCComponent = /** @class */ (function () {
    function VehicleChecksCatCComponent(modalController, app, store$) {
        this.modalController = modalController;
        this.app = app;
        this.store$ = store$;
    }
    VehicleChecksCatCComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestCategory)).subscribe(function (category) {
            _this.category = category;
        });
    };
    VehicleChecksCatCComponent.prototype.openVehicleChecksModal = function () {
        var _this = this;
        var zoomClass = "modal-fullscreen " + this.app.getTextZoomClass();
        var modal = this.modalController.create(CAT_C.VEHICLE_CHECKS_MODAL, { category: this.category }, { cssClass: zoomClass });
        modal.onDidDismiss(function () {
            _this.onCloseVehicleChecksModal();
        });
        modal.present();
    };
    VehicleChecksCatCComponent.prototype.everyQuestionHasOutcome = function () {
        var hasOutcome = function (question) {
            var outcome = get(question, 'outcome', undefined);
            return outcome !== undefined;
        };
        return this.vehicleChecks.showMeQuestions.reduce(function (res, question) { return res && hasOutcome(question); }, true)
            && this.vehicleChecks.tellMeQuestions.reduce(function (res, question) { return res && hasOutcome(question); }, true);
    };
    VehicleChecksCatCComponent.prototype.hasSeriousFault = function () {
        return this.vehicleChecksScore.seriousFaults > 0;
    };
    VehicleChecksCatCComponent.prototype.hasDrivingFault = function () {
        return this.vehicleChecksScore.drivingFaults > 0;
    };
    VehicleChecksCatCComponent.prototype.incompleteVehicleChecks = function () {
        return { vehicleChecks: false };
    };
    VehicleChecksCatCComponent.prototype.validateVehicleChecks = function (c) {
        return this.everyQuestionHasOutcome() ? null : this.incompleteVehicleChecks();
    };
    VehicleChecksCatCComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl({
                value: 'Select questions',
                disabled: false,
            }, [this.validateVehicleChecks.bind(this)]);
            this.formGroup.addControl('vehicleChecksSelectQuestions', this.formControl);
        }
        this.formControl.patchValue('Select questions');
    };
    Object.defineProperty(VehicleChecksCatCComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], VehicleChecksCatCComponent.prototype, "onCloseVehicleChecksModal", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleChecksCatCComponent.prototype, "vehicleChecksScore", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleChecksCatCComponent.prototype, "vehicleChecks", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], VehicleChecksCatCComponent.prototype, "vehicleChecksSelectQuestions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], VehicleChecksCatCComponent.prototype, "formGroup", void 0);
    VehicleChecksCatCComponent = __decorate([
        Component({
            selector: 'vehicle-checks-cat-c',
            templateUrl: 'vehicle-checks.cat-c.html',
        }),
        __metadata("design:paramtypes", [ModalController,
            App,
            Store])
    ], VehicleChecksCatCComponent);
    return VehicleChecksCatCComponent;
}());
export { VehicleChecksCatCComponent };
//# sourceMappingURL=vehicle-checks.cat-c.js.map