import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams, Config, Platform, NavController } from 'ionic-angular';
import {
  ConfigMock,
  PlatformMock,
  NavParamsMock,
  NavControllerMock,
} from 'ionic-mocks';
import { StoreModule } from '@ngrx/store';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { ReverseDiagramCatBEPage } from '../reverse-diagram-modal';
import { AppModule } from '../../../../../../app/app.module';
import { App } from '../../../../../../app/app.component';
import { MockAppComponent } from '../../../../../../app/__mocks__/app.component.mock';
import { NavigationProvider } from '../../../../../../providers/navigation/navigation';
import { NavigationProviderMock } from '../../../../../../providers/navigation/__mocks__/navigation.mock';
import { NavigationStateProvider } from '../../../../../../providers/navigation-state/navigation-state';
import {
  NavigationStateProviderMock,
} from '../../../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { ReversingDistancesProvider } from '../../../../../../providers/reversing-distances/reversing-distances';

describe('reverseDiagramModal', () => {
  let fixture: ComponentFixture<ReverseDiagramCatBEPage>;
  let component: ReverseDiagramCatBEPage;

  const vehicleDetails: CatBEUniqueTypes.VehicleDetails = {
    vehicleLength: 10,
    vehicleWidth: 2.75,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReverseDiagramCatBEPage],
      imports: [
        AppModule,
        IonicModule,
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            testStatus: {},
            startedTests: {
              123: {
                category: TestCategory.BE,
                vehicleDetails: {
                  vehicleLength: vehicleDetails.vehicleLength,
                  vehicleWidth: vehicleDetails.vehicleWidth,
                },
                accompaniment: {},
                testData: {
                  dangerousFaults: {},
                  drivingFaults: {},
                  manoeuvres: {},
                  seriousFaults: {},
                  testRequirements: {},
                  ETA: {},
                  eco: {},
                  vehicleChecks: {
                    showMeQuestions: [{
                      code: 'S3',
                      description: '',
                      outcome: '',
                    }],
                    tellMeQuestions: [{
                      code: '',
                      description: '',
                      outcome: '',
                    }],
                  },
                  eyesightTest: {},
                },
                activityCode: '28',
                journalData: {
                  candidate: {
                    candidateName: 'Joe Bloggs',
                    driverNumber: '123',
                  },
                },
                rekey: false,
              },
            },
          }),
        }),
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: App, useClass: MockAppComponent },
        { provide: NavigationProvider, useClass: NavigationProviderMock },
        { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
        ReversingDistancesProvider,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ReverseDiagramCatBEPage);
        component = fixture.componentInstance;
      });
  }));

  describe('DOM', () => {

  });

  describe('Class', () => {

    describe('ngOnInit', () => {
      it('should set the distance based on booked in vehicle details', (done: DoneFn) => {
        component.ngOnInit();
        component.componentState.vehicleDetails$.subscribe((result: CatBEUniqueTypes.VehicleDetails) => {
          expect(result).toEqual({
            vehicleLength: 10,
            vehicleWidth: 2.75,
          });
          done();
        });
      });
    });

    describe('calculateDistanceLength', () => {
      it('should set the correct value for aAndA1', () => {
        component.vehicleDetails = vehicleDetails;
        component.calculateDistanceLength();
        const result = component.distanceFromStart;
        expect(result).toEqual(40);
      });

      it('should set the correct value for b', () => {
        component.vehicleDetails = vehicleDetails;
        component.calculateDistanceLength();
        const result = component.distanceFromMiddle;
        expect(result).toEqual(20);
      });
    });

    describe('calculateDistanceWidth', () => {
      it('should set the correct value for aToA1', () => {
        component.vehicleDetails = vehicleDetails;
        component.calculateDistanceWidth();
        const result = component.distanceOfBayWidth;
        expect(result).toEqual(4.13);
      });
    });

    describe('ionViewWillEnter', () => {
      it('should calculate the distances if vehicle dimensions are populated', () => {
        const calculateDistanceLengthSpy = spyOn(component, 'calculateDistanceLength');
        const calculateDistanceWidthSpy = spyOn(component, 'calculateDistanceWidth');
        component.ngOnInit();
        const result = component.ionViewWillEnter();
        expect(calculateDistanceLengthSpy).toHaveBeenCalled();
        expect(calculateDistanceWidthSpy).toHaveBeenCalled();
        expect(result).toEqual(true);
      });
    });
  });
});
