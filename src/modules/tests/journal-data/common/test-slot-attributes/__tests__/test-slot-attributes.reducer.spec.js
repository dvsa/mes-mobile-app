import { testSlotsAttributesReducer } from '../test-slot-attributes.reducer';
import { PopulateTestSlotAttributes, SetStartDate } from '../test-slot-attributes.actions';
import { DateTime } from '../../../../../../shared/helpers/date-time';
var testTime = new DateTime().toString();
describe('testSlotAttributes reducer', function () {
    var mockTestSlotAttributes = {
        slotId: 1234,
        specialNeeds: true,
        start: testTime,
        vehicleTypeCode: 'C',
        extendedTest: true,
        welshTest: null,
    };
    it('should return the testSlotAttributes for populate test centre actions', function () {
        var result = testSlotsAttributesReducer(null, new PopulateTestSlotAttributes(mockTestSlotAttributes));
        expect(result).toBe(mockTestSlotAttributes);
    });
    describe('SET_START_DATE', function () {
        it('should return the testSlotAttributes with new start property', function () {
            mockTestSlotAttributes.start = '2021-01-15T08:10:00.000Z';
            var updatedDate = '2020-12-25T08:10:00.000Z';
            var state = testSlotsAttributesReducer(null, new PopulateTestSlotAttributes(mockTestSlotAttributes));
            var result = testSlotsAttributesReducer(state, new SetStartDate(updatedDate));
            expect(result.start).toBe(updatedDate);
        });
    });
});
//# sourceMappingURL=test-slot-attributes.reducer.spec.js.map