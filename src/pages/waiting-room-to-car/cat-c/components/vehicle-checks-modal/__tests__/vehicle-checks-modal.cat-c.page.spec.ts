
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config, NavController, NavParams } from 'ionic-angular';
import { VehicleChecksCatCModal } from '../vehicle-checks-modal.cat-c.page';
import { Store, StoreModule } from '@ngrx/store';
import { ConfigMock, NavControllerMock, NavParamsMock } from 'ionic-mocks';
import { AppModule } from '../../../../../../app/app.module';
import { MockComponent } from 'ng-mocks';
import { VehicleChecksQuestionCatCComponent } from '../../vehicle-checks-question/vehicle-checks-question.cat-c';
import {
  QuestionOutcome,
  QuestionResult,
} from '@dvsa/mes-test-schema/categories/common';
import { StoreModel } from '../../../../../../shared/models/store.model';

import {
  ShowMeQuestionOutcomeChanged,
  ShowMeQuestionSelected,
  TellMeQuestionSelected,
  TellMeQuestionOutcomeChanged,
} from '../../../../../../modules/tests/test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.action';
import { WarningBannerComponent } from '../../../../../../components/common/warning-banner/warning-banner';
import { configureTestSuite } from 'ng-bullet';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('VehicleChecksCatCModal', () => {
  let fixture: ComponentFixture<VehicleChecksCatCModal>;
  let component: VehicleChecksCatCModal;
  let store$: Store<StoreModel>;

  const bannerDisplayLogic = [
    { category: TestCategory.C, drivingFaults: 0, seriousFaults: 0, showBanner: false },
    { category: TestCategory.C, drivingFaults: 1, seriousFaults: 0, showBanner: false },
    { category: TestCategory.C, drivingFaults: 4, seriousFaults: 1, showBanner: true },
    { category: TestCategory.C, drivingFaults: 3, seriousFaults: 0, showBanner: false },
    { category: TestCategory.C1, drivingFaults: 0, seriousFaults: 0, showBanner: false },
    { category: TestCategory.C1, drivingFaults: 1, seriousFaults: 0, showBanner: false },
    { category: TestCategory.C1, drivingFaults: 4, seriousFaults: 1, showBanner: true },
    { category: TestCategory.C1, drivingFaults: 3, seriousFaults: 0, showBanner: false },
    { category: TestCategory.CE, drivingFaults: 0, seriousFaults: 0, showBanner: false },
    { category: TestCategory.CE, drivingFaults: 1, seriousFaults: 0, showBanner: false },
    { category: TestCategory.CE, drivingFaults: 1, seriousFaults: 1, showBanner: true },
    { category: TestCategory.C1E, drivingFaults: 0, seriousFaults: 0, showBanner: false },
    { category: TestCategory.C1E, drivingFaults: 1, seriousFaults: 0, showBanner: false },
    { category: TestCategory.C1E, drivingFaults: 1, seriousFaults: 1, showBanner: true },
  ];

  configureTestSuite(() => {
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
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VehicleChecksCatCModal);
    component = fixture.componentInstance;
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
      bannerDisplayLogic.forEach((bannerLogic) => {

        it(`Cat ${bannerLogic.category} should return ${bannerLogic.showBanner} if
 there are ${bannerLogic.drivingFaults} driving faults and ${bannerLogic.seriousFaults} serious`, () => {
          component.vehicleChecksScore = {
            drivingFaults: bannerLogic.drivingFaults,
            seriousFaults: bannerLogic.seriousFaults,
          };
          component.category = bannerLogic.category;
          expect(component.shouldDisplayBanner()).toBe(bannerLogic.showBanner);
        });

      });
    });
  });

  describe('DOM', () => {

  });
});
