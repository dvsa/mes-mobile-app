export var CANDIDATE_DESCRIPTION_CHANGED = '[Test Summary] Candidate description changed';
export var ADDITIONAL_INFORMATION_CHANGED = '[Test Summary] Additional Information changed';
export var ROUTE_NUMBER_CHANGED = '[Test Summary] Route Number changed';
export var DEBRIEF_WITNESSED = '[Test Summary] Debrief Witnessed';
export var DEBRIEF_UNWITNESSED = '[Test Summary] Debrief Unwitnessed';
export var IDENTIFICATION_USED_CHANGED = '[Test Summary] Identification used changed';
export var INDEPENDENT_DRIVING_TYPE_CHANGED = '[Test Summary] Independent driving changed';
export var D255_YES = '[Test Summary] D255 Yes';
export var D255_NO = '[Test Summary] D255 No';
export var WEATHER_CONDITIONS_CHANGED = '[Test Summary] Weather conditions changed';
var AdditionalInformationChanged = /** @class */ (function () {
    function AdditionalInformationChanged(additionalInformation) {
        this.additionalInformation = additionalInformation;
        this.type = ADDITIONAL_INFORMATION_CHANGED;
    }
    return AdditionalInformationChanged;
}());
export { AdditionalInformationChanged };
var CandidateDescriptionChanged = /** @class */ (function () {
    function CandidateDescriptionChanged(description) {
        this.description = description;
        this.type = CANDIDATE_DESCRIPTION_CHANGED;
    }
    return CandidateDescriptionChanged;
}());
export { CandidateDescriptionChanged };
var RouteNumberChanged = /** @class */ (function () {
    function RouteNumberChanged(routeNumber) {
        this.routeNumber = routeNumber;
        this.type = ROUTE_NUMBER_CHANGED;
    }
    return RouteNumberChanged;
}());
export { RouteNumberChanged };
var DebriefWitnessed = /** @class */ (function () {
    function DebriefWitnessed() {
        this.type = DEBRIEF_WITNESSED;
    }
    return DebriefWitnessed;
}());
export { DebriefWitnessed };
var DebriefUnwitnessed = /** @class */ (function () {
    function DebriefUnwitnessed() {
        this.type = DEBRIEF_UNWITNESSED;
    }
    return DebriefUnwitnessed;
}());
export { DebriefUnwitnessed };
var IdentificationUsedChanged = /** @class */ (function () {
    function IdentificationUsedChanged(identification) {
        this.identification = identification;
        this.type = IDENTIFICATION_USED_CHANGED;
    }
    return IdentificationUsedChanged;
}());
export { IdentificationUsedChanged };
var IndependentDrivingTypeChanged = /** @class */ (function () {
    function IndependentDrivingTypeChanged(drivingType) {
        this.drivingType = drivingType;
        this.type = INDEPENDENT_DRIVING_TYPE_CHANGED;
    }
    return IndependentDrivingTypeChanged;
}());
export { IndependentDrivingTypeChanged };
var D255Yes = /** @class */ (function () {
    function D255Yes() {
        this.type = D255_YES;
    }
    return D255Yes;
}());
export { D255Yes };
var D255No = /** @class */ (function () {
    function D255No() {
        this.type = D255_NO;
    }
    return D255No;
}());
export { D255No };
var WeatherConditionsChanged = /** @class */ (function () {
    function WeatherConditionsChanged(weatherConditions) {
        this.weatherConditions = weatherConditions;
        this.type = WEATHER_CONDITIONS_CHANGED;
    }
    return WeatherConditionsChanged;
}());
export { WeatherConditionsChanged };
//# sourceMappingURL=test-summary.actions.js.map