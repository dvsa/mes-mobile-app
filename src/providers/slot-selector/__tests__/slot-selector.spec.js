import { TestBed } from '@angular/core/testing';
import { SlotSelectorProvider } from '../slot-selector';
import { TestSlotComponent } from '../../../components/test-slot/test-slot/test-slot';
import { SlotItem } from '../slot-item';
import { ActivitySlotComponent } from '../../../pages/journal/components/activity-slot/activity-slot';
import { EmptySlotComponent } from '../../../pages/journal/components/empty-slot/empty-slot';
import { configureTestSuite } from 'ng-bullet';
describe('Slot Selector', function () {
    var slotSelector;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                SlotSelectorProvider,
            ],
        });
    });
    beforeEach(function () {
        slotSelector = TestBed.get(SlotSelectorProvider);
    });
    var singleSlotItemWithActivityCode = function (code) {
        var travelSlot = {
            activityCode: code,
        };
        var journalSlots = [
            new SlotItem(travelSlot, false, false),
        ];
        return journalSlots;
    };
    var expectNonTestActivitySlotComponentResolvedForActivityCode = function (code) {
        var journalSlots = singleSlotItemWithActivityCode(code);
        var response = slotSelector.getSlotTypes(journalSlots);
        expect(response[0].component).toBe(ActivitySlotComponent);
    };
    var singleSlotItemWithVehicleTypeCode = function (vehicleTypeCode) {
        var slot = {
            vehicleTypeCode: vehicleTypeCode,
            booking: {
                application: {
                    applicationId: 1234567,
                    bookingSequence: 3,
                    checkDigit: 1,
                },
            },
        };
        var journalSlots = [
            new SlotItem(slot, false, false),
        ];
        return journalSlots;
    };
    var expectTestSlotComponentResolvedForVehicleSlotType = function (code) {
        var journalSlots = singleSlotItemWithVehicleTypeCode(code);
        var response = slotSelector.getSlotTypes(journalSlots);
        expect(response.length).toBe(1);
        expect(response[0].component).toBe(TestSlotComponent);
        expect(response[0].slotData).toBe(journalSlots[0].slotData);
        expect(response[0].hasSlotChanged).toBe(false);
    };
    describe('SlotSelectorProvider', function () {
        it('should compile', function () {
            expect(slotSelector).toBeDefined();
        });
        describe('getSlotTypes', function () {
            it('should return empty array if data is missing or incorrectly formatted', function () {
                expect(slotSelector.getSlotTypes([]).length).toBe(0);
                expect(slotSelector.getSlotTypes(null).length).toBe(0);
                expect(slotSelector.getSlotTypes(undefined).length).toBe(0);
            });
            it('should provide correct component when test type is in vehicleSlotType codes', function () {
                expectTestSlotComponentResolvedForVehicleSlotType('B57mins');
                expectTestSlotComponentResolvedForVehicleSlotType('B86mins');
                expectTestSlotComponentResolvedForVehicleSlotType('B114mins');
                expectTestSlotComponentResolvedForVehicleSlotType('Voc90mins');
                expectTestSlotComponentResolvedForVehicleSlotType('HomeTest');
                expectTestSlotComponentResolvedForVehicleSlotType('ADI2-90mins');
                expectTestSlotComponentResolvedForVehicleSlotType('ADI3-90mins');
                expectTestSlotComponentResolvedForVehicleSlotType('CPCBUS30');
                expectTestSlotComponentResolvedForVehicleSlotType('M1Bike30m');
                expectTestSlotComponentResolvedForVehicleSlotType('M1BikSNX45m');
                expectTestSlotComponentResolvedForVehicleSlotType('M2Bike57min');
                expectTestSlotComponentResolvedForVehicleSlotType('M2BikSNEX86');
                expectTestSlotComponentResolvedForVehicleSlotType('M2BikeEx114');
                expectTestSlotComponentResolvedForVehicleSlotType('M1BikeEx30m');
                expectTestSlotComponentResolvedForVehicleSlotType('CPCLORRY30');
                expectTestSlotComponentResolvedForVehicleSlotType('OffRdTr30m');
                expectTestSlotComponentResolvedForVehicleSlotType('CPC30');
                expectTestSlotComponentResolvedForVehicleSlotType('Sc');
            });
            it('should provide the NonTestActivitySlotComponent for NTA activity codes', function () {
                expectNonTestActivitySlotComponentResolvedForActivityCode('091');
                expectNonTestActivitySlotComponentResolvedForActivityCode('094');
                expectNonTestActivitySlotComponentResolvedForActivityCode('096');
                expectNonTestActivitySlotComponentResolvedForActivityCode('142');
            });
            it('should provide the EmptySlotComponent for slots that have no booking or activity code', function () {
                var slot = {};
                var journalSlots = [
                    new SlotItem(slot, false, false),
                ];
                var response = slotSelector.getSlotTypes(journalSlots);
                expect(response.length).toBe(1);
                expect(response[0].component).toBe(EmptySlotComponent);
                expect(response[0].slotData).toBe(journalSlots[0].slotData);
                expect(response[0].hasSlotChanged).toBe(false);
            });
        });
    });
    describe('isTestSlot', function () {
        it('should return true if test slot', function () {
            var slotItem = singleSlotItemWithVehicleTypeCode('C')[0];
            var slotData = slotItem.slotData;
            var slot = {
                booking: slotData.booking,
                slotDetail: slotItem.slotData.slotDetail,
                testCentre: slotItem.slotData.testCentre,
                vehicleTypeCode: slotData.vehicleTypeCode,
                activityCode: slotItem.activityCode,
            };
            var response = slotSelector.isTestSlot(slot);
            expect(response).toEqual(true);
        });
        it('should return false if not a test slot', function () {
            var slotItem = singleSlotItemWithActivityCode(1)[0];
            var slot = {
                slotDetail: slotItem.slotData.slotDetail,
                testCentre: slotItem.slotData.testCentre,
                activityCode: slotItem.activityCode,
            };
            var response = slotSelector.isTestSlot(slot);
            expect(response).toEqual(false);
        });
    });
});
//# sourceMappingURL=slot-selector.spec.js.map