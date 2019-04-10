import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { BackToOfficePage } from '../back-to-office';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { TestStatusDecided } from '../../../modules/tests/test-status/test-status.actions';

describe('BackToOfficePage', () => {
  let fixture: ComponentFixture<BackToOfficePage>;
  let component: BackToOfficePage;
  let navCtrl: NavController;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BackToOfficePage],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BackToOfficePage);
        component = fixture.componentInstance;
        navCtrl = TestBed.get(NavController);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
    describe('ionViewDidEnter', () => {
      it('should dispatch a TestStatusDecided action', () => {
        component.ionViewDidEnter();
        expect(store$.dispatch).toHaveBeenCalledWith(new TestStatusDecided());
      });
    });
  });

  describe('popToRoot', () => {
    it('should call the popToRoot method in the navcontroller', () => {
      component.popToRoot();
      expect(navCtrl.popToRoot).toHaveBeenCalled();
    });
  });
});
