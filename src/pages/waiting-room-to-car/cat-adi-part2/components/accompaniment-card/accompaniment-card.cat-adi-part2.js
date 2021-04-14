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
import { FormGroup } from '@angular/forms';
var AccompanimentCardCatADIPart2Component = /** @class */ (function () {
    function AccompanimentCardCatADIPart2Component() {
        this.instructorAccompanimentChange = new EventEmitter();
        this.supervisorAccompanimentChange = new EventEmitter();
        this.otherAccompanimentChange = new EventEmitter();
        this.interpreterAccompanimentChange = new EventEmitter();
    }
    AccompanimentCardCatADIPart2Component.prototype.instructorAccompanimentChanged = function () {
        this.instructorAccompanimentChange.emit();
    };
    AccompanimentCardCatADIPart2Component.prototype.supervisorAccompanimentChanged = function () {
        this.supervisorAccompanimentChange.emit();
    };
    AccompanimentCardCatADIPart2Component.prototype.otherAccompanimentChanged = function () {
        this.otherAccompanimentChange.emit();
    };
    AccompanimentCardCatADIPart2Component.prototype.interpreterAccompanimentChanged = function () {
        this.interpreterAccompanimentChange.emit();
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AccompanimentCardCatADIPart2Component.prototype, "instructorAccompaniment", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AccompanimentCardCatADIPart2Component.prototype, "supervisorAccompaniment", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AccompanimentCardCatADIPart2Component.prototype, "otherAccompaniment", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AccompanimentCardCatADIPart2Component.prototype, "interpreterAccompaniment", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], AccompanimentCardCatADIPart2Component.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AccompanimentCardCatADIPart2Component.prototype, "instructorAccompanimentChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AccompanimentCardCatADIPart2Component.prototype, "supervisorAccompanimentChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AccompanimentCardCatADIPart2Component.prototype, "otherAccompanimentChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AccompanimentCardCatADIPart2Component.prototype, "interpreterAccompanimentChange", void 0);
    AccompanimentCardCatADIPart2Component = __decorate([
        Component({
            selector: 'accompaniment-card-cat-adi-part2',
            templateUrl: 'accompaniment-card.cat-adi-part2.html',
        })
    ], AccompanimentCardCatADIPart2Component);
    return AccompanimentCardCatADIPart2Component;
}());
export { AccompanimentCardCatADIPart2Component };
//# sourceMappingURL=accompaniment-card.cat-adi-part2.js.map