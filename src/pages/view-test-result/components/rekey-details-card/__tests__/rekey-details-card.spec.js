import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { RekeyDetailsCardComponent } from '../rekey-details';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';
import { configureTestSuite } from 'ng-bullet';
describe('ExaminerDetailsCardComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                RekeyDetailsCardComponent,
                MockComponent(DataRowComponent),
            ],
            imports: [
                IonicModule,
            ],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(RekeyDetailsCardComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('getScheduledStaffNumber', function () {
            it('should return the correct data', function () {
                var data = {
                    examinerBooked: 123456,
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.getScheduledStaffNumber()).toEqual(123456);
            });
            it('should return undefined if the data does not exist', function () {
                expect(component.getScheduledStaffNumber()).toEqual(undefined);
            });
        });
        describe('getConductedStaffNumber', function () {
            it('should return the correct data', function () {
                var data = {
                    examinerConducted: 123456,
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.getConductedStaffNumber()).toEqual(123456);
            });
            it('should return undefined if the data does not exist', function () {
                expect(component.getConductedStaffNumber()).toEqual(undefined);
            });
        });
        describe('getRekeyedStaffNumber', function () {
            it('should return the correct data', function () {
                var data = {
                    examinerKeyed: 123456,
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.getRekeyedStaffNumber()).toEqual(123456);
            });
            it('should return undefined if the data does not exist', function () {
                expect(component.getRekeyedStaffNumber()).toEqual(undefined);
            });
        });
        describe('getTestDate', function () {
            it('should return the correct data', function () {
                var data = {
                    journalData: {
                        testSlotAttributes: {
                            start: '2019-01-12T09:14:00',
                        },
                    },
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.getTestDate()).toEqual('Saturday 12th January 2019');
            });
        });
        describe('getRekeyDate', function () {
            it('should return the correct data', function () {
                var data = {
                    rekeyDate: '2019-01-12T09:14:00',
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.getRekeyDate()).toEqual('Saturday 12th January 2019');
            });
        });
    });
});
//# sourceMappingURL=rekey-details-card.spec.js.map