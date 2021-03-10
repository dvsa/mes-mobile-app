import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
import { TranslateModule } from '@ngx-translate/core';
import { TestSlotAttributes } from '@dvsa/mes-test-schema/categories/common';
import { configureTestSuite } from 'ng-bullet';
import { AlertController, IonicModule, NavController, Platform } from 'ionic-angular';
import { AppModule } from '../../../app/app.module';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { NavControllerMock, PlatformMock } from 'ionic-mocks';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DeviceAuthenticationProviderMock }
  from '../../../providers/device-authentication/__mocks__/device-authentication.mock';
import { Subscription } from 'rxjs';
import { ConfirmTestDetailsPage, D255, GearBox, LicenceReceivedText } from '../confirm-test-details.page';
import { ConfirmTestDetailsViewDidEnter } from '../confirm-test-details.actions';
import { TestOutcome } from '../../../modules/tests/tests.constants';
import { ActivityCodeModel } from '../../office/components/activity-code/activity-code.constants';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CAT_B, CAT_C } from '../../page-names.constants';

describe('ConfirmTestDetailsPage', () => {
  let fixture: ComponentFixture<ConfirmTestDetailsPage>;
  let component: ConfirmTestDetailsPage;
  let store$: Store<StoreModel>;
  let deviceAuthenticationProvider: DeviceAuthenticationProvider;

  const mockAlertCtrl = {
    create: () => {
      return {
        present: () => {
        },
      };
    },
  };

  const testSlotAttributes: TestSlotAttributes = {
    welshTest: false,
    extendedTest: false,
    slotId: 123,
    specialNeeds: false,
    start: '',
    vehicleTypeCode: '',
  };

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmTestDetailsPage,
      ],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            testStatus: {},
            startedTests: {
              123: {
                postTestDeclarations: {
                  healthDeclarationAccepted: false,
                  passCertificateNumberReceived: false,
                  postTestSignature: '',
                },
                journalData: {
                  testSlotAttributes,
                  candidate: candidateMock,
                },
              },
            },
          }),
        }),
        TranslateModule,
      ],
      providers: [
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: AlertController, useValue: mockAlertCtrl },
        { provide: DeviceAuthenticationProvider, useClass: DeviceAuthenticationProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmTestDetailsPage);
    component = fixture.componentInstance;
    deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch').and.callThrough();
    component.subscription = new Subscription();
  }));

  describe('ionViewDidEnter', () => {
    it('should dispatch ConfirmTestDetailsViewDidEnter', () => {
      component.ionViewDidEnter();
      expect(store$.dispatch).toHaveBeenCalledWith(new ConfirmTestDetailsViewDidEnter());
    });
  });

  describe('clickBack', () => {
    it('should should trigger the lock screen', () => {
      component.clickBack();
      expect(deviceAuthenticationProvider.triggerLockScreen).toHaveBeenCalled();
    });
  });

  describe('isTerminated', () => {
    it('should return true if test outcome is terminated', () => {
      expect(component.isTerminated(TestOutcome.Terminated)).toEqual(true);
    });
    it('should return false if test outcome is not terminated', () => {
      expect(component.isTerminated(TestOutcome.Passed)).toEqual(false);
    });
  });

  describe('isPassed', () => {
    it('should return true if test outcome is Passed', () => {
      expect(component.isPassed(TestOutcome.Passed)).toEqual(true);
    });
    it('should return false if test outcome is not Passed', () => {
      expect(component.isPassed(TestOutcome.Terminated)).toEqual(false);
    });
  });

  describe('getActivityCode', () => {
    it('should return true if test outcome is Passed', () => {
      const activityCode = {
        activityCode: '1',
      } as ActivityCodeModel;
      expect(component.getActivityCode(activityCode)).toEqual('1');
    });
  });

  describe('getProvisionalText', () => {
    it('should return LicenceReceivedText.TRUE if true', () => {
      expect(component.getProvisionalText(true)).toEqual(LicenceReceivedText.TRUE);
    });
    it('should return LicenceReceivedText.FALSE if false', () => {
      expect(component.getProvisionalText(false)).toEqual(LicenceReceivedText.FALSE);
    });
  });

  describe('getTransmissionText', () => {
    it('should return GearBox.MANUAL if Manual', () => {
      expect(component.getTransmissionText('Manual')).toEqual(GearBox.MANUAL);
    });
    it('should return GearBox.AUTOMATIC if Automatic', () => {
      expect(component.getTransmissionText('Automatic')).toEqual(GearBox.AUTOMATIC);
    });
  });

  describe('getD255Text', () => {
    it('should return D255.TRUE if true', () => {
      expect(component.getD255Text(true)).toEqual(D255.TRUE);
    });
    it('should return D255.FALSE if false', () => {
      expect(component.getD255Text(false)).toEqual(D255.FALSE);
    });
  });

  describe('onSubmit', () => {
    it('should call showConfirmTestDetailsModal', async () => {
      spyOn(component, 'showConfirmTestDetailsModal');
      await component.onSubmit();
      expect(component.showConfirmTestDetailsModal).toHaveBeenCalled();
    });
  });

  describe('showConfirmTestDetailsModal', () => {
    it('should call alertController.create', async () => {
      spyOn(component.alertController, 'create').and.callThrough();
      await component.showConfirmTestDetailsModal();
      expect(component.alertController.create).toHaveBeenCalled();
    });
  });

  describe('persistAndNavigate', () => {
    it('should call device auth provider triggerLockScreen', () => {
      component.persistAndNavigate();
      expect(deviceAuthenticationProvider.triggerLockScreen).toHaveBeenCalled();
    });
  });

  describe('pageToNavigate', () => {
    it('should return Cat B and TEST_REPORT_PAGE when passed in as values', () => {
      expect(component.pageToNavigate(TestCategory.B, 'TEST_REPORT_PAGE')).toEqual(CAT_B.TEST_REPORT_PAGE);
    });
    it('should return Cat C and PASS_FINALISATION_PAGE when passed in as values', () => {
      expect(component.pageToNavigate(TestCategory.C, 'PASS_FINALISATION_PAGE')).toEqual(CAT_C.PASS_FINALISATION_PAGE);
    });
  });

  describe('ionViewDidLeave', () => {
    it('should unsubscribe when subscription', () => {
      component.subscription = new Subscription();
      spyOn(component.subscription, 'unsubscribe');
      component.ionViewDidLeave();
      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });
  });

});
