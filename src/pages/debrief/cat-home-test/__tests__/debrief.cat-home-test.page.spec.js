import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { DebriefCatHomeTestPage } from '../debrief.cat-home-test.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { StoreModule, Store } from '@ngrx/store';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { InsomniaMock } from '../../../../shared/mocks/insomnia.mock';
import { ScreenOrientationMock } from '../../../../shared/mocks/screen-orientation.mock';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EndDebrief } from '../../debrief.actions';
import { CAT_HOME_TEST } from '../../../page-names.constants';
import { FaultSummaryProvider } from '../../../../providers/fault-summary/fault-summary';
import { of } from 'rxjs/observable/of';
import { TestOutcome } from '../../../../shared/models/test-outcome';
import { configureTestSuite } from 'ng-bullet';
import { TestDataByCategoryProvider } from '../../../../providers/test-data-by-category/test-data-by-category';
import { MockComponent } from 'ng-mocks';
import { VehicleChecksCardComponent } from '../../components/vehicle-checks-card/vehicle-checks-card';
import { EtaDebriefCardComponent } from '../../components/eta-debrief-card/eta-debrief-card';
import { DangerousFaultsDebriefCardComponent, } from '../../components/dangerous-faults-debrief-card/dangerous-faults-debrief-card';
import { SeriousFaultsDebriefCardComponent, } from '../../components/serious-faults-debrief-card/serious-faults-debrief-card';
import { DrivingFaultsDebriefCardComponent, } from '../../components/driving-faults-debrief-card/driving-faults-debrief-card';
import { TestOutcomeDebriefCardComponent, } from '../../components/test-outcome-debrief-card/test-outcome-debrief-card';
import { EcoDebriefCardComponent } from '../../components/eco-debrief-card/eco-debrief-card';
describe('DebriefCatHomeTestPage', function () {
    var fixture;
    var component;
    var navController;
    var store$;
    var translate;
    var testSlotAttributes = {
        welshTest: false,
        extendedTest: false,
        slotId: 123,
        specialNeeds: false,
        start: '',
        vehicleTypeCode: '',
    };
    var exampleTestData = {
        dangerousFaults: {},
        drivingFaults: {},
        manoeuvres: {},
        seriousFaults: {},
        testRequirements: {},
        ETA: {},
        eco: {},
        vehicleChecks: {
            tellMeQuestions: [{}],
            showMeQuestions: [{}],
        },
    };
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                DebriefCatHomeTestPage,
                MockComponent(VehicleChecksCardComponent),
                MockComponent(EtaDebriefCardComponent),
                MockComponent(DangerousFaultsDebriefCardComponent),
                MockComponent(SeriousFaultsDebriefCardComponent),
                MockComponent(DrivingFaultsDebriefCardComponent),
                MockComponent(EcoDebriefCardComponent),
                MockComponent(TestOutcomeDebriefCardComponent),
            ],
            imports: [
                IonicModule,
                AppModule,
                ComponentsModule,
                StoreModule.forRoot({
                    tests: function () { return ({
                        currentTest: {
                            slotId: '123',
                        },
                        testStatus: {},
                        startedTests: {
                            123: {
                                testSlotAttributes: testSlotAttributes,
                                category: "H" /* H */,
                                vehicleDetails: {},
                                accompaniment: {},
                                testData: exampleTestData,
                                journalData: {
                                    candidate: {
                                        candidateName: 'Joe Bloggs',
                                    },
                                },
                            },
                        },
                    }); },
                    testReport: function () { return ({
                        seriousMode: false,
                        dangerousMode: false,
                        removeFaultMode: false,
                        isValid: false,
                    }); },
                }),
                TranslateModule,
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
                { provide: FaultSummaryProvider, useClass: FaultSummaryProvider },
                TestDataByCategoryProvider,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(DebriefCatHomeTestPage);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch').and.callThrough();
        translate = TestBed.get(TranslateService);
        translate.setDefaultLang('en');
    }));
    describe('Class', function () {
        describe('endDebrief', function () {
            it('should dispatch the PersistTests action', function () {
                component.endDebrief();
                expect(store$.dispatch).toHaveBeenCalledWith(new EndDebrief);
            });
            it('should navigate to PassFinalisationPage when outcome = pass', function () {
                component.outcome = TestOutcome.PASS;
                component.endDebrief();
                expect(navController.push).toHaveBeenCalledWith(CAT_HOME_TEST.PASS_FINALISATION_PAGE);
            });
            it('should navigate to BackToOfficePage when outcome = fail', function () {
                component.outcome = TestOutcome.FAIL;
                component.endDebrief();
                expect(navController.push).toHaveBeenCalledWith(CAT_HOME_TEST.POST_DEBRIEF_HOLDING_PAGE);
            });
            it('should navigate to the BackToOfficePage when outcomes = terminated', function () {
                component.outcome = 'Terminated';
                component.endDebrief();
                expect(navController.push).toHaveBeenCalledWith(CAT_HOME_TEST.POST_DEBRIEF_HOLDING_PAGE);
            });
        });
    });
    describe('DOM', function () {
        it('should display the candidate name in the title', function () {
            fixture.detectChanges();
            component.pageState.candidateName$ = of('John Doe');
            fixture.detectChanges();
            var title = fixture.debugElement.query(By.css('ion-title'));
            expect(title.nativeElement.textContent).toEqual('Debrief - John Doe');
        });
    });
});
//# sourceMappingURL=debrief.cat-home-test.page.spec.js.map