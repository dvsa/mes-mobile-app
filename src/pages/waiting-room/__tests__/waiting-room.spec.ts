import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { WaitingRoomPage } from '../waiting-room';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { StoreModule, Store } from '@ngrx/store';
import { waitingRoomReducer } from '../waiting-room.reducer';
import { StoreModel } from '../../../shared/models/store.model';
import { ToggleResidencyDeclaration, ToggleInsuranceDeclaration } from '../waiting-room.actions';

describe('WaitingRoomPage', () => {
  let fixture: ComponentFixture<WaitingRoomPage>;
  let component: WaitingRoomPage;
  let store$: Store<StoreModel>;
  let storeDispatchSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingRoomPage],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({
          waitingRoom: waitingRoomReducer,
        }),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(WaitingRoomPage);
        component = fixture.componentInstance;
      });

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
  });

  describe('DOM', () => {
    // Unit tests for the components template
  });
});
