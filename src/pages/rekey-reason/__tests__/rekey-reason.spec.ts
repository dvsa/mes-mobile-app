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
import { SendCurrentTest, SendCurrentTestSuccess, SendCurrentTestFailure } from '../../../modules/tests/tests.actions';
import { rekeyReasonReducer } from '../rekey-reason.reducer';
import { REKEY_UPLOADED_PAGE } from '../../page-names.constants';
import { AppInfoModel } from '../../../modules/app-info/app-info.model';
import {
  IpadIssueTechFault,
  OtherSelected,
  IpadIssueSelected,
  IpadIssueLost,
  IpadIssueStolen,
  IpadIssueBroken,
  OtherReasonUpdated,
} from '../../../modules/tests/rekey-reason/rekey-reason.actions';

fdescribe('RekeyReasonPage', () => {
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
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            testStatus: {},
            startedTests: {
              123: {
                rekeyReason: {
                  ipadIssue: {
                    selected: true,
                    broken: false,
                    lost: false,
                    technicalFault: false,
                    stolen: false,
                  },
                  other: {
                    selected: true,
                    reason: '',
                  },
                  transfer: {
                    selected: false,
                  },
                },
              },
            },
          }),
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
    spyOn(store$, 'dispatch');
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
        const action = new SendCurrentTestFailure('1');
        const result: RekeyReasonModel = rekeyReasonReducer(null, action);
        const uploadStatus = getUploadStatus(result);

        component.handleUploadOutcome(uploadStatus);

        expect(component.handleLoadingUI).toHaveBeenCalledWith(false);
        expect(component.onShowModal).toHaveBeenCalledWith(true);

      });
      it('should display the retry modal when an upload succeeds', () => {
        const action = new SendCurrentTestSuccess('1');
        const result: RekeyReasonModel = rekeyReasonReducer(null, action);
        const uploadStatus = getUploadStatus(result);

        component.handleUploadOutcome(uploadStatus);

        expect(component.handleLoadingUI).toHaveBeenCalledWith(false);
        expect(navContoller.push).toHaveBeenCalledWith(REKEY_UPLOADED_PAGE);
      });
    });

  });

  describe('Selecting issue emits the correct event', () => {
    it('clicking ipad issue while its showing emits ipad issue selected event', () => {
      const compiled = fixture.debugElement.nativeElement;
      const elem = compiled.querySelector('#ipadIssue');
      expect(elem.checked).toBeFalsy();
      elem.click();
      expect(elem.checked).toBeTruthy();
      fixture.detectChanges();
      expect(store$.dispatch).toHaveBeenCalledWith(new IpadIssueSelected(false));
    });

    it('clicking other reason emits ipad issue selected event', () => {
      const compiled = fixture.debugElement.nativeElement;
      const elem = compiled.querySelector('#otherSelected');
      expect(elem.checked).toBeFalsy();
      elem.click();
      expect(elem.checked).toBeTruthy();
      fixture.detectChanges();
      expect(store$.dispatch).toHaveBeenCalledWith(new OtherSelected(false));
    });

    it('clicking ipad issue tech fault emits the correct event', () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const elem = compiled.querySelector('#ipadIssueTechFault');
      elem.click();
      fixture.detectChanges();
      expect(store$.dispatch).toHaveBeenCalledWith(new IpadIssueTechFault(true));
    });

    it('clicking ipad issue lost emits the correct event', () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const elem = compiled.querySelector('#ipadIssueLost');
      elem.click();
      fixture.detectChanges();
      expect(store$.dispatch).toHaveBeenCalledWith(new IpadIssueLost(true));
    });

    it('clicking ipad issue stolen emits the correct event', () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const elem = compiled.querySelector('#ipadIssueStolen');
      elem.click();
      fixture.detectChanges();
      expect(store$.dispatch).toHaveBeenCalledWith(new IpadIssueStolen(true));
    });

    it('clicking ipad issue broken emits the correct event', () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const elem = compiled.querySelector('#ipadIssueBroken');
      elem.click();
      fixture.detectChanges();
      expect(store$.dispatch).toHaveBeenCalledWith(new IpadIssueBroken(true));
    });

    it('entering value into reason for rekey emits the correct event', () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const elem = compiled.querySelector('#otherReasonUpdated');
      elem.value = 'some random value';
      elem.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      expect(store$.dispatch).toHaveBeenCalledWith(jasmine.any(OtherReasonUpdated));
    });
  });
});
