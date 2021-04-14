import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { BackToOfficeCatAMod2Page } from '../back-to-office.cat-a-mod2.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { StoreModule, Store } from '@ngrx/store';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { DeviceProvider } from '../../../../providers/device/device';
import { DeviceProviderMock } from '../../../../providers/device/__mocks__/device.mock';
import { InsomniaMock } from '../../../../shared/mocks/insomnia.mock';
import { ScreenOrientationMock } from '../../../../shared/mocks/screen-orientation.mock';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { configureTestSuite } from 'ng-bullet';
describe('BackToOfficeCatAMod2Page', function () {
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
                BackToOfficeCatAMod2Page,
            ],
            imports: [
                IonicModule,
                AppModule,
                StoreModule.forRoot({
                    tests: function () { return ({
                        currentTest: {
                            slotId: '123',
                        },
                        testStatus: {},
                        startedTests: {
                            123: {
                                vehicleDetails: {},
                                accompaniment: {},
                                testData: {
                                    dangerousFaults: {},
                                    drivingFaults: {},
                                    manoeuvres: {},
                                    seriousFaults: {},
                                    testRequirements: {},
                                    ETA: {},
                                    eco: {},
                                    vehicleChecks: {
                                        showMeQuestion: {
                                            code: 'S3',
                                            description: '',
                                            outcome: '',
                                        },
                                        tellMeQuestion: {
                                            code: '',
                                            description: '',
                                            outcome: '',
                                        },
                                    },
                                    eyesightTest: {},
                                },
                                activityCode: '28',
                                journalData: {
                                    candidate: {
                                        candidateName: 'Joe Bloggs',
                                        driverNumber: '123',
                                    },
                                },
                                rekey: false,
                            },
                        },
                    }); },
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
        fixture = TestBed.createComponent(BackToOfficeCatAMod2Page);
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
                expect(deviceProvider.disableSingleAppMode).toHaveBeenCalled();
                expect(screenOrientation.unlock).toHaveBeenCalled();
                expect(insomnia.allowSleepAgain).toHaveBeenCalled();
            });
        });
    });
    describe('goToJournal', function () {
        it('should call the popTo method in the navcontroller', function () {
            component.goToJournal();
            expect(navController.popTo).toHaveBeenCalled();
        });
    });
    describe('DOM', function () {
        it('should show the return to journal button when not a rekey', function () {
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.bottom-button'))).toBeDefined();
        });
        it('should hide the return to journal button when this is a rekey', function () {
            fixture.detectChanges();
            component.pageState.isRekey$ = of(true);
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.bottom-button'))).toBeNull();
        });
    });
});
//# sourceMappingURL=back-to-office.cat-a-mod2.page.spec.js.map