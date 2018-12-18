import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks-jest';

import { AppModule } from '../../../app/app.module';
import { OfficePage } from '../office';
import { AuthenticationServiceProvider } from '../../../providers/authentication-service/authentication-service';
import { AuthenticationServiceProviderMock } from '../../../providers/authentication-service/authentication-service.mock';

describe('OfficePage', () => {
  let fixture: ComponentFixture<OfficePage>;
  let component: OfficePage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OfficePage],
      imports: [IonicModule, AppModule],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationServiceProvider, useClass: AuthenticationServiceProviderMock },
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(OfficePage);
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
