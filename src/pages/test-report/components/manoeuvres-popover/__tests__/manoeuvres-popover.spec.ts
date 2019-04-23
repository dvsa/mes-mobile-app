
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { CompetencyComponent } from '../../competency/competency';
import { ManoeuvresPopoverComponent } from '../manoeuvres-popover';
import { AppModule } from '../../../../../app/app.module';
import {
  RecordManoeuvresSelection, AddManoeuvreDrivingFault,
} from '../../../../../modules/tests/test_data/test-data.actions';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { ManoeuvreTypes } from '../manoeuvres-popover.constants';
import { DrivingFaultsBadgeComponent } from '../../../../../components/driving-faults-badge/driving-faults-badge';
import { By } from '@angular/platform-browser';
import { ManoeuvreCompetencyComponent } from '../../manoeuvre-competency/manoeuvre-competency';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { StartTest } from '../../../../journal/journal.actions';
import { ManoeuvreCompetencies } from '../../../../../modules/tests/test_data/test-data.constants';

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
        MockComponent(ManoeuvreCompetencyComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({ tests: testsReducer }),
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ManoeuvresPopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    store$ = TestBed.get(Store);
    store$.dispatch(new StartTest(1003));
    spyOn(store$, 'dispatch').and.callThrough();
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
    it('should display the correct competencies against each manoeuvre', () => {
      component.recordManoeuvreSelection(ManoeuvreTypes.selectedReverseParkRoad);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#outcomeReverseParkRoadControl'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('#outcomeReverseParkRoadObservation'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('#outcomeReverseRightControl'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#outcomeReverseRightObservation'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#outcomeReverseParkCarparkControl'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#outcomeReverseParkCarparkObservation'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#outcomeForwardParkControl'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#outcomeForwardParkObservation'))).toBeNull();
    });
    describe('record manoeuvre', () => {
      it('should dispatch a RECORD_MANOEUVRES_SELECTION action', () => {
        component.recordManoeuvreSelection(ManoeuvreTypes.selectedReverseParkRoad);
        expect(store$.dispatch).toHaveBeenCalledWith(
          new RecordManoeuvresSelection(ManoeuvreTypes.selectedReverseParkRoad),
        );
      });
    });
    describe('disabling manoeuvres', () => {
      it('should not disable manoeuvres when a manoeuvre is selected', () => {
        component.recordManoeuvreSelection(ManoeuvreTypes.selectedReverseParkRoad);
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-road-radio'))
          .nativeElement.disabled).toBe(false);
        expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-carpark-radio'))
          .nativeElement.disabled).toBe(false);
        expect(fixture.debugElement.query(By.css('#manoeuvres-forward-park-radio'))
          .nativeElement.disabled).toBe(false);
        expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-right-radio'))
          .nativeElement.disabled).toBe(false);
      });
      it('should disable other manoeuvres from being selected when a fault is added', () => {
        store$.dispatch(new AddManoeuvreDrivingFault(ManoeuvreCompetencies.outcomeReverseRightControl));
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-road-radio'))
          .nativeElement.disabled).toBe(true);
        expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-park-carpark-radio'))
          .nativeElement.disabled).toBe(true);
        expect(fixture.debugElement.query(By.css('#manoeuvres-forward-park-radio'))
          .nativeElement.disabled).toBe(true);
        expect(fixture.debugElement.query(By.css('#manoeuvres-reverse-right-radio'))
          .nativeElement.disabled).toBe(false);
      });
    });
  });
});
