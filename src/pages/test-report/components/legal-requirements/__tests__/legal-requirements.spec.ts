import { ComponentFixture, async, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
import { LegalRequirementsComponent } from '../legal-requirements';
import { MockComponent } from 'ng-mocks';
import { TickIndicatorComponent } from '../../tick-indicator/tick-indicator';
import { IonicModule } from 'ionic-angular';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import {
  ToggleNormalStart1,
  ToggleNormalStart2,
  ToggleAngledStart,
  ToggleHillStart,
} from '../../../../../modules/tests/test_data/test-data.actions';

fdescribe('LegalRequirementsComponent', () => {
  let fixture: ComponentFixture<LegalRequirementsComponent>;
  let component: LegalRequirementsComponent;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LegalRequirementsComponent,
        MockComponent(TickIndicatorComponent),
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer }),
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LegalRequirementsComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should dispatch a TOGGLE_NORMAL_START_1 action', () => {
      const storeDispatchSpy = spyOn(store$, 'dispatch');

      component.toggleNormalStart1();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleNormalStart1());
    });

    it('should dispatch a TOGGLE_NORMAL_START_2 action', () => {
      const storeDispatchSpy = spyOn(store$, 'dispatch');

      component.toggleNormalStart2();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleNormalStart2());
    });

    it('should dispatch a TOGGLE_ANGLED_START action', () => {
      const storeDispatchSpy = spyOn(store$, 'dispatch');

      component.toggleAngledStart();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleAngledStart());
    });

    it('should dispatch a TOGGLE_HILL_START action', () => {
      const storeDispatchSpy = spyOn(store$, 'dispatch');

      component.toggleHillStart();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleHillStart());
    });
  });
});
