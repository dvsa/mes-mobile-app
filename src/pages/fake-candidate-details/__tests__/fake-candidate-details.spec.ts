import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, Platform, NavParams } from 'ionic-angular';
import { NavControllerMock, PlatformMock, NavParamsMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { FakeCandidateDetailsPage } from '../fake-candidate-details';
import { MockComponent } from 'ng-mocks';
import { DisplayAddressComponent } from '../../../components/display-address/display-address';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';

describe('FakeCandidateDetailsPage', () => {
  let fixture: ComponentFixture<FakeCandidateDetailsPage>;
  let component: FakeCandidateDetailsPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FakeCandidateDetailsPage,
        MockComponent(DisplayAddressComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FakeCandidateDetailsPage);
        component = fixture.componentInstance;
        component.slotId = `${end2endPracticeSlotId}_1`;
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });
});
