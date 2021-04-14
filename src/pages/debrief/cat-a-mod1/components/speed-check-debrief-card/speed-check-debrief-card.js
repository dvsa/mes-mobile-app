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
import { configureI18N } from '../../../../../shared/helpers/translation.helpers';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../../../../modules/tests/communication-preferences/communication-preferences.model';
var SpeedCheckDebriefCardComponent = /** @class */ (function () {
    function SpeedCheckDebriefCardComponent(translate) {
        this.translate = translate;
        this.isTranslatable = true;
    }
    SpeedCheckDebriefCardComponent.prototype.ngOnInit = function () {
        if (!this.isTranslatable) {
            configureI18N(Language.ENGLISH, this.translate);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SpeedCheckDebriefCardComponent.prototype, "emergencyStop", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SpeedCheckDebriefCardComponent.prototype, "avoidance", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SpeedCheckDebriefCardComponent.prototype, "avoidanceAttempted", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SpeedCheckDebriefCardComponent.prototype, "isTranslatable", void 0);
    SpeedCheckDebriefCardComponent = __decorate([
        Component({
            selector: 'speed-check-debrief-card',
            templateUrl: 'speed-check-debrief-card.html',
        }),
        __metadata("design:paramtypes", [TranslateService])
    ], SpeedCheckDebriefCardComponent);
    return SpeedCheckDebriefCardComponent;
}());
export { SpeedCheckDebriefCardComponent };
//# sourceMappingURL=speed-check-debrief-card.js.map