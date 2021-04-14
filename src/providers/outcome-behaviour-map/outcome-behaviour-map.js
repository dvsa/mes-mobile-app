var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
export var VisibilityType;
(function (VisibilityType) {
    VisibilityType["NotVisible"] = "N";
    VisibilityType["Visible"] = "Y";
    VisibilityType["VisibleIfPresent"] = "A";
})(VisibilityType || (VisibilityType = {}));
var OutcomeBehaviourMapProvider = /** @class */ (function () {
    function OutcomeBehaviourMapProvider() {
        this.behaviourMap = {};
    }
    OutcomeBehaviourMapProvider.prototype.setBehaviourMap = function (map) {
        this.behaviourMap = map;
    };
    OutcomeBehaviourMapProvider.prototype.getVisibilityType = function (outcomeId, fieldName) {
        var mappedOutcome = this.behaviourMap[outcomeId];
        if (!mappedOutcome) {
            return VisibilityType.NotVisible;
        }
        var field = mappedOutcome[fieldName];
        if (!field) {
            return VisibilityType.NotVisible;
        }
        return field.display;
    };
    OutcomeBehaviourMapProvider.prototype.isVisible = function (outcomeId, fieldName, value) {
        var mappedOutcome = this.behaviourMap[outcomeId];
        if (!mappedOutcome) {
            return true;
        }
        var field = mappedOutcome[fieldName];
        if (!field) {
            return false;
        }
        if (field.display === VisibilityType.VisibleIfPresent && value) {
            return true;
        }
        return field.display === VisibilityType.Visible;
    };
    OutcomeBehaviourMapProvider.prototype.hasDefault = function (outcomeId, fieldName) {
        var mappedOutcome = this.behaviourMap[outcomeId];
        if (!mappedOutcome) {
            return false;
        }
        var field = mappedOutcome[fieldName];
        if (!field) {
            return false;
        }
        if (field.defaultValue && field.defaultValue !== '') {
            return true;
        }
        return false;
    };
    OutcomeBehaviourMapProvider.prototype.getDefault = function (outcomeId, fieldName) {
        var mappedOutcome = this.behaviourMap[outcomeId];
        if (!mappedOutcome) {
            return null;
        }
        var field = mappedOutcome[fieldName];
        if (!field) {
            return null;
        }
        if (field.defaultValue && field.defaultValue !== '') {
            return field.defaultValue;
        }
        return null;
    };
    OutcomeBehaviourMapProvider.prototype.showNotApplicable = function (outcomeId, fieldName) {
        var mappedOutcome = this.behaviourMap[outcomeId];
        if (!mappedOutcome) {
            return false;
        }
        var field = mappedOutcome[fieldName];
        if (!field) {
            return false;
        }
        if (!field.showNotApplicable) {
            return false;
        }
        return field.showNotApplicable;
    };
    OutcomeBehaviourMapProvider = __decorate([
        Injectable()
    ], OutcomeBehaviourMapProvider);
    return OutcomeBehaviourMapProvider;
}());
export { OutcomeBehaviourMapProvider };
//# sourceMappingURL=outcome-behaviour-map.js.map