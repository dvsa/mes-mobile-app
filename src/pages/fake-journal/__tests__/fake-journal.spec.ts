import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, Platform } from 'ionic-angular';
import { NavControllerMock, PlatformMock } from 'ionic-mocks';

import { FakeJournalPage } from '../fake-journal';

import { AppModule } from '../../../app/app.module';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { MockComponent } from 'ng-mocks';
import { PracticeModeBanner } from '../../../components/practice-mode-banner/practice-mode-banner';
import { TestSlotComponent } from '../../journal/components/test-slot/test-slot';
import { LocationComponent } from '../../journal/components/location/location';
import { PracticeTestReportCardComponent }
  from '../../journal/components/practice-test-report-card/practice-test-report-card';

describe('FakeJournalPage', () => {
  let fixture: ComponentFixture<FakeJournalPage>;
  let component: FakeJournalPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FakeJournalPage,
        MockComponent(LocationComponent),
        MockComponent(TestSlotComponent),
        MockComponent(PracticeModeBanner),
        MockComponent(PracticeTestReportCardComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FakeJournalPage);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });
});
