import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { LegalRequirementComponent } from '../legal-requirement';
import { MockComponent } from 'ng-mocks';
import { CompetencyButtonComponent } from '../../competency-button/competency-button';
import { TickIndicatorComponent } from '../../../../../components/tick-indicator/tick-indicator';
import { IonicModule } from 'ionic-angular';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { ToggleLegalRequirement } from '../../../../../modules/tests/test-data/test-data.actions';
import { LegalRequirements } from '../../../../../modules/tests/test-data/test-data.constants';

describe('LegalRequirementComponent', () => {
  let fixture: ComponentFixture<LegalRequirementComponent>;
  let component: LegalRequirementComponent;
  let store$: Store<StoreModel>;
  let storeDispatchSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LegalRequirementComponent,
        MockComponent(CompetencyButtonComponent),
        MockComponent(TickIndicatorComponent),
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer }),
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LegalRequirementComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        storeDispatchSpy = spyOn(store$, 'dispatch');
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should dispatch a TOGGLE_NORMAL_START_1 action', () => {
      component.legalRequirement = LegalRequirements.normalStart1;
      component.toggleLegalRequirement();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleLegalRequirement(LegalRequirements.normalStart1));
    });

    it('should dispatch a TOGGLE_NORMAL_START_2 action', () => {
      component.legalRequirement = LegalRequirements.normalStart2;
      component.toggleLegalRequirement();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleLegalRequirement(LegalRequirements.normalStart2));
    });

    it('should dispatch a TOGGLE_ANGLED_START action', () => {
      component.legalRequirement = LegalRequirements.angledStart;
      component.toggleLegalRequirement();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleLegalRequirement(LegalRequirements.angledStart));
    });

    it('should dispatch a TOGGLE_HILL_START action', () => {
      component.legalRequirement = LegalRequirements.hillStart;
      component.toggleLegalRequirement();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleLegalRequirement(LegalRequirements.hillStart));
    });
  });
});
