import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, Platform, Config, LoadingController, ModalController } from 'ionic-angular';
import { NavControllerMock, PlatformMock, ConfigMock, LoadingControllerMock, ModalControllerMock } from 'ionic-mocks';
import { RekeyReasonCatBEPage } from '../rekey-reason.cat-be.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { Store, StoreModule } from '@ngrx/store';
import { AppModule } from '../../../../app/app.module';
import { RekeyReasonModel } from '../../rekey-reason.model';
import { getUploadStatus } from '../../rekey-reason.selector';
import {
  SendCurrentTest,
  SendCurrentTestSuccess,
  SendCurrentTestFailure,
} from '../../../../modules/tests/tests.actions';
import { rekeyReasonReducer } from '../../rekey-reason.reducer';
import { CAT_BE } from '../../../page-names.constants';
import { AppInfoModel } from '../../../../modules/app-info/app-info.model';
import {
  IpadIssueSelected,
  OtherSelected,
  OtherReasonUpdated,
  TransferSelected,
  IpadIssueLostSelected,
} from '../../../../modules/tests/rekey-reason/rekey-reason.actions';
import { By } from '@angular/platform-browser';
import { SetExaminerConducted } from '../../../../modules/tests/examiner-conducted/examiner-conducted.actions';
import { MockComponent } from 'ng-mocks';
import { FindUserProvider } from '../../../../providers/find-user/find-user';
import { FindUserProviderMock } from '../../../../providers/find-user/__mocks__/find-user.mock';
import { IpadIssueComponent } from '../../components/ipad-issue/ipad-issue';
import { TransferComponent } from '../../components/transfer/transfer';
import { OtherReasonComponent } from '../../components/other-reason/other-reason';
import { NavigationStateProvider } from '../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { configureTestSuite } from 'ng-bullet';

describe('RekeyReasonCatBEPage', () => {
  let fixture: ComponentFixture<RekeyReasonCatBEPage>;
  let component: RekeyReasonCatBEPage;
  let loadingController: LoadingController;
  let navContoller: NavController;
  let modalController: ModalController;
  let store$: Store<AppInfoModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        RekeyReasonCatBEPage,
        MockComponent(IpadIssueComponent),
        MockComponent(TransferComponent),
        MockComponent(OtherReasonComponent),
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({
          journal: () => ({
            isLoading: false,
            lastRefreshed: null,
            slots: {},
            selectedDate: '',
            examiner: {
              staffNumber: '1234567',
            },
          }),
          tests: () => ({
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
          }),
          rekeyReason: rekeyReasonReducer,
        }),
        AppModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
        { provide: FindUserProvider, useClass: FindUserProviderMock },
        { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
        Store,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RekeyReasonCatBEPage);
    component = fixture.componentInstance;
    loadingController = TestBed.get(LoadingController);
    navContoller = TestBed.get(NavController);
    modalController = TestBed.get(ModalController);
    store$ = TestBed.get(Store);
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('handleLoadingUI', () => {
      it('should setup a loading spinner when isUploading is set to true', () => {
        component.handleLoadingUI(true);

        expect(component.loadingSpinner).not.toBeNull;
      });
      it('should remove the loading spinner when isUploading is set to false', () => {
        component.loadingSpinner = loadingController.create();

        component.handleLoadingUI(false);

        expect(component.loadingSpinner).toBeNull();
      });
    });

    describe('onShowUploadRekeyModal', () => {
      const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
      it('should display an upload modal', () => {
        component.onShowUploadRekeyModal();
        expect(modalController.create).toHaveBeenCalledWith('UploadRekeyModal', { retryMode: false }, options);
      });
      it('should display an upload modal in retry mode', () => {
        component.onShowUploadRekeyModal(true);
        expect(modalController.create).toHaveBeenCalledWith('UploadRekeyModal', { retryMode: true }, options);
      });
    });

    describe('handleUploadOutcome', () => {
      beforeEach(() => {
        spyOn(component, 'handleLoadingUI');
        spyOn(component, 'onShowUploadRekeyModal');
      });

      it('should display the loading spiner when an upload is in progress', () => {
        const action = new SendCurrentTest();
        const result: RekeyReasonModel = rekeyReasonReducer(null, action);
        const uploadStatus = getUploadStatus(result);

        component.handleUploadOutcome(uploadStatus);

        expect(component.handleLoadingUI).toHaveBeenCalledWith(true);
      });
      it('should display the retry modal when an upload fails', () => {
        const action = new SendCurrentTestFailure(false);
        const result: RekeyReasonModel = rekeyReasonReducer(null, action);
        const uploadStatus = getUploadStatus(result);

        component.handleUploadOutcome(uploadStatus);

        expect(component.handleLoadingUI).toHaveBeenCalledWith(false);
        expect(component.onShowUploadRekeyModal).toHaveBeenCalledWith(true);

      });
      it('should navigate to the next page and not display the retry modal when an upload is a duplicate', () => {
        const action = new SendCurrentTestFailure(true);
        const result: RekeyReasonModel = rekeyReasonReducer(null, action);
        const uploadStatus = getUploadStatus(result);

        component.handleUploadOutcome(uploadStatus);

        expect(component.handleLoadingUI).toHaveBeenCalledWith(false);
        expect(navContoller.push).toHaveBeenCalledWith(CAT_BE.REKEY_UPLOAD_OUTCOME_PAGE);
        expect(component.onShowUploadRekeyModal).not.toHaveBeenCalled();

      });
      it('should navigate to next page and not display the retry modal when an upload succeeds', () => {
        const action = new SendCurrentTestSuccess();
        const result: RekeyReasonModel = rekeyReasonReducer(null, action);
        const uploadStatus = getUploadStatus(result);

        component.handleUploadOutcome(uploadStatus);

        expect(component.handleLoadingUI).toHaveBeenCalledWith(false);
        expect(navContoller.push).toHaveBeenCalledWith(CAT_BE.REKEY_UPLOAD_OUTCOME_PAGE);
        expect(component.onShowUploadRekeyModal).not.toHaveBeenCalled();
      });
    });
  });
  describe('DOM', () => {

    it('should pass the ipad issue values to the ipad issue subcomponent', () => {
      store$.dispatch(new IpadIssueSelected(true));
      store$.dispatch(new IpadIssueLostSelected());
      fixture.detectChanges();
      const ipadIssueElement = fixture.debugElement.query(By.css('ipad-issue'))
        .componentInstance as IpadIssueComponent;
      expect(ipadIssueElement.selected).toEqual(true);
      expect(ipadIssueElement.lost).toEqual(true);
    });
    it('should pass the transfer values to the transfer subcomponent', () => {
      store$.dispatch(new TransferSelected(true));
      store$.dispatch(new SetExaminerConducted(123));
      fixture.detectChanges();
      const transferElement = fixture.debugElement.query(By.css('transfer'))
        .componentInstance as TransferComponent;
      expect(transferElement.selected).toEqual(true);
      expect(transferElement.staffNumber).toEqual(123);
    });
    it('should pass the other reason values to the reason subcomponent', () => {
      store$.dispatch(new OtherSelected(true));
      store$.dispatch(new OtherReasonUpdated('Reason text'));
      fixture.detectChanges();
      const otherReasonElement = fixture.debugElement.query(By.css('other-reason'))
        .componentInstance as OtherReasonComponent;
      expect(otherReasonElement.selected).toEqual(true);
      expect(otherReasonElement.reason).toEqual('Reason text');
    });
  });
});
