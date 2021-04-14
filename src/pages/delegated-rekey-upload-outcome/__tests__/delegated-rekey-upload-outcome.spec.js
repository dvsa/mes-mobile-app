import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../app/app.module';
import { DelegatedRekeyUploadOutcomePage } from '../delegated-rekey-upload-outcome';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { StoreModule, Store } from '@ngrx/store';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { DeviceProvider } from '../../../providers/device/device';
import { DeviceProviderMock } from '../../../providers/device/__mocks__/device.mock';
import { InsomniaMock } from '../../../shared/mocks/insomnia.mock';
import { ScreenOrientationMock } from '../../../shared/mocks/screen-orientation.mock';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';
describe('DelegatedRekeyUploadOutcomePage', function () {
    var fixture;
    var component;
    var navController;
    var store$;
    var screenOrientation;
    var insomnia;
    var deviceProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                DelegatedRekeyUploadOutcomePage,
            ],
            imports: [
                IonicModule,
                AppModule,
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
                { provide: ScreenOrientation, useClass: ScreenOrientationMock },
                { provide: Insomnia, useClass: InsomniaMock },
                { provide: DeviceProvider, useClass: DeviceProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(DelegatedRekeyUploadOutcomePage);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        screenOrientation = TestBed.get(ScreenOrientation);
        insomnia = TestBed.get(Insomnia);
        deviceProvider = TestBed.get(DeviceProvider);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        describe('ionViewDidEnter', function () {
            it('should disable test inhibitions', function () {
                component.ionViewDidEnter();
                expect(screenOrientation.unlock).toHaveBeenCalled();
                expect(insomnia.allowSleepAgain).toHaveBeenCalled();
                expect(deviceProvider.disableSingleAppMode).toHaveBeenCalled();
            });
        });
        describe('goToDashboard', function () {
            it('should call the popTo method in the navcontroller', function () {
                component.goToDashboard();
                expect(navController.popTo).toHaveBeenCalled();
            });
        });
        describe('goToDelegatedSearch', function () {
            it('should call the popTo method in the navcontroller', function () {
                component.goToDelegatedSearch();
                expect(navController.popTo).toHaveBeenCalled();
            });
        });
        describe('isStatusSubmitted', function () {
            it('should return false when a value other then Submitted is passed in', function () {
                var returnValue = component.isStatusSubmitted('Booked');
                expect(returnValue).toEqual(false);
            });
            it('should return true when a value of Submitted is passed in', function () {
                var returnValue = component.isStatusSubmitted('Submitted');
                expect(returnValue).toEqual(true);
            });
        });
    });
    describe('DOM', function () {
        describe('isDuplicate', function () {
            it('should show the sucess message when the upload succeeded', function () {
                fixture.detectChanges();
                component.pageState.testStatus$ = of(TestStatus.Submitted);
                fixture.detectChanges();
                var element = fixture.debugElement.query(By.css('.modal-alert-header')).nativeElement;
                expect(element.textContent).toEqual('Rekey upload was successful');
                expect(fixture.debugElement.query(By.css('.tick-icon'))).toBeDefined();
                expect(fixture.debugElement.query(By.css('.warning-icon'))).toBeNull();
            });
            it('should show the duplicate upload message when the upload was detected as a duplicate', function () {
                fixture.detectChanges();
                component.pageState.testStatus$ = of(TestStatus.Booked);
                fixture.detectChanges();
                var element = fixture.debugElement.query(By.css('.modal-alert-header')).nativeElement;
                expect(element.textContent).toEqual('Rekey upload was unsuccessful');
                expect(fixture.debugElement.query(By.css('.warning-icon'))).toBeDefined();
                expect(fixture.debugElement.query(By.css('.tick-icon'))).toBeNull();
            });
        });
    });
});
//# sourceMappingURL=delegated-rekey-upload-outcome.spec.js.map