import { get } from 'lodash';
export var isHighwayCodeSafetySelected = function (data) { return get(data, 'selected'); };
export var getHighwayCodeSafetyDrivingFault = function (data) { return get(data, 'drivingFault'); };
export var getHighwayCodeSafetySeriousFault = function (data) { return get(data, 'seriousFault'); };
//# sourceMappingURL=highway-code-safety.selectors.js.map