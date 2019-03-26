
import { ComponentFixture, async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { WaitingRoomPage } from '../waiting-room';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { By } from '@angular/platform-browser';
import { ComponentsModule } from './../../../components/components.module';

import {
  ToggleResidencyDeclaration,
  ToggleInsuranceDeclaration,
  ClearPreTestDeclarations,
} from '../../../modules/tests/pre-test-declarations/pre-test-declarations.actions';
import { DeviceProvider } from '../../../providers/device/device';
import { DeviceProviderMock } from '../../../providers/device/__mocks__/device.mock';
import {
  initialState as preTestDeclarationInitialState,
} from '../../../modules/tests/pre-test-declarations/pre-test-declarations.reducer';

describe('WaitingRoomPage', () => {
  let fixture: ComponentFixture<WaitingRoomPage>;
  let component: WaitingRoomPage;
  let store$: Store<StoreModel>;
  let deviceProvider: DeviceProvider;

  const mockCandidate = {
    driverNumber: '123',
    candidateName: {
      firstName: 'Joe',
      lastName: 'Bloggs',
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingRoomPage],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
        StoreModule.forFeature('tests', () => ({
          currentTest: {
            slotId: '123',
          },
          startedTests: {
            123: {
              candidate: mockCandidate,
              preTestDeclarations: preTestDeclarationInitialState,
            },
          },
        })),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DeviceProvider, useClass: DeviceProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(WaitingRoomPage);
        component = fixture.componentInstance;
      });

    deviceProvider = TestBed.get(DeviceProvider);
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('declaration status', () => {
      it('should emit a residency declaration toggle action when changed', () => {
        component.residencyDeclarationChanged();

        expect(store$.dispatch).toHaveBeenCalledWith(new ToggleResidencyDeclaration());
      });
      it('should emit an insurance declaration toggle action when changed', () => {
        component.insuranceDeclarationChanged();

        expect(store$.dispatch).toHaveBeenCalledWith(new ToggleInsuranceDeclaration());
      });
    });

    describe('ionViewDidEnter', () => {
      it('should enable single app mode if on ios', () => {
        component.ionViewDidEnter();
        expect(deviceProvider.enableSingleAppMode).toHaveBeenCalled();
      });
      describe('ionViewDidLeave', () => {
        it('should disable single app mode if on ios', () => {
          component.ionViewDidLeave();
          expect(deviceProvider.disableSingleAppMode).toHaveBeenCalled();
        });
      });
      describe('ionViewWillUnload', () => {
        it('should dispatch a clear declarations action', () => {
          component.ionViewWillUnload();
          expect(store$.dispatch).toHaveBeenCalledWith(new ClearPreTestDeclarations());
        });
      });
    });

    describe('DOM', () => {
      describe('Declaration checkboxes', () => {
        it('should call residency change handler when residency declaration is (un)checked', fakeAsync(() => {
          fixture.detectChanges();
          spyOn(component, 'residencyDeclarationChanged');
          const residencyCb = fixture.debugElement.query(By.css('#residency-declaration-checkbox'));
          residencyCb.triggerEventHandler('click', null);
          tick();
          fixture.detectChanges();
          expect(component.residencyDeclarationChanged).toHaveBeenCalled();
        }));
        it('should call insurance change handler when insurance declaration is (un)checked', fakeAsync(() => {
          fixture.detectChanges();
          spyOn(component, 'insuranceDeclarationChanged');
          const insuranceCb = fixture.debugElement.query(By.css('#insurance-declaration-checkbox'));
          insuranceCb.triggerEventHandler('click', null);
          tick();
          fixture.detectChanges();
          expect(component.insuranceDeclarationChanged).toHaveBeenCalled();
        }));
      });
    });
  });
});
