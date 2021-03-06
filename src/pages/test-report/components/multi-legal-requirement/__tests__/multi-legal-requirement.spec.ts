import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { MultiLegalRequirementComponent } from '../multi-legal-requirement';
import { MockComponent } from 'ng-mocks';
import { CompetencyButtonComponent } from '../../competency-button/competency-button';
import { TickIndicatorComponent } from '../../../../../components/common/tick-indicator/tick-indicator';
import { IonicModule } from 'ionic-angular';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import {
  ToggleLegalRequirement,
} from '../../../../../modules/tests/test-data/common/test-requirements/test-requirements.actions';
import { LegalRequirements } from '../../../../../modules/tests/test-data/test-data.constants';
import { NavigationStateProvider } from '../../../../../providers/navigation-state/navigation-state';
import {
  NavigationStateProviderMock,
} from '../../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { configureTestSuite } from 'ng-bullet';

describe('MultiLegalRequirementComponent', () => {
  let fixture: ComponentFixture<MultiLegalRequirementComponent>;
  let component: MultiLegalRequirementComponent;
  let store$: Store<StoreModel>;
  let storeDispatchSpy: jasmine.Spy;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        MultiLegalRequirementComponent,
        MockComponent(CompetencyButtonComponent),
        MockComponent(TickIndicatorComponent),
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer }),
      ],
      providers: [
        { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MultiLegalRequirementComponent);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
    storeDispatchSpy = spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    it('should dispatch a TOGGLE_NORMAL_START_1 action if neither requirement is ticked', () => {
      component.legalRequirement1 = LegalRequirements.normalStart1;
      component.requirement1Ticked = false;
      component.legalRequirement2 = LegalRequirements.normalStart2;
      component.requirement2Ticked = false;
      component.toggleLegalRequirement();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleLegalRequirement(LegalRequirements.normalStart1));
    });

    it('should dispatch a TOGGLE_NORMAL_START_2 action if requirement1 ticked is true', () => {
      component.legalRequirement1 = LegalRequirements.normalStart1;
      component.requirement1Ticked = true;
      component.legalRequirement2 = LegalRequirements.normalStart2;
      component.requirement2Ticked = false;
      component.toggleLegalRequirement();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleLegalRequirement(LegalRequirements.normalStart2));
    });
  });

  it('should toggle both Normal start 1 and Normal start 2 if both requirements are ticked', () => {
    component.legalRequirement1 = LegalRequirements.normalStart1;
    component.requirement1Ticked = true;
    component.legalRequirement2 = LegalRequirements.normalStart2;
    component.requirement2Ticked = true;
    component.toggleLegalRequirement();
    expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleLegalRequirement(LegalRequirements.normalStart1));
    expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleLegalRequirement(LegalRequirements.normalStart2));
  });

  it('should dispatch a TOGGLE_BUS_STOP_1 action if neither requirement is ticked', () => {
    component.legalRequirement1 = LegalRequirements.busStop1;
    component.requirement1Ticked = false;
    component.legalRequirement2 = LegalRequirements.busStop2;
    component.requirement2Ticked = false;
    component.toggleLegalRequirement();

    expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleLegalRequirement(LegalRequirements.busStop1));
  });

  it('should dispatch a TOGGLE_BUS_STOP_2 action if requirement1 ticked is true', () => {
    component.legalRequirement1 = LegalRequirements.busStop1;
    component.requirement1Ticked = true;
    component.legalRequirement2 = LegalRequirements.busStop2;
    component.requirement2Ticked = false;
    component.toggleLegalRequirement();

    expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleLegalRequirement(LegalRequirements.busStop2));
  });
  it('should toggle both bus stop 1 and bus stop 2 if both requirements are ticked', () => {
    component.legalRequirement1 = LegalRequirements.busStop1;
    component.requirement1Ticked = true;
    component.legalRequirement2 = LegalRequirements.busStop2;
    component.requirement2Ticked = true;
    component.toggleLegalRequirement();
    expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleLegalRequirement(LegalRequirements.busStop1));
    expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleLegalRequirement(LegalRequirements.busStop2));
  });
});
