var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { isValidStartDate, PRESS_TIME_TO_ENABLE_EDIT } from '../../../../shared/helpers/test-start-time';
var DateOfTest = /** @class */ (function () {
    function DateOfTest() {
        var _this = this;
        this.dateOfTestChange = new EventEmitter();
        this.setIsValidStartDateTime = new EventEmitter();
        this.isPressed = false;
        this.editMode = false;
        this.isInvalid = false;
        this.customTestDate = '';
        this.enableEdit = function () { return _this.editMode = true; };
        this.disableEdit = function () { return _this.editMode = false; };
    }
    DateOfTest.prototype.ngOnInit = function () {
        this.customTestDate = moment(this.dateOfTest, 'DD/MM/YYYY').format('YYYY-MM-DD');
        this.maxDate = moment().format('YYYY-MM-DD');
        this.minDate = moment().subtract(1, 'years').format('YYYY-MM-DD');
    };
    DateOfTest.prototype.datePickerChange = function () {
        var currentDate = moment().format('YYYY-MM-DD');
        if (!isValidStartDate(this.customTestDate, currentDate)) {
            this.isInvalid = true;
            this.setIsValidStartDateTime.emit(false);
            return;
        }
        this.isInvalid = false;
        this.setIsValidStartDateTime.emit(true);
        this.dateOfTestChange.emit(this.customTestDate);
        this.disableEdit();
    };
    DateOfTest.prototype.datePickerCancel = function () {
        this.disableEdit();
    };
    DateOfTest.prototype.onTouchStart = function () {
        this.isPressed = true;
        this.timeoutId = setTimeout(function (component) {
            if (component.isPressed) {
                component.editMode = true;
            }
        }, PRESS_TIME_TO_ENABLE_EDIT, this);
    };
    DateOfTest.prototype.onTouchEnd = function () {
        this.isPressed = false;
        clearTimeout(this.timeoutId);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DateOfTest.prototype, "dateOfTest", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DateOfTest.prototype, "dateOfTestChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DateOfTest.prototype, "setIsValidStartDateTime", void 0);
    __decorate([
        ViewChild('editDateInput'),
        __metadata("design:type", ElementRef)
    ], DateOfTest.prototype, "inputEl", void 0);
    DateOfTest = __decorate([
        Component({
            selector: 'date-of-test',
            templateUrl: 'date-of-test.html',
        })
    ], DateOfTest);
    return DateOfTest;
}());
export { DateOfTest };
//# sourceMappingURL=date-of-test.js.map