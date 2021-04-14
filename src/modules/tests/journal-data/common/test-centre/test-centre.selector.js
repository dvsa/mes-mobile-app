import { get } from 'lodash';
export var getCostCentre = function (testCentre) { return testCentre.costCode || ''; };
export var extractTestCentre = function (slotData) {
    return {
        centreId: get(slotData, 'testCentre.centreId', null),
        costCode: get(slotData, 'testCentre.costCode', null),
        centreName: get(slotData, 'testCentre.centreName', null),
    };
};
//# sourceMappingURL=test-centre.selector.js.map