import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { DebriefCardComponent } from '../debrief-card';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { TickIndicatorComponent } from '../../../../../../components/common/tick-indicator/tick-indicator';
import { DangerousFaultBadgeComponent, } from '../../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import { SeriousFaultBadgeComponent, } from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { DrivingFaultsBadgeComponent, } from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { DataRowComponent } from '../../../../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../../../../components/common/data-row-custom/data-row-custom';
import { DataRowWithListComponent } from '../../../../components/data-row-with-list/data-list-with-row';
import { FaultsDataRowComponent } from '../../../../components/faults-data-row/faults-data-row';
import { VehicleChecksDataRowComponent } from '../../../../components/vehicle-checks-data-row/vehicle-checks-data-row';
import { FaultSummaryProvider } from '../../../../../../providers/fault-summary/fault-summary';
import { FaultCountProvider } from '../../../../../../providers/fault-count/fault-count';
import { TestRequirementsLabels, ViewTestResultLabels, } from '../../../../components/data-row-with-list/data-list-with-row.model';
// TODO - Cat HOME , use correct labels
import { manoeuvreTypeLabels } from '../../../../../../shared/constants/competencies/catbe-manoeuvres';
import { configureTestSuite } from 'ng-bullet';
describe('DebriefCardComponent', function () {
    var fixture;
    var component;
    var faultSummaryProvider;
    var faultCountProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                DebriefCardComponent,
                MockComponent(TickIndicatorComponent),
                MockComponent(DangerousFaultBadgeComponent),
                MockComponent(SeriousFaultBadgeComponent),
                MockComponent(DrivingFaultsBadgeComponent),
                MockComponent(DataRowComponent),
                MockComponent(DataRowCustomComponent),
                MockComponent(DataRowWithListComponent),
                MockComponent(FaultsDataRowComponent),
                MockComponent(VehicleChecksDataRowComponent),
            ],
            imports: [
                IonicModule,
            ],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                FaultSummaryProvider,
                FaultCountProvider,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(DebriefCardComponent);
        component = fixture.componentInstance;
        faultSummaryProvider = TestBed.get(FaultSummaryProvider);
        faultCountProvider = TestBed.get(FaultCountProvider);
    }));
    describe('Class', function () {
        describe('getTestRequirements', function () {
            // TODO - Cat HOME - needs to be fixed
            xit('should return the correct values for all test requirements', function () {
                var data = {
                    testRequirements: {
                        normalStart1: true,
                        normalStart2: false,
                        angledStart: true,
                        uphillStartDesignatedStart: false,
                    },
                };
                component.data = data;
                component.category = "F" /* F */;
                fixture.detectChanges();
                var result = component.getTestRequirements();
                expect(result.length).toEqual(6);
                expect(result).toContain({ label: TestRequirementsLabels.normalStart1, checked: true });
                expect(result).toContain({ label: TestRequirementsLabels.normalStart2, checked: false });
                expect(result).toContain({ label: TestRequirementsLabels.uphillStart, checked: false });
                expect(result).toContain({ label: TestRequirementsLabels.downhillStart, checked: false });
                expect(result).toContain({ label: TestRequirementsLabels.angledStartControlledStop, checked: true });
                expect(result).toContain({ label: TestRequirementsLabels.uncoupleRecouple, checked: false });
            });
        });
        describe('getManoeuvre', function () {
            it('should return Reverse Left if the manoeuvre has been completed', function () {
                var data = {
                    manoeuvres: {
                        reverseLeft: {
                            selected: true,
                        },
                    },
                };
                component.data = data;
                component.category = "F" /* F */;
                fixture.detectChanges();
                expect(component.getManoeuvre()).toEqual(manoeuvreTypeLabels.reverseLeft);
            });
            it('should return None if the manoeuvre has not been completed', function () {
                var data = {
                    manoeuvres: {
                        reverseLeft: {
                            selected: false,
                        },
                    },
                };
                component.data = data;
                component.category = "F" /* F */;
                fixture.detectChanges();
                expect(component.getManoeuvre()).toEqual('None');
            });
            it('should return None if the data does not exist', function () {
                expect(component.getManoeuvre()).toEqual('None');
            });
        });
        describe('getEco', function () {
            it('should return the correct data for eco', function () {
                var data = {
                    eco: {
                        adviceGivenControl: true,
                    },
                };
                component.data = data;
                component.category = "F" /* F */;
                fixture.detectChanges();
                var result = component.getEco();
                expect(result.length).toEqual(2);
                expect(result).toContain({ label: ViewTestResultLabels.control, checked: true });
                expect(result).toContain({ label: ViewTestResultLabels.planning, checked: false });
            });
        });
        describe('getDrivingFaults', function () {
            it('should call the fault summary provider and return the result', function () {
                spyOn(faultSummaryProvider, 'getDrivingFaultsList').and.returnValue([]);
                var result = component.getDrivingFaults();
                expect(faultSummaryProvider.getDrivingFaultsList).toHaveBeenCalled();
                expect(result).toEqual([]);
            });
        });
        describe('getSeriousFaults', function () {
            it('should call the fault summary provider and return the result', function () {
                spyOn(faultSummaryProvider, 'getSeriousFaultsList').and.returnValue([]);
                var result = component.getSeriousFaults();
                expect(faultSummaryProvider.getSeriousFaultsList).toHaveBeenCalled();
                expect(result).toEqual([]);
            });
        });
        describe('getDangerousFaults', function () {
            it('should call the fault summary provider and return the result', function () {
                spyOn(faultSummaryProvider, 'getDangerousFaultsList').and.returnValue([]);
                var result = component.getDangerousFaults();
                expect(faultSummaryProvider.getDangerousFaultsList).toHaveBeenCalled();
                expect(result).toEqual([]);
            });
        });
        describe('getDrivingFaultCount', function () {
            it('should call the fault summary provider and return the result', function () {
                spyOn(faultCountProvider, 'getDrivingFaultSumCount').and.returnValue(1);
                var result = component.getDrivingFaultCount();
                expect(faultCountProvider.getDrivingFaultSumCount).toHaveBeenCalled();
                expect(result).toEqual(1);
            });
        });
        describe('getETA', function () {
            it('should return the correct data if all eta options have been selected', function () {
                var data = {
                    ETA: {
                        physical: true,
                        verbal: true,
                    },
                };
                component.data = data;
                component.category = "F" /* F */;
                fixture.detectChanges();
                expect(component.getETA()).toEqual('Physical and Verbal');
            });
            it('should return the correct data if only a physical eta has been selected', function () {
                var data = {
                    ETA: {
                        physical: true,
                        verbal: false,
                    },
                };
                component.data = data;
                component.category = "F" /* F */;
                fixture.detectChanges();
                expect(component.getETA()).toEqual('Physical');
            });
            it('should return the correct data if only a verbal eta has been selected', function () {
                var data = {
                    ETA: {
                        verbal: true,
                    },
                };
                component.data = data;
                component.category = "F" /* F */;
                fixture.detectChanges();
                expect(component.getETA()).toEqual('Verbal');
            });
            it('should return None if no ETA is present', function () {
                expect(component.getETA()).toEqual('None');
            });
        });
        describe('getShowMeQuestions', function () {
            it('should return an empty array if no data is present', function () {
                expect(component.getShowMeQuestions()).toEqual([]);
            });
            it('should return the correct data when present', function () {
                var data = {
                    vehicleChecks: {
                        showMeQuestions: [
                            {
                                code: '1',
                                description: '2',
                                outcome: 'P',
                            },
                        ],
                    },
                };
                component.data = data;
                component.category = "F" /* F */;
                fixture.detectChanges();
                var result = component.getShowMeQuestions();
                expect(result.length).toEqual(1);
                expect(result).toContain({ code: '1', description: '2', outcome: 'P' });
            });
        });
        describe('getTellMeQuestions', function () {
            it('should return an empty array if no data is present', function () {
                expect(component.getTellMeQuestions()).toEqual([]);
            });
            it('should return the correct data when present', function () {
                var data = {
                    vehicleChecks: {
                        tellMeQuestions: [
                            {
                                code: '1',
                                description: '2',
                                outcome: 'P',
                            },
                        ],
                    },
                };
                component.data = data;
                component.category = "F" /* F */;
                fixture.detectChanges();
                var result = component.getTellMeQuestions();
                expect(result.length).toEqual(1);
                expect(result).toContain({ code: '1', description: '2', outcome: 'P' });
            });
        });
    });
});
//# sourceMappingURL=debrief-card.spec.js.map