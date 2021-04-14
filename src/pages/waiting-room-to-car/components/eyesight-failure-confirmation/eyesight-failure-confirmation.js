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
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { ActivityCodes } from '../../../../shared/models/activity-codes';
import { SetActivityCode } from '../../../../modules/tests/activity-code/activity-code.actions';
var EyesightFailureConfirmationComponent = /** @class */ (function () {
    function EyesightFailureConfirmationComponent(navController, store$) {
        this.navController = navController;
        this.store$ = store$;
    }
    EyesightFailureConfirmationComponent.prototype.onCancel = function () {
        this.cancelFn();
    };
    EyesightFailureConfirmationComponent.prototype.onContinue = function () {
        this.navController.push(this.nextPageOnFail);
        this.store$.dispatch(new SetActivityCode(ActivityCodes.FAIL_EYESIGHT));
    };
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], EyesightFailureConfirmationComponent.prototype, "cancelFn", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], EyesightFailureConfirmationComponent.prototype, "nextPageOnFail", void 0);
    EyesightFailureConfirmationComponent = __decorate([
        Component({
            selector: 'eyesight-failure-confirmation',
            templateUrl: 'eyesight-failure-confirmation.html',
        }),
        __metadata("design:paramtypes", [NavController,
            Store])
    ], EyesightFailureConfirmationComponent);
    return EyesightFailureConfirmationComponent;
}());
export { EyesightFailureConfirmationComponent };
//# sourceMappingURL=eyesight-failure-confirmation.js.map