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
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { ReverseDiagramCatCPage } from '../reverse-diagram-modal.cat-c';
import { AppModule } from '../../../../../../app/app.module';
import { App } from '../../../../../../app/app.component';
import { MockAppComponent } from '../../../../../../app/__mocks__/app.component.mock';

describe('reverseDiagramModal', () => {
  let fixture: ComponentFixture<ReverseDiagramCatCPage>;
  let component: ReverseDiagramCatCPage;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
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

                // TODO: MES-4287 Change the category to C
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
        { provide: App, useClass: MockAppComponent },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ReverseDiagramCatCPage);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);

        // TODO: MES-4287 Change the category to C
        store$.dispatch(new StartTest(123, TestCategory.BE));
      });
  }));

  describe('DOM', () => {

  });

  describe('Class', () => {

    // TODO: MES-4287 namespace has to come from cat C
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
