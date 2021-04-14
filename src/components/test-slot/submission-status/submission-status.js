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
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';
var SubmissionStatusComponent = /** @class */ (function () {
    function SubmissionStatusComponent() {
        var _this = this;
        this.showBanner = function () { return _this.testStatus === TestStatus.Completed; };
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SubmissionStatusComponent.prototype, "testStatus", void 0);
    SubmissionStatusComponent = __decorate([
        Component({
            selector: 'submission-status',
            templateUrl: 'submission-status.html',
        }),
        __metadata("design:paramtypes", [])
    ], SubmissionStatusComponent);
    return SubmissionStatusComponent;
}());
export { SubmissionStatusComponent };
//# sourceMappingURL=submission-status.js.map