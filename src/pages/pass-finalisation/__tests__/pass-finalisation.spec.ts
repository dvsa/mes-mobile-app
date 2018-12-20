import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks-jest';

import { AppModule } from '../../../app/app.module';
import { PassFinalisationPage } from '../pass-finalisation';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';

describe('PassFinalisationPage', () => {
  let fixture: ComponentFixture<PassFinalisationPage>;
  let component: PassFinalisationPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PassFinalisationPage],
      imports: [IonicModule, AppModule],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PassFinalisationPage);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    // Unit tests for the components template
  });
});
