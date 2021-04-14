import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { Config, IonicModule, LoadingController, ModalController, NavController, Platform } from 'ionic-angular';
import { ConfigMock, LoadingControllerMock, ModalControllerMock, NavControllerMock, PlatformMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { AppModule } from '../../../../app/app.module';
import { SetExaminerConducted } from '../../../../modules/tests/examiner-conducted/examiner-conducted.actions';
import { IpadIssueLostSelected, IpadIssueSelected, OtherReasonUpdated, OtherSelected, TransferSelected, } from '../../../../modules/tests/rekey-reason/rekey-reason.actions';
import { SendCurrentTest, SendCurrentTestFailure, SendCurrentTestSuccess, } from '../../../../modules/tests/tests.actions';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { FindUserProvider } from '../../../../providers/find-user/find-user';
import { FindUserProviderMock } from '../../../../providers/find-user/__mocks__/find-user.mock';
import { NavigationStateProvider } from '../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { CAT_A_MOD1 } from '../../../page-names.constants';
import { IpadIssueComponent } from '../../components/ipad-issue/ipad-issue';
import { OtherReasonComponent } from '../../components/other-reason/other-reason';
import { TransferComponent } from '../../components/transfer/transfer';
import { rekeyReasonReducer } from '../../rekey-reason.reducer';
import { getUploadStatus } from '../../rekey-reason.selector';
import { RekeyReasonCatAMod1Page } from '../rekey-reason.cat-a-mod1.page';
import { configureTestSuite } from 'ng-bullet';
describe('RekeyReasonCatAMod1Page', function () {
    var fixture;
    var component;
    var loadingController;
    var navContoller;
    var modalController;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                RekeyReasonCatAMod1Page,
                MockComponent(IpadIssueComponent),
                MockComponent(TransferComponent),
                MockComponent(OtherReasonComponent),
            ],
            imports: [
                IonicModule,
                StoreModule.forRoot({
                    journal: function () { return ({
                        isLoading: false,
                        lastRefreshed: null,
                        slots: {},
                        selectedDate: '',
                        examiner: {
                            staffNumber: '1234567',
                        },
                    }); },
                    // TODO - PREP-AMOD1 update to use Cat A Mod 1 Schema
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
                    rekeyReason: rekeyReasonReducer,
                }),
                AppModule,
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: LoadingController, useFactory: function () { return LoadingControllerMock.instance(); } },
                { provide: ModalController, useFactory: function () { return ModalControllerMock.instance(); } },
                { provide: FindUserProvider, useClass: FindUserProviderMock },
                { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
                Store,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(RekeyReasonCatAMod1Page);
        component = fixture.componentInstance;
        loadingController = TestBed.get(LoadingController);
        navContoller = TestBed.get(NavController);
        modalController = TestBed.get(ModalController);
        store$ = TestBed.get(Store);
    }));
    describe('Class', function () {
        it('should create', function () {
            expect(component).toBeDefined();
        });
        describe('handleLoadingUI', function () {
            it('should setup a loading spinner when isUploading is set to true', function () {
                component.handleLoadingUI(true);
                expect(component.loadingSpinner).not.toBeNull;
            });
            it('should remove the loading spinner when isUploading is set to false', function () {
                component.loadingSpinner = loadingController.create();
                component.handleLoadingUI(false);
                expect(component.loadingSpinner).toBeNull();
            });
        });
        describe('onShowUploadRekeyModal', function () {
            var options = { cssClass: 'mes-modal-alert text-zoom-regular' };
            it('should display an upload modal', function () {
                component.onShowUploadRekeyModal();
                expect(modalController.create).toHaveBeenCalledWith('UploadRekeyModal', { retryMode: false }, options);
            });
            it('should display an upload modal in retry mode', function () {
                component.onShowUploadRekeyModal(true);
                expect(modalController.create).toHaveBeenCalledWith('UploadRekeyModal', { retryMode: true }, options);
            });
        });
        describe('handleUploadOutcome', function () {
            beforeEach(function () {
                spyOn(component, 'handleLoadingUI');
                spyOn(component, 'onShowUploadRekeyModal');
            });
            it('should display the loading spiner when an upload is in progress', function () {
                var action = new SendCurrentTest();
                var result = rekeyReasonReducer(null, action);
                var uploadStatus = getUploadStatus(result);
                component.handleUploadOutcome(uploadStatus);
                expect(component.handleLoadingUI).toHaveBeenCalledWith(true);
            });
            it('should display the retry modal when an upload fails', function () {
                var action = new SendCurrentTestFailure(false);
                var result = rekeyReasonReducer(null, action);
                var uploadStatus = getUploadStatus(result);
                component.handleUploadOutcome(uploadStatus);
                expect(component.handleLoadingUI).toHaveBeenCalledWith(false);
                expect(component.onShowUploadRekeyModal).toHaveBeenCalledWith(true);
            });
            it('should navigate to the next page and not display the retry modal when an upload is a duplicate', function () {
                var action = new SendCurrentTestFailure(true);
                var result = rekeyReasonReducer(null, action);
                var uploadStatus = getUploadStatus(result);
                component.handleUploadOutcome(uploadStatus);
                expect(component.handleLoadingUI).toHaveBeenCalledWith(false);
                expect(navContoller.push).toHaveBeenCalledWith(CAT_A_MOD1.REKEY_UPLOAD_OUTCOME_PAGE);
                expect(component.onShowUploadRekeyModal).not.toHaveBeenCalled();
            });
            it('should navigate to next page and not display the retry modal when an upload succeeds', function () {
                var action = new SendCurrentTestSuccess();
                var result = rekeyReasonReducer(null, action);
                var uploadStatus = getUploadStatus(result);
                component.handleUploadOutcome(uploadStatus);
                expect(component.handleLoadingUI).toHaveBeenCalledWith(false);
                expect(navContoller.push).toHaveBeenCalledWith(CAT_A_MOD1.REKEY_UPLOAD_OUTCOME_PAGE);
                expect(component.onShowUploadRekeyModal).not.toHaveBeenCalled();
            });
        });
    });
    describe('DOM', function () {
        it('should pass the ipad issue values to the ipad issue subcomponent', function () {
            store$.dispatch(new IpadIssueSelected(true));
            store$.dispatch(new IpadIssueLostSelected());
            fixture.detectChanges();
            var ipadIssueElement = fixture.debugElement.query(By.css('ipad-issue'))
                .componentInstance;
            expect(ipadIssueElement.selected).toEqual(true);
            expect(ipadIssueElement.lost).toEqual(true);
        });
        it('should pass the transfer values to the transfer subcomponent', function () {
            store$.dispatch(new TransferSelected(true));
            store$.dispatch(new SetExaminerConducted(123));
            fixture.detectChanges();
            var transferElement = fixture.debugElement.query(By.css('transfer'))
                .componentInstance;
            expect(transferElement.selected).toEqual(true);
            expect(transferElement.staffNumber).toEqual(123);
        });
        it('should pass the other reason values to the reason subcomponent', function () {
            store$.dispatch(new OtherSelected(true));
            store$.dispatch(new OtherReasonUpdated('Reason text'));
            fixture.detectChanges();
            var otherReasonElement = fixture.debugElement.query(By.css('other-reason'))
                .componentInstance;
            expect(otherReasonElement.selected).toEqual(true);
            expect(otherReasonElement.reason).toEqual('Reason text');
        });
    });
});
//# sourceMappingURL=rekey-reason.cat-a-mod1.page.spec.js.map