var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ErrorTypes } from '../../../shared/models/error-message';
import { Component, Output, EventEmitter, Input } from '@angular/core';
export var additionalText;
(function (additionalText) {
    additionalText["JOURNAL"] = "and try again later.";
    additionalText["STANDARD_TEXT"] = "and try again.";
})(additionalText || (additionalText = {}));
var ErrorMessageComponent = /** @class */ (function () {
    function ErrorMessageComponent() {
        var _this = this;
        this.adviceToUsePaperTest = false;
        this.exitModal = new EventEmitter();
        this.goBack = function () {
            _this.exitModal.emit();
        };
    }
    ErrorMessageComponent.prototype.ngOnInit = function () {
        switch (this.returnTo) {
            case ErrorTypes.JOURNAL_REFRESH:
                this.additionalText = additionalText.JOURNAL;
                this.redirectLinkText = this.returnTo;
                break;
            case ErrorTypes.JOURNAL_DATA_MISSING:
                this.additionalText = additionalText.STANDARD_TEXT;
                this.redirectLinkText = 'Dashboard';
                this.adviceToUsePaperTest = true;
                break;
            default:
                this.additionalText = additionalText.STANDARD_TEXT;
                this.redirectLinkText = this.returnTo;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ErrorMessageComponent.prototype, "returnTo", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ErrorMessageComponent.prototype, "exitModal", void 0);
    ErrorMessageComponent = __decorate([
        Component({
            selector: 'error-message',
            templateUrl: 'error-message.html',
        }),
        __metadata("design:paramtypes", [])
    ], ErrorMessageComponent);
    return ErrorMessageComponent;
}());
export { ErrorMessageComponent };
//# sourceMappingURL=error-message.js.map