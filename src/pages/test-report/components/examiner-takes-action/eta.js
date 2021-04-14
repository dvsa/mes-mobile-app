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
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { ToggleETA } from '../../../../modules/tests/test-data/common/eta/eta.actions';
import { getETA, hasExaminerTakenAction } from '../../../../modules/tests/test-data/common/test-data.selector';
import { ExaminerActions } from '../../../../modules/tests/test-data/test-data.constants';
import { etaLabels } from './eta.constants';
var EtaComponent = /** @class */ (function () {
    function EtaComponent(store$) {
        var _this = this;
        this.store$ = store$;
        this.touchStateDelay = 100;
        this.touchState = false;
        this.getLabel = function () { return etaLabels[_this.eta]; };
        this.toggleETA = function () {
            _this.store$.dispatch(new ToggleETA(_this.eta));
        };
    }
    EtaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.componentState = {
            actionTaken$: this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getETA), select(function (eta) { return hasExaminerTakenAction(eta, _this.eta); })),
        };
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], EtaComponent.prototype, "eta", void 0);
    EtaComponent = __decorate([
        Component({
            selector: 'eta',
            templateUrl: 'eta.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], EtaComponent);
    return EtaComponent;
}());
export { EtaComponent };
//# sourceMappingURL=eta.js.map