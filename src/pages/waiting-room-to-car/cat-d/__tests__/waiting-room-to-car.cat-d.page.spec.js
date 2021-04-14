import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { WaitingRoomToCarCatDPage } from '../waiting-room-to-car.cat-d.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { StoreModule, Store } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { QuestionProvider } from '../../../../providers/question/question';
import { QuestionProviderMock } from '../../../../providers/question/__mocks__/question.mock';
import { EndTestLinkComponent } from '../../../../components/common/end-test-link/end-test-link';
import { PersistTests } from '../../../../modules/tests/tests.actions';
import { VehicleRegistrationComponent } from '../../components/vehicle-registration/vehicle-registration';
import { VehicleDetailsCardComponent } from '../../components/vehicle-details-card/vehicle-details-card';
import { VehicleDetailsComponent } from '../../components/vehicle-details/vehicle-details';
import { AccompanimentCardComponent } from '../../components/accompaniment-card/accompaniment-card';
import { AccompanimentComponent } from '../../components/accompaniment/accompaniment';
import { WaitingRoomToCarValidationError } from '../../waiting-room-to-car.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WarningBannerComponent } from '../../../../components/common/warning-banner/warning-banner';
import { VehicleChecksCatDComponent } from '../components/vehicle-checks/vehicle-checks.cat-d';
import { configureTestSuite } from 'ng-bullet';
import { VehicleChecksCompletedToggled, } from '../../../../modules/tests/test-data/cat-d/vehicle-checks/vehicle-checks.cat-d.action';
import { CandidateDeclarationSigned, SetDeclarationStatus, } from '../../../../modules/tests/pre-test-declarations/common/pre-test-declarations.actions';
import { VehicleChecksToggleComponent } from '../../components/vehicle-checks-completed/vehicle-checks-completed';
import { CandidateDeclarationSignedComponent } from '../../components/candidate-declaration/candidate-declaration';
describe('WaitingRoomToCarCatDPage', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                WaitingRoomToCarCatDPage,
                MockComponent(EndTestLinkComponent),
                MockComponent(VehicleRegistrationComponent),
                MockComponent(VehicleDetailsCardComponent),
                MockComponent(VehicleDetailsComponent),
                MockComponent(AccompanimentCardComponent),
                MockComponent(AccompanimentComponent),
                MockComponent(VehicleChecksCatDComponent),
                MockComponent(WarningBannerComponent),
                MockComponent(VehicleChecksToggleComponent),
                MockComponent(CandidateDeclarationSignedComponent),
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
                                category: 'D',
                                vehicleDetails: {},
                                accompaniment: {},
                                testData: {
                                    vehicleChecks: {
                                        tellMeQuestions: [],
                                        showMeQuestions: [],
                                    },
                                    seriousFaults: [],
                                    eyesightTest: {},
                                },
                                journalData: {
                                    candidate: {
                                        candidateName: 'Joe Bloggs',
                                    },
                                },
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
                { provide: QuestionProvider, useClass: QuestionProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(WaitingRoomToCarCatDPage);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('ionViewWillLeave', function () {
        it('should dispatch the PersistTests action', function () {
            component.ionViewWillLeave();
            expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests());
        });
    });
    describe('onSubmit', function () {
        it('should dispatch the appropriate WaitingRoomToCarValidationError actions', fakeAsync(function () {
            fixture.detectChanges();
            component.form = new FormGroup({
                requiredControl1: new FormControl(null, [Validators.required]),
                requiredControl2: new FormControl(null, [Validators.required]),
                notRequiredControl: new FormControl(null),
            });
            component.onSubmit();
            tick();
            expect(store$.dispatch)
                .toHaveBeenCalledWith(new WaitingRoomToCarValidationError('requiredControl1 is blank'));
            expect(store$.dispatch)
                .toHaveBeenCalledWith(new WaitingRoomToCarValidationError('requiredControl2 is blank'));
            expect(store$.dispatch)
                .not
                .toHaveBeenCalledWith(new WaitingRoomToCarValidationError('notRequiredControl is blank'));
        }));
        it('should navigate to the test report page', fakeAsync(function () {
            fixture.detectChanges();
            component.form = new FormGroup({
                requiredControl1: new FormControl({ value: 1, disabled: false }, [Validators.required]),
                requiredControl2: new FormControl({ value: 1, disabled: false }, [Validators.required]),
                notRequiredControl: new FormControl(null),
            });
            component.onSubmit();
            tick();
            expect(component.navController.push).toHaveBeenCalledWith('TestReportCatDPage');
        }));
    });
    describe('vehicleChecksCompletedOutcomeChanged', function () {
        it('should dispatch VehicleChecksCompletedToggled action with the value passed in', function () {
            component.vehicleChecksCompletedOutcomeChanged(true);
            expect(store$.dispatch).toHaveBeenCalledWith(new VehicleChecksCompletedToggled(true));
        });
    });
    describe('candidateDeclarationOutcomeChanged', function () {
        it('should dispatch a SetDeclarationStatus action with the value passed in and CandidateDeclarationSigned', function () {
            component.candidateDeclarationOutcomeChanged(false);
            expect(store$.dispatch).toHaveBeenCalledWith(new SetDeclarationStatus(false));
            expect(store$.dispatch).toHaveBeenCalledWith(new CandidateDeclarationSigned());
        });
    });
});
//# sourceMappingURL=waiting-room-to-car.cat-d.page.spec.js.map