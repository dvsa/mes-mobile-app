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
import { get } from 'lodash';
var ContactDetailsCardComponent = /** @class */ (function () {
    function ContactDetailsCardComponent() {
    }
    ContactDetailsCardComponent.prototype.getTestResultPreference = function () {
        return get(this.communicationPreferencesData, 'communicationMethod', 'None');
    };
    ContactDetailsCardComponent.prototype.getPhoneNumber = function () {
        return get(this.candidateData, 'primaryTelephone', 'None');
    };
    ContactDetailsCardComponent.prototype.getEmailAddress = function () {
        if (get(this.communicationPreferencesData, 'communicationMethod') === 'Email') {
            return get(this.communicationPreferencesData, 'updatedEmail', 'None');
        }
        return get(this.candidateData, 'emailAddress', 'None');
    };
    ContactDetailsCardComponent.prototype.getAddress = function () {
        return get(this.candidateData, 'candidateAddress');
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ContactDetailsCardComponent.prototype, "candidateData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ContactDetailsCardComponent.prototype, "communicationPreferencesData", void 0);
    ContactDetailsCardComponent = __decorate([
        Component({
            selector: 'contact-details-card',
            templateUrl: 'contact-details-card.html',
        }),
        __metadata("design:paramtypes", [])
    ], ContactDetailsCardComponent);
    return ContactDetailsCardComponent;
}());
export { ContactDetailsCardComponent };
//# sourceMappingURL=contact-details-card.js.map