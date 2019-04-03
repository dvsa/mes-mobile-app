import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { BackToOfficePage } from '../back-to-office';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';

describe('BackToOfficePage', () => {
  let fixture: ComponentFixture<BackToOfficePage>;
  let component: BackToOfficePage;
  let navCtrl: NavController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BackToOfficePage],
      imports: [IonicModule, AppModule],
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
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('popToRoot', () => {
    it('should call the popToRoot method in the navcontroller', () => {
      component.popToRoot();
      expect(navCtrl.popToRoot).toHaveBeenCalled();
    });
  });
});
