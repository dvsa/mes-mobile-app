import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { VehicleChecksCardComponent } from '../vehicle-checks-card';
import { IonicModule, Config } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { StoreModel } from '../../../../../shared/models/store.model';
import { StartTest } from '../../../../journal/journal.actions';
import {
  TellMeQuestionCorrect,
  ShowMeQuestionPassed,
  ShowMeQuestionDrivingFault,
  TellMeQuestionDrivingFault,
} from '../../../../../modules/tests/test-data/test-data.actions';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks';

describe('VehicleChecksCardComponent', () => {
  let fixture: ComponentFixture<VehicleChecksCardComponent>;
  let component: VehicleChecksCardComponent;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleChecksCardComponent,
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer }),
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VehicleChecksCardComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105));
      });
  }));

  describe('Class', () => {
    it('should compile', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    it('should not display the card when no fault marked', () => {
      store$.dispatch(new TellMeQuestionCorrect());
      store$.dispatch(new ShowMeQuestionPassed());
      fixture.detectChanges();
      const vehicleChecksCard = fixture.debugElement.query(By.css('#vehicle-checks'));
      expect(vehicleChecksCard).toBeNull();
    });

    it('should display the card when show me has a fault', () => {
      store$.dispatch(new TellMeQuestionCorrect());
      store$.dispatch(new ShowMeQuestionDrivingFault());
      fixture.detectChanges();
      const vehicleChecksCard = fixture.debugElement.query(By.css('#vehicle-checks'));
      expect(vehicleChecksCard).not.toBeNull();
    });

    it('should display the card when tell me has a fault', () => {
      store$.dispatch(new TellMeQuestionDrivingFault());
      store$.dispatch(new ShowMeQuestionPassed());
      fixture.detectChanges();
      const vehicleChecksCard = fixture.debugElement.query(By.css('#vehicle-checks'));
      expect(vehicleChecksCard).not.toBeNull();
    });

    it('should display tell me question div, when there is a tell me fault', () => {
      store$.dispatch(new TellMeQuestionDrivingFault());
      store$.dispatch(new ShowMeQuestionPassed());
      fixture.detectChanges();
      const vehicleChecksCard = fixture.debugElement.query(By.css('#tell-me-question'));
      expect(vehicleChecksCard).not.toBeNull();
    });

    it('should display show me question div, when there is a show me fault', () => {
      store$.dispatch(new TellMeQuestionCorrect());
      store$.dispatch(new ShowMeQuestionDrivingFault());
      fixture.detectChanges();
      const vehicleChecksCard = fixture.debugElement.query(By.css('#show-me-question'));
      expect(vehicleChecksCard).not.toBeNull();
    });
  });

});
