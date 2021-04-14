var _a;
import { groupBy } from 'lodash';
import { DateTime } from '../../../shared/helpers/date-time';
var localJournalJson = require('../../../../mock/local-journal.json');
var slotItems = localJournalJson.testSlots.map(function (testSlot) {
    return {
        hasSlotChanged: false,
        slotData: testSlot,
    };
});
export var baseJournalData = {
    isLoading: true,
    lastRefreshed: new Date(0),
    slots: (_a = {},
        _a['2019-01-01'] = [
            {
                hasSlotChanged: false,
                hasSeenCandidateDetails: false,
                slotData: {
                    slotDetail: {
                        slotId: 1001,
                        start: '2019-01-12T09:14:00',
                    },
                    booking: {
                        application: {
                            applicationId: 1234561,
                            bookingSequence: 1,
                            checkDigit: 4,
                            welshTest: false,
                            extendedTest: false,
                            meetingPlace: '',
                            progressiveAccess: false,
                            specialNeeds: '',
                            entitlementCheck: false,
                            testCategory: 'B',
                            vehicleGearbox: 'Manual',
                        },
                        candidate: null,
                        previousCancellation: null,
                        business: null,
                    },
                },
            },
        ],
        _a['2019-01-02'] = [
            {
                hasSlotChanged: false,
                hasSeenCandidateDetails: false,
                slotData: {
                    slotDetail: {
                        slotId: 2001,
                        start: '2019-01-13T09:14:00',
                    },
                    booking: {
                        application: {
                            applicationId: 1234561,
                            bookingSequence: 1,
                            checkDigit: 4,
                            welshTest: false,
                            extendedTest: false,
                            meetingPlace: '',
                            progressiveAccess: false,
                            specialNeeds: '',
                            entitlementCheck: false,
                            testCategory: 'B',
                            vehicleGearbox: 'Manual',
                        },
                        candidate: null,
                        previousCancellation: null,
                        business: null,
                    },
                },
            },
        ],
        _a['2019-01-03'] = [
            {
                hasSlotChanged: false,
                hasSeenCandidateDetails: false,
                slotData: {
                    slotDetail: {
                        slotId: 3001,
                        start: '2019-01-14T09:14:00',
                    },
                    booking: {
                        application: {
                            applicationId: 1234561,
                            bookingSequence: 1,
                            checkDigit: 4,
                            welshTest: false,
                            extendedTest: false,
                            meetingPlace: '',
                            progressiveAccess: false,
                            specialNeeds: '',
                            entitlementCheck: false,
                            testCategory: 'B',
                            vehicleGearbox: 'Manual',
                        },
                        candidate: null,
                        previousCancellation: null,
                        business: null,
                    },
                },
            },
        ],
        _a),
    selectedDate: '2019-01-02',
    examiner: { staffNumber: '123', individualId: 456 },
    completedTests: [],
};
var slots = groupBy(slotItems, function (slot) { return DateTime.at(slot.slotData.slotDetail.start).format('YYYY-MM-DD'); });
export default slots;
//# sourceMappingURL=journal-slots-data.mock.js.map