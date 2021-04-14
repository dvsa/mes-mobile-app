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
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../../../modules/tests/communication-preferences/communication-preferences.model';
import { configureI18N } from '../../../../shared/helpers/translation.helpers';
var PrivacyNoticeComponent = /** @class */ (function () {
    function PrivacyNoticeComponent(translate) {
        this.translate = translate;
        this.isRider = false;
    }
    PrivacyNoticeComponent.prototype.ngOnInit = function () {
        configureI18N(this.language, this.translate);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PrivacyNoticeComponent.prototype, "language", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PrivacyNoticeComponent.prototype, "isRider", void 0);
    PrivacyNoticeComponent = __decorate([
        Component({
            selector: 'privacy-notice',
            templateUrl: 'privacy-notice.html',
        }),
        __metadata("design:paramtypes", [TranslateService])
    ], PrivacyNoticeComponent);
    return PrivacyNoticeComponent;
}());
export { PrivacyNoticeComponent };
//# sourceMappingURL=privacy-notice.js.map