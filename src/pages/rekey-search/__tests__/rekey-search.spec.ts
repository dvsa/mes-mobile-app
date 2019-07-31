import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Platform, ModalController, ViewController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, PlatformMock, ModalControllerMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../app/app.module';
import { RekeySearchPage } from '../rekey-search';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { App } from '../../../app/app.component';
import { MockAppComponent } from '../../../app/__mocks__/app.component.mock';
import { ComponentsModule } from '../../../components/components.module';

describe('RekeySearchPage', () => {
  let fixture: ComponentFixture<RekeySearchPage>;
  let component: RekeySearchPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RekeySearchPage,
      ],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: App, useClass: MockAppComponent },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RekeySearchPage);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {

    it('should create', () => {
      expect(component).toBeDefined();
    });
  });
});
