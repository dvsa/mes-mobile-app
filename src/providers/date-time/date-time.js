var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { DateTime } from '../../shared/helpers/date-time';
import { AppConfigProvider } from '../app-config/app-config';
import { isEmpty } from 'lodash';
var DateTimeProvider = /** @class */ (function () {
    function DateTimeProvider(appConfigProvider) {
        this.appConfigProvider = appConfigProvider;
    }
    DateTimeProvider.prototype.now = function () {
        var timeTravelDate = this.appConfigProvider.getAppConfig().timeTravelDate;
        if (isEmpty(timeTravelDate)) {
            return new DateTime();
        }
        return DateTime.at(timeTravelDate);
    };
    DateTimeProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AppConfigProvider])
    ], DateTimeProvider);
    return DateTimeProvider;
}());
export { DateTimeProvider };
//# sourceMappingURL=date-time.js.map