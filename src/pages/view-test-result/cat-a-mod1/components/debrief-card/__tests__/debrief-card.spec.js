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
import { configureTestSuite } from 'ng-bullet';
import { SpeedCardComponent } from '../../speed-card/speed-card';
import { By } from '@angular/platform-browser';
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
                MockComponent(SpeedCardComponent),
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
                fixture.detectChanges();
                expect(component.getETA()).toEqual('Verbal');
            });
            it('should return None if no ETA is present', function () {
                expect(component.getETA()).toEqual('None');
            });
        });
    });
    describe('DOM', function () {
        it('should show speed card', function () {
            var data = {
                emergencyStop: {
                    firstAttempt: 22,
                    secondAttempt: 33,
                },
                avoidance: {
                    firstAttempt: 23,
                    secondAttempt: 34,
                },
            };
            component.data = data;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('speed-card'))).not.toBeNull();
        });
    });
});
//# sourceMappingURL=debrief-card.spec.js.map