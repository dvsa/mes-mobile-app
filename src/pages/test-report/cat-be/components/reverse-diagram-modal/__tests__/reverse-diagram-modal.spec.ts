import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams, Config, Platform, NavController } from 'ionic-angular';
import {
  ConfigMock,
  PlatformMock,
  NavParamsMock,
  NavControllerMock,
} from 'ionic-mocks';
import { StoreModule } from '@ngrx/store';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
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
                  vehicleLength: 10,
                  vehicleWidth: 2.75,
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
    const vehicleDetails: CatBEUniqueTypes.VehicleDetails = {
      vehicleLength: 10,
      vehicleWidth: 2.75,
    };

    describe('ngOnInit', () => {
      it('should set the distance based on booked in vehicle length', (done: DoneFn) => {
        component.ngOnInit();
        component.componentState.vehicleLength$.subscribe((result) => {
          expect(result).toEqual(10);
          done();
        });
      });

      it('should set the distance based on booked in vehicle width', (done: DoneFn) => {
        component.ngOnInit();
        component.componentState.vehicleWidth$.subscribe((result) => {
          expect(result).toEqual(2.75);
          done();
        });
      });
    });

    describe('calculateDistanceLength', () => {
      it('should set the correct value for aAndA1', () => {
        component.calculateDistanceLength(vehicleDetails.vehicleLength);
        const result = component.distanceFromStart;
        expect(result).toEqual(40);
      });

      it('should set the correct value for b', () => {
        component.calculateDistanceLength(vehicleDetails.vehicleLength);
        const result = component.distanceFromMiddle;
        expect(result).toEqual(20);
      });
    });

    describe('calculateDistanceWidth', () => {
      it('should set the correct value for aToA1', () => {
        component.calculateDistanceWidth(vehicleDetails.vehicleWidth);
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
