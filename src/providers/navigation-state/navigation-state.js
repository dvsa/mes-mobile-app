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
import { REKEY_SEARCH_PAGE, DELEGATED_REKEY_SEARCH_PAGE } from '../../pages/page-names.constants';
import { NavigationProvider } from '../navigation/navigation';
var NavigationStateProvider = /** @class */ (function () {
    function NavigationStateProvider(navigation) {
        this.navigation = navigation;
    }
    NavigationStateProvider.prototype.isRekeySearch = function () {
        return this.navigation.getActive().id === REKEY_SEARCH_PAGE;
    };
    NavigationStateProvider.prototype.isDelegatedExaminerRekeySearch = function () {
        return this.navigation.getActive().id === DELEGATED_REKEY_SEARCH_PAGE;
    };
    NavigationStateProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [NavigationProvider])
    ], NavigationStateProvider);
    return NavigationStateProvider;
}());
export { NavigationStateProvider };
//# sourceMappingURL=navigation-state.js.map