import { ReverseLeftComponent } from '../reverse-left';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { configureTestSuite } from 'ng-bullet';
import { TickIndicatorComponent } from '../../../../../components/common/tick-indicator/tick-indicator';
import { DrivingFaultsBadgeComponent }
 from '../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { MockComponent } from 'ng-mocks';
import { SeriousFaultBadgeComponent } from '../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent }
 from '../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import { CompetencyButtonComponent } from '../../competency-button/competency-button';
import { testReportReducer } from '../../../test-report.reducer';
import { AppModule } from '../../../../../app/app.module';
import { IonicModule } from 'ionic-angular';
import { ReverseLeftPopoverClosed, ReverseLeftPopoverOpened } from '../reverse-left.actions';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  RecordManoeuvresDeselection,
  RecordManoeuvresSelection,
} from '../../../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { ManoeuvreTypes } from '../../../../../modules/tests/test-data/test-data.constants';

describe('reverseLeftComponent', () => {
  let fixture: ComponentFixture<ReverseLeftComponent>;
  let component: ReverseLeftComponent;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReverseLeftComponent,
        MockComponent(TickIndicatorComponent),
        MockComponent(DrivingFaultsBadgeComponent),
        MockComponent(SeriousFaultBadgeComponent),
        MockComponent(DangerousFaultBadgeComponent),
        MockComponent(CompetencyButtonComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            testStatus: {},
            startedTests: {
              123: {
                category: TestCategory.BE, // value overridden where necessary
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
            },
          }),
          testReport: testReportReducer,
        }),
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReverseLeftComponent);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
  }));

  describe('Class', () => {
    describe('hasFaults', () => {
      it('should return TRUE if there are any driving faults', () => {
        component.drivingFaults = 1;
        const result = component.hasFaults();
        expect(result).toEqual(true);
      });
      it('should return TRUE if there is a serious fault', () => {
        component.hasSeriousFault = true;
        const result = component.hasFaults();
        expect(result).toEqual(true);
      });
      it('should return TRUE if there is a dangerous fault', () => {
        component.hasDangerousFault = true;
        const result = component.hasFaults();
        expect(result).toEqual(true);
      });
      it('should return FALSE if there are no faults', () => {
        component.drivingFaults = 0;
        component.hasSeriousFault = false;
        component.hasDangerousFault = false;
        const result = component.hasFaults();
        expect(result).toEqual(false);
      });
    });

    describe('togglePopoverDisplay', () => {
      let storeDispatchSpy;
      let toggleOverlaySpy;
      beforeEach(() => {
        storeDispatchSpy = spyOn(store$, 'dispatch');
        toggleOverlaySpy = spyOn(component, 'toggleOverlay');
      });
      it('should dispatch ReverseLeftPopoverClosed and set displayPopover to false', () => {
        component.displayPopover = true;
        component.togglePopoverDisplay();
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ReverseLeftPopoverClosed());
        expect(component.displayPopover).toEqual(false);
        expect(toggleOverlaySpy).toHaveBeenCalled();
      });
      it('should dispatch ReverseLeftPopoverOpened and set displayPopover to true', () => {
        component.displayPopover = false;
        component.togglePopoverDisplay();
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ReverseLeftPopoverOpened());
        expect(component.displayPopover).toEqual(true);
        expect(toggleOverlaySpy).toHaveBeenCalled();
      });
    });

    describe('toggleReverseLeft', () => {
      describe('when reverseLeft is selected and there are no faults', () => {
        it('should deselect the manoeuvre', () => {
          const storeDispatchSpy = spyOn(store$, 'dispatch');
          component.testCategory = TestCategory.C;
          // Test category has to be defined otherwise provider will throw an error trying to fetch an undefined cat
          component.ngOnInit();
          component.completedReverseLeft = true;
          component.toggleReverseLeft();
          expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordManoeuvresDeselection(ManoeuvreTypes.reverseLeft));
        });
      });
      describe('when reverseLeft is not selected', () => {
        it('should record the manoeuvre', () => {
          const storeDispatchSpy = spyOn(store$, 'dispatch');
          component.completedReverseLeft = false;
          component.toggleReverseLeft();
          expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordManoeuvresSelection(ManoeuvreTypes.reverseLeft));
        });
      });
    });

    describe('toggleOverlay', () => {
      it('should call clickCallback when clickCallback exists', () => {
        component.clickCallback = {
          callbackMethod: () => {
          },
        };
        const callbackMethodSpy = spyOn(component.clickCallback, 'callbackMethod');
        component.toggleOverlay();
        expect(callbackMethodSpy).toHaveBeenCalled();
      });
    });
  });
});
