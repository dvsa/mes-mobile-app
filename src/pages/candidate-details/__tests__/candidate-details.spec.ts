import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { CandidateDetailsPage } from '../candidate-details';
import { AppModule } from '../../../app/app.module';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { Subscription } from 'rxjs/Subscription';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { MockComponent } from 'ng-mocks';
import { DisplayAddressComponent } from '../../../components/display-address/display-address';
import { CandidateDetailsCheckProvider } from '../../../providers/candidate-details-check/candidate-details-check';
import { CandidateDetailsCheckProviderMock }
  from '../../../providers/candidate-details-check/__mocks__/candidate-details-check.mock';

describe('CandidateDetailsPage', () => {
  let fixture: ComponentFixture<CandidateDetailsPage>;
  let component: CandidateDetailsPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CandidateDetailsPage,
        MockComponent(DisplayAddressComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: CandidateDetailsCheckProvider, useClass: CandidateDetailsCheckProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CandidateDetailsPage);
        component = fixture.componentInstance;
        component.subscription = new Subscription();
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('specialNeedsIsPopulated', () => {
    it('returns true for a populated array', () => {
      const specialNeedsString: string[] = ['one', 'two', 'three', 'four'];
      const result = component.specialNeedsIsPopulated(specialNeedsString);
      expect(result).toEqual(true);
    });

    it('returns false for string', () => {
      const specialNeedsString: string = 'No details supplied';
      const result = component.specialNeedsIsPopulated(specialNeedsString);
      expect(result).toEqual(false);
    });
  });

  describe('DOM', () => {
    // Unit tests for the components template
  });
});
