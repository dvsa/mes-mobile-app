import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams, Config, Platform } from 'ionic-angular';
import {
  ConfigMock,
  PlatformMock,
  NavParamsMock,
} from 'ionic-mocks';
import { StoreModel } from '../../../../../../shared/models/store.model';
import { Store, StoreModule } from '@ngrx/store';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import { ReverseDiagramCatCPage } from '../reverse-diagram-modal.cat-c';
import { AppModule } from '../../../../../../app/app.module';
import { App } from '../../../../../../app/app.component';
import { MockAppComponent } from '../../../../../../app/__mocks__/app.component.mock';
import { ReversingDistancesProvider } from '../../../../../../providers/reversing-distances/reversing-distances';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { configureTestSuite } from 'ng-bullet';

describe('reverseDiagramModal', () => {
  let fixture: ComponentFixture<ReverseDiagramCatCPage>;
  let component: ReverseDiagramCatCPage;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ReverseDiagramCatCPage],
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
                category: TestCategory.C,
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
        { provide: App, useClass: MockAppComponent },
        ReversingDistancesProvider,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReverseDiagramCatCPage);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
    store$.dispatch(new StartTest(123, TestCategory.C));
  }));

  describe('DOM', () => {

  });

  describe('Class', () => {

    const vehicleDetails: CatCUniqueTypes.VehicleDetails = {
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

    describe('calculateReversingLengths', () => {
      it('CAT C - should set the correct value for aAndA1', () => {
        component.category = TestCategory.C;
        component.ngOnInit();
        component.calculateReversingLengths(vehicleDetails.vehicleLength);
        const result = component.reversingLengthStart;
        expect(result).toEqual(35);
      });

      it('CAT C - should set the correct value for b', () => {
        component.category = TestCategory.C;
        component.ngOnInit();
        component.calculateReversingLengths(vehicleDetails.vehicleLength);
        const result = component.reversingLengthMiddle;
        expect(result).toEqual(20);
      });
    });

    describe('calculateDistanceWidth', () => {
      it('Cat C - should set the correct value for aToA1', () => {
        component.category = TestCategory.C;
        component.ngOnInit();
        component.calculateReversingWidth(vehicleDetails.vehicleWidth);
        const result = component.reversingWidth;
        expect(result).toEqual(4.13);
      });
    });

    describe('ionViewWillEnter', () => {
      it('should calculate the distances if vehicle dimensions are populated', () => {
        const calculateReversingLengthsSpy = spyOn(component, 'calculateReversingLengths');
        const calculateReversingWidthSpy = spyOn(component, 'calculateReversingWidth');
        component.ngOnInit();
        const result = component.ionViewWillEnter();
        expect(calculateReversingLengthsSpy).toHaveBeenCalled();
        expect(calculateReversingWidthSpy).toHaveBeenCalled();
        expect(result).toEqual(true);
      });
    });
  });
});
