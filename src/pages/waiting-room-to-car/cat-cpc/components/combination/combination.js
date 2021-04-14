var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
var CombinationComponent = /** @class */ (function () {
    function CombinationComponent() {
        this.combinationChange = new EventEmitter();
    }
    CombinationComponent_1 = CombinationComponent;
    CombinationComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null, [Validators.required]);
            this.formGroup.addControl(CombinationComponent_1.fieldName, this.formControl);
        }
        this.formControl.patchValue(this.combination);
    };
    CombinationComponent.prototype.combinationChanged = function (combination) {
        this.combinationChange.emit(combination);
    };
    Object.defineProperty(CombinationComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var CombinationComponent_1;
    CombinationComponent.fieldName = 'combination';
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], CombinationComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CombinationComponent.prototype, "combinations", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CombinationComponent.prototype, "combination", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CombinationComponent.prototype, "combinationChange", void 0);
    CombinationComponent = CombinationComponent_1 = __decorate([
        Component({
            selector: 'combination',
            templateUrl: 'combination.html',
        })
    ], CombinationComponent);
    return CombinationComponent;
}());
export { CombinationComponent };
//# sourceMappingURL=combination.js.map