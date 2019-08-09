import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, Platform, Config } from 'ionic-angular';
import { NavControllerMock, PlatformMock, ConfigMock } from 'ionic-mocks';
import { RekeyReasonPage } from '../rekey-reason';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { Store, StoreModule } from '@ngrx/store';
import { AppModule } from '../../../app/app.module';
import { MockComponent } from 'ng-mocks';
import { PracticeModeBanner } from '../../../components/practice-mode-banner/practice-mode-banner';

describe('RekeyReasonPage', () => {
  let fixture: ComponentFixture<RekeyReasonPage>;
  let component: RekeyReasonPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RekeyReasonPage,
        MockComponent(PracticeModeBanner),
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({}),
        AppModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        Store,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RekeyReasonPage);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });
});
