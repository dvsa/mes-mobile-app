import { async, TestBed } from '@angular/core/testing';
import { DebriefCatCPCPage } from '../debrief.cat-cpc.page';
import { configureTestSuite } from 'ng-bullet';
import { Config, IonicModule, NavController, NavParams, Platform } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { AppModule } from '../../../../app/app.module';
import { Store, StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfigMock, NavControllerMock, NavParamsMock, PlatformMock } from 'ionic-mocks';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ScreenOrientationMock } from '../../../../shared/mocks/screen-orientation.mock';
import { Insomnia } from '@ionic-native/insomnia';
import { InsomniaMock } from '../../../../shared/mocks/insomnia.mock';
import { FaultSummaryProvider } from '../../../../providers/fault-summary/fault-summary';
import { TestDataByCategoryProvider } from '../../../../providers/test-data-by-category/test-data-by-category';
import { EndDebrief } from '../../debrief.actions';
import { TestOutcome } from '../../../../shared/models/test-outcome';
import { CAT_CPC } from '../../../page-names.constants';
import { DebriefComponentsModule } from '../../components/debrief-components.module';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
describe('DebriefCatCPCPage', function () {
    var fixture;
    var component;
    var navController;
    var store$;
    var translate;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [DebriefCatCPCPage],
            imports: [
                IonicModule,
                AppModule,
                ComponentsModule,
                DebriefComponentsModule,
                StoreModule.forRoot({
                    tests: function () { return ({
                        currentTest: {
                            slotId: '123',
                        },
                        testStatus: {},
                        startedTests: {
                            123: {
                                category: "CCPC" /* CCPC */,
                                vehicleDetails: {},
                                accompaniment: {},
                                testData: {
                                    combination: 'LGV7',
                                    question1: {
                                        questionCode: 'Q12',
                                        title: 'Loading the vehicle',
                                        score: 20,
                                    },
                                    question2: {
                                        questionCode: 'Q04',
                                        title: 'Security of vehicle and contents',
                                        score: 20,
                                    },
                                    question3: {
                                        questionCode: 'Q15',
                                        title: 'Preventing criminality and trafficking in illegal immigrants',
                                        score: 20,
                                    },
                                    question4: {
                                        questionCode: 'Q11',
                                        title: 'Assessing emergency situations',
                                        score: 20,
                                    },
                                    question5: {
                                        questionCode: 'Q05',
                                        title: 'Ability to prevent physical risk',
                                        score: 20,
                                    },
                                    totalPercent: 100,
                                },
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
        fixture = TestBed.createComponent(DebriefCatCPCPage);
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
                expect(navController.push).toHaveBeenCalledWith(CAT_CPC.PASS_FINALISATION_PAGE);
            });
            it('should navigate to BackToOfficePage when outcome = fail', function () {
                component.outcome = TestOutcome.FAIL;
                component.endDebrief();
                expect(navController.push).toHaveBeenCalledWith(CAT_CPC.POST_DEBRIEF_HOLDING_PAGE);
            });
            it('should navigate to the BackToOfficePage when outcomes = terminated', function () {
                component.outcome = 'Terminated';
                component.endDebrief();
                expect(navController.push).toHaveBeenCalledWith(CAT_CPC.POST_DEBRIEF_HOLDING_PAGE);
            });
        });
        describe('isTerminated', function () {
            it('should return true if the test outcome is terminated', function () {
                component.outcome = 'Terminated';
                var result = component.isTerminated();
                expect(result).toEqual(true);
            });
            it('should return false if the test outcome is pass', function () {
                component.outcome = 'Pass';
                var result = component.isTerminated();
                expect(result).toEqual(false);
            });
            it('should return false if the test outcome is fail', function () {
                component.outcome = 'Fail';
                var result = component.isTerminated();
                expect(result).toEqual(false);
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
//# sourceMappingURL=debrief.cat-cpc.page.spec.js.map