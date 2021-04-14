import { PersonalCommitmentSlotComponent } from './personal-commitment';
import { async, TestBed } from '@angular/core/testing';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../providers/app-config/__mocks__/app-config.mock';
import { Config, IonicModule } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { TimeComponent } from '../../../components/test-slot/time/time';
import { LocationComponent } from '../../../components/test-slot/location/location';
import { configureTestSuite } from 'ng-bullet';
describe('PersonalCommitmentSlotComponent', function () {
    var fixture;
    var component;
    var mockCommitment = {
        commitmentId: 12345,
        slotId: 1001,
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
        activityCode: '091',
        activityDescription: 'Annual Leave',
    };
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                PersonalCommitmentSlotComponent,
                MockComponent(TimeComponent),
                MockComponent(LocationComponent),
            ],
            providers: [
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
            ],
            imports: [IonicModule],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(PersonalCommitmentSlotComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('formatActivityCode', function () {
            it('should strip leading zeros from activityCode', function () {
                var activityCodeWithZeroRemoved = '91';
                expect(component.formatActivityCode(mockCommitment.activityCode)).toBe(activityCodeWithZeroRemoved);
            });
            it('should return 0 if activityCode is null', function () {
                var zeroActivityCode = '0';
                var nullActivityCode = null;
                expect(component.formatActivityCode(nullActivityCode)).toBe(zeroActivityCode);
            });
        });
    });
});
//# sourceMappingURL=personal-commitment.spec.js.map