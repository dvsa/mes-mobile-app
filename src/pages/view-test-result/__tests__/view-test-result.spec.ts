import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../app/app.module';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { ViewTestResultPage } from '../view-test-result';
import { SearchProvider } from '../../../providers/search/search';
import { SearchProviderMock } from '../../../providers/search/__mocks__/search.mock';
import { MockComponent } from 'ng-mocks';
import { TestDetailsComponent } from '../components/test-details/test-details';
import { ExaminerDetailsComponent } from '../components/examiner-details/examiner-details';

describe('ViewTestResultPage', () => {
  let fixture: ComponentFixture<ViewTestResultPage>;
  let component: ViewTestResultPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewTestResultPage,
        MockComponent(TestDetailsComponent),
        MockComponent(ExaminerDetailsComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: SearchProvider, useClass:  SearchProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ViewTestResultPage);
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
  });
});
