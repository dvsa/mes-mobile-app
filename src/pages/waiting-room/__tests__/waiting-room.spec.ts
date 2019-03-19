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
import {
  ToggleResidencyDeclaration,
  ToggleInsuranceDeclaration,
} from '../../../modules/test/pre-test-declarations/pre-test-declarations.actions';
import { PreTestDeclarationsModule } from '../../../modules/test/pre-test-declarations/pre-test-declarations.module';
import { DeviceProvider } from '../../../providers/device/device';
import { DeviceProviderMock } from '../../../providers/device/__mocks__/device.mock';

describe('WaitingRoomPage', () => {
  let fixture: ComponentFixture<WaitingRoomPage>;
  let component: WaitingRoomPage;
  let store$: Store<StoreModel>;
  let storeDispatchSpy: jasmine.Spy;
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
        PreTestDeclarationsModule,
        AppModule,
        StoreModule.forFeature('candidate', () => mockCandidate),
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
    storeDispatchSpy = spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('declaration status', () => {
      it('should emit a residency declaration toggle action when changed', () => {
        component.residencyDeclarationChanged();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleResidencyDeclaration());
      });
      it('should emit an insurance declaration toggle action when changed', () => {
        component.insuranceDeclarationChanged();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleInsuranceDeclaration());
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
