import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, Platform, Config, LoadingController, ModalController } from 'ionic-angular';
import { NavControllerMock, PlatformMock, ConfigMock, LoadingControllerMock, ModalControllerMock } from 'ionic-mocks';
import { RekeyReasonPage } from '../rekey-reason';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { Store, StoreModule } from '@ngrx/store';
import { AppModule } from '../../../app/app.module';
import { RekeyReasonModel } from '../rekey-reason.model';
import { getUploadStatus } from '../rekey-reason.selector';
import {
  SendCurrentTest,
  SendCurrentTestSuccess,
  SendCurrentTestFailure,
  StartTest,
} from '../../../modules/tests/tests.actions';
import { rekeyReasonReducer } from '../rekey-reason.reducer';
import { REKEY_UPLOAD_OUTCOME_PAGE } from '../../page-names.constants';
import { AppInfoModel } from '../../../modules/app-info/app-info.model';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import {
  IpadIssueSelected,
  OtherSelected,
  OtherReasonUpdated,
} from '../../../modules/tests/rekey-reason/rekey-reason.actions';
import { By } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

describe('RekeyReasonPage', () => {
  let fixture: ComponentFixture<RekeyReasonPage>;
  let component: RekeyReasonPage;
  let loadingController: LoadingController;
  let navContoller: NavController;
  let modalController: ModalController;
  let store$: Store<AppInfoModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RekeyReasonPage,
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({
          tests: testsReducer,
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
        Store,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RekeyReasonPage);
        component = fixture.componentInstance;
        loadingController = TestBed.get(LoadingController);
        navContoller = TestBed.get(NavController);
        modalController = TestBed.get(ModalController);
      });
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

    describe('onShowModal', () => {
      const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
      it('should display an upload modal', () => {
        component.onShowModal();
        expect(modalController.create).toHaveBeenCalledWith('UploadRekeyModal', { retryMode: false }, options);
      });
      it('should display an upload modal in retry mode', () => {
        component.onShowModal(true);
        expect(modalController.create).toHaveBeenCalledWith('UploadRekeyModal', { retryMode: true }, options);
      });
    });

    describe('handleUploadOutcome', () => {
      beforeEach(() => {
        spyOn(component, 'handleLoadingUI');
        spyOn(component, 'onShowModal');
      });

      it('should display the loading spiner when an upload is in progress', () => {
        const action = new SendCurrentTest();
        const result: RekeyReasonModel = rekeyReasonReducer(null, action);
        const uploadStatus = getUploadStatus(result);

        component.handleUploadOutcome(uploadStatus);

        expect(component.handleLoadingUI).toHaveBeenCalledWith(true);
      });
      it('should display the retry modal when an upload fails', () => {
        const action = new SendCurrentTestFailure(new HttpErrorResponse({ status: 500 }));
        const result: RekeyReasonModel = rekeyReasonReducer(null, action);
        const uploadStatus = getUploadStatus(result);

        component.handleUploadOutcome(uploadStatus);

        expect(component.handleLoadingUI).toHaveBeenCalledWith(false);
        expect(component.onShowModal).toHaveBeenCalledWith(true);

      });
      it('should navigate to the next page and not display the retry modal when an upload is a duplicate', () => {
        const action = new SendCurrentTestFailure(new HttpErrorResponse({ status: 409 }));
        const result: RekeyReasonModel = rekeyReasonReducer(null, action);
        const uploadStatus = getUploadStatus(result);

        component.handleUploadOutcome(uploadStatus);

        expect(component.handleLoadingUI).toHaveBeenCalledWith(false);
        expect(navContoller.push).toHaveBeenCalledWith(REKEY_UPLOAD_OUTCOME_PAGE);
        expect(component.onShowModal).not.toHaveBeenCalled();

      });
      it('should navigate to next page and not display the retry modal when an upload succeeds', () => {
        const action = new SendCurrentTestSuccess();
        const result: RekeyReasonModel = rekeyReasonReducer(null, action);
        const uploadStatus = getUploadStatus(result);

        component.handleUploadOutcome(uploadStatus);

        expect(component.handleLoadingUI).toHaveBeenCalledWith(false);
        expect(navContoller.push).toHaveBeenCalledWith(REKEY_UPLOAD_OUTCOME_PAGE);
        expect(component.onShowModal).not.toHaveBeenCalled();
      });
    });
  });

  describe('Selecting issue emits the correct event', () => {
    it('emiting ipadIssueSelected shows the ipadIssue section', () => {
      store$.dispatch(new StartTest(103, true));
      store$.dispatch(new IpadIssueSelected(true));
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#ipadIssue'))).toBeDefined();
    });

    it('clicking other reason emits other selected event', () => {
      store$.dispatch(new StartTest(103, true));
      store$.dispatch(new OtherSelected(true));
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#otherSelected'))).toBeDefined();
    });

    it('entering other reason emits the reason updated event', () => {
      store$.dispatch(new StartTest(103, true));
      store$.dispatch(new OtherSelected(true));
      fixture.detectChanges();
      spyOn(store$, 'dispatch');
      const compiled = fixture.debugElement.nativeElement;
      const elem = compiled.querySelector('#otherReasonUpdated');
      elem.value = 'some random value';
      elem.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      expect(store$.dispatch).toHaveBeenCalledWith(jasmine.any(OtherReasonUpdated));
    });
  });
});
