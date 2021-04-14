import { ActivitySlotComponent } from '../activity-slot';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { MockComponent } from 'ng-mocks';
import { TimeComponent } from '../../../../../components/test-slot/time/time';
import { AppConfigProvider } from '../../../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../../../providers/app-config/__mocks__/app-config.mock';
import { ConfigMock } from 'ionic-mocks';
import { By } from '@angular/platform-browser';
import { LocationComponent } from '../../../../../components/test-slot/location/location';
import { configureTestSuite } from 'ng-bullet';
describe('ActivitySlotComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ActivitySlotComponent,
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
        fixture = TestBed.createComponent(ActivitySlotComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('formatActivityCode', function () {
            beforeEach(function () {
                component.slot = {};
            });
            it('should strip leading zeroes if they exist', function () {
                var cases = [
                    { activityCode: undefined, expected: '0' },
                    { activityCode: null, expected: '0' },
                    { activityCode: '128', expected: '128' },
                    { activityCode: '091', expected: '91' },
                ];
                cases.forEach(function (testCase) {
                    component.slot.activityCode = testCase.activityCode;
                    expect(component.formatActivityCode()).toBe(testCase.expected);
                });
            });
        });
        describe('getTitle', function () {
            beforeEach(function () {
                component.slot = {};
            });
            it('should return Unknown for an unmapped code', function () {
                component.slot.activityCode = 'notactivitycode';
                expect(component.getTitle()).toBe('Unknown');
            });
            it('should return the display name if one exists', function () {
                component.slot.activityCode = '091';
                expect(component.getTitle()).toBe('Travel');
            });
            it('should return the activity description if there is no display name', function () {
                component.slot.activityCode = '142';
                expect(component.getTitle()).toBe('Personal development');
            });
        });
    });
    describe('DOM', function () {
        it('should pass the slot start time to the time component', function () {
            component.slot = {
                slotDetail: {
                    start: 12345,
                },
            };
            fixture.detectChanges();
            var timeSubComponent = fixture.debugElement
                .query(By.directive(MockComponent(TimeComponent))).componentInstance;
            expect(timeSubComponent.time).toBe(12345);
        });
        it('should pass something to sub-component location input', function () {
            component.showLocation = true;
            component.slot = {
                slotDetail: {
                    start: 12345,
                },
                testCentre: {
                    centreName: 'Example Test Centre',
                },
            };
            fixture.detectChanges();
            var subByDirective = fixture.debugElement.query(By.directive(MockComponent(LocationComponent))).componentInstance;
            expect(subByDirective.location).toBe('Example Test Centre');
        });
    });
});
//# sourceMappingURL=activity-slot.spec.js.map