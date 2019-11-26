import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { EtaComponent } from '../eta';
import { IonicModule } from 'ionic-angular';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { ToggleETA } from '../../../../../modules/tests/test-data/common/eta/eta.actions';
import { ExaminerActions } from '../../../../../modules/tests/test-data/test-data.constants';
import { MockComponent } from 'ng-mocks';
import { CompetencyButtonComponent } from '../../competency-button/competency-button';

describe('Examiner Takes Action Component', () => {
  let fixture: ComponentFixture<EtaComponent>;
  let component: EtaComponent;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EtaComponent,
        MockComponent(CompetencyButtonComponent),
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer }),
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EtaComponent);
        component = fixture.componentInstance;
      });
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    it('should dispatch a TOGGLE_ETA_VERBAL action', () => {
      component.eta = ExaminerActions.verbal;
      component.toggleETA();
      expect(store$.dispatch).toHaveBeenCalledWith(new ToggleETA(ExaminerActions.verbal));
    });

    it('should dispatch a TOGGLE_ETA_PHYSICAL action', () => {
      component.eta = ExaminerActions.physical;
      component.toggleETA();
      expect(store$.dispatch).toHaveBeenCalledWith(new ToggleETA(ExaminerActions.physical));
    });
  });
});
