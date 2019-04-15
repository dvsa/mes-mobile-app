
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { CompetencyComponent } from '../../competency/competency';
import { ManoeuvresPopoverComponent } from '../manoeuvres-popover';
import { AppModule } from '../../../../../app/app.module';
import { RecordManoeuvresSelection } from '../../../../../modules/tests/test_data/test-data.actions';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { ManoeuvreTypes } from '../manoeuvres-popover.constants';
import { DrivingFaultsBadgeComponent } from '../../../../../components/driving-faults-badge/driving-faults-badge';
import { By } from '@angular/platform-browser';

describe('ManoeuvresPopoverComponent', () => {
  let fixture: ComponentFixture<ManoeuvresPopoverComponent>;
  let component: ManoeuvresPopoverComponent;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ManoeuvresPopoverComponent,
        MockComponent(CompetencyComponent),
        MockComponent(DrivingFaultsBadgeComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            testLifecycles: {},
            startedTests: {
              123: {
                vehicleDetails: {},
                accompaniment: {},
                candidate: {
                  candidateName: 'Joe Bloggs',
                },
                testData: {
                  dangerousFaults: {},
                  drivingFaults: {},
                  manoeuvres: { selectedReverseParkRoad: true },
                  seriousFaults: {},
                  testRequirements: {},
                  ETA: {},
                  eco: {},
                },
              },
            },
          }),
        }),
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ManoeuvresPopoverComponent);
        component = fixture.componentInstance;
      });
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
    it('should display the correct competencies against each manoeuvre', () => {
      expect(fixture.debugElement.query(By.css('#reverseParkRoadControl'))).toBeDefined();
      expect(fixture.debugElement.query(By.css('#reverseParkRoadObservation'))).toBeDefined();
      expect(fixture.debugElement.query(By.css('#reverseRightControl'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#reverseRightObservation'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#reverseParkCarparkControl'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#reverseParkCarparkObservation'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#forwardParkControl'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#forwardParkObservation'))).toBeNull();
    });
    describe('record manoeuvre', () => {
      it('should dispatch a RECORD_MANOEUVRES_SELECTION action', () => {
        component.recordManoeuvreSelection(ManoeuvreTypes.selectedReverseParkRoad);
        expect(store$.dispatch).toHaveBeenCalledWith(
          new RecordManoeuvresSelection(ManoeuvreTypes.selectedReverseParkRoad),
        );
      });
    });
  });
});
