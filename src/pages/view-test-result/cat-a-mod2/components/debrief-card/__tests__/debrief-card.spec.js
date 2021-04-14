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
import { FaultSummaryProvider } from '../../../../../../providers/fault-summary/fault-summary';
import { FaultCountProvider } from '../../../../../../providers/fault-count/fault-count';
import { TestRequirementsLabels, ViewTestResultLabels, } from '../../../../components/data-row-with-list/data-list-with-row.model';
import { configureTestSuite } from 'ng-bullet';
import { SafetyAndBalanceDataRowComponent, } from '../../../../components/safety-and-balance-data-row/safety-and-balance-data-row';
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
                MockComponent(SafetyAndBalanceDataRowComponent),
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
        component.testCategory = "EUAM2" /* EUAM2 */;
    }));
    describe('Class', function () {
        describe('getTestRequirements', function () {
            it('should return the correct values for all test requirements', function () {
                var data = {
                    testRequirements: {
                        normalStart1: true,
                        normalStart2: false,
                        hillStart: false,
                        angledStart: true,
                    },
                };
                component.data = data;
                fixture.detectChanges();
                var result = component.getTestRequirements();
                expect(result.length).toEqual(4);
                expect(result).toContain({ label: TestRequirementsLabels.normalStart1, checked: true });
                expect(result).toContain({ label: TestRequirementsLabels.normalStart2, checked: false });
                expect(result).toContain({ label: TestRequirementsLabels.hillStart, checked: false });
                expect(result).toContain({ label: TestRequirementsLabels.angledStart, checked: true });
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
            it('should return the correct data if only a verbal eta has been selected', function () {
                var data = {
                    ETA: {
                        verbal: true,
                    },
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.getETA()).toEqual('Verbal');
            });
            it('should return None if no ETA is present', function () {
                expect(component.getETA()).toEqual('None');
            });
        });
        describe('getSafetyQuestions', function () {
            it('should return an empty array if no data is present', function () {
                component.data = null;
                expect(component.getSafetyQuestions()).toEqual([]);
            });
            it('should return the correct data when present', function () {
                var data = {
                    safetyAndBalanceQuestions: {
                        safetyQuestions: [
                            {
                                code: 'SQ2',
                                description: 'Horn working',
                                outcome: 'P',
                            },
                        ],
                        balanceQuestions: [
                            {
                                code: 'BQ2',
                                description: 'Carrying a passenger',
                                outcome: 'DF',
                            },
                        ],
                    },
                };
                component.data = data;
                fixture.detectChanges();
                var result = component.getSafetyQuestions();
                expect(result.length).toEqual(1);
                expect(result).toContain({ code: 'SQ2', description: 'Horn working', outcome: 'P' });
            });
        });
        describe('getBalanceQuestions', function () {
            it('should return an empty array if no data is present', function () {
                component.data = null;
                expect(component.getBalanceQuestions()).toEqual([]);
            });
            it('should return the correct data when present', function () {
                var data = {
                    safetyAndBalanceQuestions: {
                        safetyQuestions: [
                            {
                                code: 'SQ2',
                                description: 'Horn working',
                                outcome: 'P',
                            },
                        ],
                        balanceQuestions: [
                            {
                                code: 'BQ2',
                                description: 'Carrying a passenger',
                                outcome: 'DF',
                            },
                        ],
                    },
                };
                component.data = data;
                fixture.detectChanges();
                var result = component.getBalanceQuestions();
                expect(result.length).toEqual(1);
                expect(result).toContain({ code: 'BQ2', description: 'Carrying a passenger', outcome: 'DF' });
            });
        });
    });
});
//# sourceMappingURL=debrief-card.spec.js.map