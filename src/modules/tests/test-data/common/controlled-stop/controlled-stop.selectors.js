import { get } from 'lodash';
export var isControlledStopSelected = function (data) { return get(data, 'selected'); };
export var getControlledStopFault = function (data) { return get(data, 'fault'); };
//# sourceMappingURL=controlled-stop.selectors.js.map