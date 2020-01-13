
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config, NavController } from 'ionic-angular';
import { VehicleChecksCatCModal } from '../vehicle-checks-modal.cat-c.page';
import { Store, StoreModule } from '@ngrx/store';
import { ConfigMock, NavControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../../app/app.module';
import { MockComponent } from 'ng-mocks';
import { VehicleChecksQuestionCatCComponent } from '../../vehicle-checks-question/vehicle-checks-question.cat-c';
import {
  QuestionOutcome,
  QuestionResult,
} from '@dvsa/mes-test-schema/categories/common';
import { StoreModel } from '../../../../../../shared/models/store.model';

// TODO: MES-4254 Import cat c actions
import {
  ShowMeQuestionOutcomeChanged,
  ShowMeQuestionSelected,
  TellMeQuestionSelected,
  TellMeQuestionOutcomeChanged,
} from '../../../../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.action';
import { WarningBannerComponent } from '../../../../../../components/common/warning-banner/warning-banner';

describe('VehicleChecksCatCModal', () => {
  let fixture: ComponentFixture<VehicleChecksCatCModal>;
  let component: VehicleChecksCatCModal;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleChecksCatCModal,
        MockComponent(VehicleChecksQuestionCatCComponent),
        WarningBannerComponent,
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VehicleChecksCatCModal);
        component = fixture.componentInstance;
      });
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');

  }));

  describe('Class', () => {
    it('should compile', () => {
      expect(component).toBeDefined();
    });

    describe('showMeQuestionChanged()', () => {
      it('should dispatch a new ShowMeQuestionSelected action', () => {
        const showMeQuestionPayload: QuestionResult = {
          code: '01',
          description: 'desc',
          outcome: 'P',
        };
        const index = 1;
        component.showMeQuestionChanged(showMeQuestionPayload, index);
        expect(component.store$.dispatch)
          .toHaveBeenCalledWith(new ShowMeQuestionSelected(showMeQuestionPayload, index));
      });
    });

    describe('showMeQuestionOutcomeChanged()', () => {
      it('should dispatch a new ShowMeQuestionOutcomeChanged action', () => {
        const showMeQuestionOutcomePayload: QuestionOutcome = 'P';
        const index = 1;
        component.showMeQuestionOutcomeChanged(showMeQuestionOutcomePayload, index);
        expect(component.store$.dispatch)
          .toHaveBeenCalledWith(new ShowMeQuestionOutcomeChanged(showMeQuestionOutcomePayload, index));
      });
    });

    describe('tellMeQuestionChanged()', () => {
      it('should dispatch a new TellMeQuestionSelected action', () => {
        const tellMeQuestionPayload: QuestionResult = {
          code: 'T01',
          description: 'desc',
          outcome: 'DF',
        };
        const index = 1;
        component.tellMeQuestionChanged(tellMeQuestionPayload, index);
        expect(component.store$.dispatch)
          .toHaveBeenCalledWith(new TellMeQuestionSelected(tellMeQuestionPayload, index));
      });
    });

    describe('tellMeQuestionOutcomeChanged()', () => {
      it('should dispatch a new TellMeQuestionOutcomeChanged action', () => {
        const tellMeQuestionOutcomePayload: QuestionOutcome = 'P';
        const index = 1;
        component.tellMeQuestionOutcomeChanged(tellMeQuestionOutcomePayload, index);
        expect(component.store$.dispatch)
          .toHaveBeenCalledWith(new TellMeQuestionOutcomeChanged(tellMeQuestionOutcomePayload, index));
      });
    });

    describe('shouldDisplayBanner', () => {
      it('should return false if there are no 4 driving faults and 1 serious', () => {
        component.vehicleChecksScore = {
          drivingFaults: 3,
          seriousFaults: 0,
        };

        expect(component.shouldDisplayBanner()).toBeFalsy();
      });

      it('should return true if there are 4 driving faults and 1 serious', () => {
        component.vehicleChecksScore = {
          drivingFaults: 4,
          seriousFaults: 1,
        };

        expect(component.shouldDisplayBanner()).toBeTruthy();
      });
    });
  });

  describe('DOM', () => {

  });
});
