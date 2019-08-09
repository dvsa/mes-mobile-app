
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { CompetencyComponent } from '../../competency/competency';
import { ManoeuvresPopoverComponent } from '../manoeuvres-popover';
import { AppModule } from '../../../../../app/app.module';
import {
  RecordManoeuvresSelection, AddManoeuvreDrivingFault, AddManoeuvreSeriousFault, AddManoeuvreDangerousFault,
} from '../../../../../modules/tests/test-data/test-data.actions';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { ManoeuvreCompetencyComponent } from '../../manoeuvre-competency/manoeuvre-competency';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { StartTest } from '../../../../journal/journal.actions';
import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../../modules/tests/test-data/test-data.constants';
import {
  DrivingFaultsBadgeComponent,
} from '../../../../../components/common/driving-faults-badge/driving-faults-badge';

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
    it('should display the correct competencies against each manoeuvre', () => {
      component.recordManoeuvreSelection(ManoeuvreTypes.reverseParkRoad);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#reverseParkRoad-controlFault'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('#reverseParkRoad-observationFault'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('#reverseRight-controlFault'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#reverseRight-observationFault'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#reverseParkCarpark-controlFault'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#reverseParkCarpark-observationFault'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#forwardPark-controlFault'))).toBeNull();
      expect(fixture.debugElement.query(By.css('#forwardPark-observationFault'))).toBeNull();
    });
    describe('record manoeuvre', () => {
      it('should dispatch a RECORD_MANOEUVRES_SELECTION action', () => {
        component.recordManoeuvreSelection(ManoeuvreTypes.reverseParkRoad);
        expect(store$.dispatch).toHaveBeenCalledWith(
          new RecordManoeuvresSelection(ManoeuvreTypes.reverseParkRoad),
        );
      });
    });
    describe('disabling manoeuvres', () => {
      it('should not disable manoeuvres when a manoeuvre is selected', () => {
        component.recordManoeuvreSelection(ManoeuvreTypes.reverseParkRoad);
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
      it('should disable other manoeuvres from being selected when a driving fault is added', () => {
        store$.dispatch(new AddManoeuvreDrivingFault({
          manoeuvre: ManoeuvreTypes.reverseRight,
          competency: ManoeuvreCompetencies.controlFault,
        }));
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
      it('should disable other manoeuvres from being selected when a serious fault is added', () => {
        store$.dispatch(new AddManoeuvreSeriousFault({
          manoeuvre: ManoeuvreTypes.reverseRight,
          competency: ManoeuvreCompetencies.controlFault,
        }));
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
      it('should disable other manoeuvres from being selected when a dangerous fault is added', () => {
        store$.dispatch(new AddManoeuvreDangerousFault({
          manoeuvre: ManoeuvreTypes.reverseRight,
          competency: ManoeuvreCompetencies.controlFault,
        }));
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
